# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Mandi Vyapari is a small Angular 18 PWA that lets a *vyapari* (trader at a mandi/wholesale market) log in and view their ledger (debit/credit transactions grouped by date, plus closing balance). It optionally shows item names in Hindi and receives web push notifications when the ledger changes. The backend is a separate service, not in this repo.

## Commands

```bash
npm start                     # ng serve, dev config, http://localhost:4200
npm run build                 # production build (default config) -> dist/mandi-vyapari/{browser,server}
npm run watch                 # dev build in watch mode
npm run serve:ssr:mandi-vyapari   # run the built Express SSR server (PORT env, default 4000)
npm run build:hmb             # HMB client build -> dist/mandi-vyapari-hmb
npm run deploy:hmb            # build HMB + firebase deploy (site hmb-vyapari, project hmb-vyapari)
ng serve --configuration hmb  # run locally against HMB's backends
npm test                      # Karma + Jasmine
```

There are no spec files: the component schematic in `angular.json` sets `skipTests: true`. No linter or formatter is configured. Use `.editorconfig` instead: 2-space indent, single quotes in `.ts`.

## Two clients, one codebase

The same code serves two separate mandi clients, chosen at build time. **Never mix their data or backends.**

| | HIS (default `production` build) | HMB (`--configuration hmb`) |
|---|---|---|
| Environment | `environment.prod.ts` | `environment.hmb.ts` |
| Hosting | Vercel, auto-deploy on push to `main` (`mva.make73.com`) | Firebase Hosting site `hmb-vyapari` in project `hmb-vyapari` (owned by deepanshumalviya8964@gmail.com), deployed with `npm run deploy:hmb` |
| API (`apiUrl`) | Spring server on App Runner (`bate8khjqj…/mandi`) | HMB's own Spring server on App Runner (`fmhpfpetcz…/mandi`), same API |
| Push (`lambdaUrl`) | `mandi-vyapari-lambda` stage `dev` (Neon) | `mandi-vyapari-lambda` stage `hmb` (HMB Supabase, table `push_subscriptions`) |
| Branding | `public/` (icons, `logo.png`, manifest) | `branding/hmb/` replaces those files in the build; generated from the original logo in `branding/source/` (not deployed). The wide logo is sized to fit Android's round splash crop, so it's small in the icon |

- Client-specific values (URLs, `mandiPhone`) belong in the environment files, not in components.
- Don't point HMB at `mandi-lambda-core`'s `hmb` stage: its Supabase data differs from HMB's live data (other trader IDs), and its `validatePartyCode` returns a list of snake_case rows. The login screen and sidebar still accept that shape in case the client migrates to it.
- A trader's ID differs between HIS and HMB; HMB traders log in with their HMB ID.

## Architecture

- **Standalone components, no router.** `app.routes.ts` is empty. `AppComponent` decides what to show from an `isLoggedIn` flag (set when `localStorage.partyId` exists). If logged in, it shows a `mat-drawer` holding `SidebarComponent` with `TransactionScreenComponent` as the content. Otherwise it shows `LoginScreenComponent`. Components talk to each other only through `@Input`/`@Output` wired in `app.component.html`. There is no state service.
- **localStorage is the session/state store.** Keys: `partyId`, `partyCode` (sent as the `vyapariCode` header on ledger calls), `userName`, `userId`, `isHindi`. Logout runs `localStorage.clear()` and reloads the page.
- **Services**:
  - `SharedServiceService` (root-provided): ledger fetch, party list, and push subscription.
  - `LoginServiceService`: *not* root-provided. It is listed in `LoginScreenComponent.providers`, so add it to `providers` anywhere else you inject it.
- **Hosting**: production is `https://mva.make73.com` (Vercel, auto-deploys on push to `main`; also reachable at `mandi-vyapari.vercel.app`). Any new origin must be added to the lambda's CORS allowlist.
- **Two backends**, both configured in `src/environments/`:
  - `apiUrl`: main REST API on AWS App Runner (`/party/...`, `/vyapari/ledger`). Responses are wrapped as `{ responseBody: ... }`.
  - `lambdaUrl`: API Gateway/Lambda for push subscriptions (`/subscribe`).
  - Both `environment.ts` and `environment.prod.ts` currently point to the **production/deployed** URLs. Local URLs are commented out, so swap them in to develop against a local backend.
- **Push notifications**:
  - `provideServiceWorker('ngsw-worker.js')` is enabled only outside dev mode, so push and SW features don't work under `ng serve`. Test them with a production build.
  - The VAPID public key is hard-coded in `SharedServiceService`.
  - `TransactionScreenComponent` re-fetches the ledger on every `SwPush.messages` event.
  - The app subscribes through the lambda's **`dev` deployment** (`5txvte0v46…/dev`). Its `prod` deployment uses a *different* database (`.env.prod`), so every sender (`mandi-application`, `mandi-auction`) must call the same `dev` URL or the subscriptions won't be found.
  - Only Angular's stock `ngsw-worker.js` is used; there is no custom service worker. The push sender (`mandi-backend/mandi-vyapari-lambda`, `/sendNotification/:vyapariId`) sends `{ notification: { title, body } }` payloads, which ngsw displays natively. Keep that payload shape if either side changes.
- **Login**: `validatePartyCode` returns HTTP 200 even for wrong credentials (`responseBody: "Party not found"`), so a login only counts when `responseBody.partyId` exists. `partyId` must be in localStorage *before* `valueChange.emit(true)`, because the transaction screen and sidebar read it in `ngOnInit`.
- **Payments ("पैसे भेजें")**: do **not** reintroduce a `upi://pay` link to a personal UPI ID. NPCI circular OC 76A (in force since 1 Apr 2024, restated in OC 76C) makes UPI apps refuse P2P "intent" payments, and also intents to offline non-verified merchant IDs (e.g. Google Pay for Business). The app shows "risky" or "security reasons" errors whatever parameters are used. The sidebar opens `dialogs/pay-dialog`, where traders copy the UPI ID (`utils/constants/payment.ts`) and pay from inside their own UPI app. The option is currently hidden: `SHOW_UPI_PAYMENT = false` in the same file. One-tap payment needs a payment gateway: a server-created order or payment link, plus a webhook.
- **Images**: `public/icons/*` are the padded, text-free app icons (sized for Android's maskable/splash crop). The full branded logo used on the login screen is `public/logo.png`.
- **Hindi translation**: `ItemNameTranslatePipe` (`itemNameTranslate: isHindi`) looks up `itemName.toUpperCase()` in `utils/constants/item-name.hi.ts`. Map keys must be UPPERCASE: the few mixed-case entries (`Wheat`, `Rice`, `Test`, etc.) never match.
- **Ledger grouping** happens client-side in `TransactionScreenComponent.getTransactionData()`. It iterates the API's `transactions` array in reverse and merges consecutive entries with the same `date` into `GroupedData` rows (see `transaction.model.ts`).

## SSR / prerender caveat

`angular.json` enables SSR (`server.ts`, Express `CommonEngine`) and `prerender: true`, with `provideClientHydration()`. However, the components read `localStorage` and `Notification` directly, in field initializers and in `ngOnInit`, with no `isPlatformBrowser` guard. If you add code that runs during server rendering, guard browser-only APIs. Keep the existing pattern in mind when debugging build or prerender errors.

## Build budgets

Production budgets: initial bundle warns at 500kB and errors at 1MB. Per-component styles warn at 10kB and error at 20kB. The Angular Material theme is the prebuilt `azure-blue.css`.
