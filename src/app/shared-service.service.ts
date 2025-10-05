import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private readonly publicKey: string =
    'BFcAYkpjplEVe5f4dBBRpNZTlk-Fp-mdtqdex0DZEGiEIFtNy8GaM1Fge4UmIlf0n2yvyKrr9mUM-K88Wih5Djs';

  constructor(private http: HttpClient, private swPush: SwPush) { }

  getMyLedger(partyId: string, startDate: string, endDate: string) {
    const url = `${environment.apiUrl}/vyapari/ledger?vyapariId=${partyId}&startDate=${startDate}&endDate=${endDate}`;
    const headers = new HttpHeaders().set('vyapariCode', localStorage.getItem('partyCode') || '');
    return this.http.get(url, { headers });
  }

  getHelloLambda() {
    const url = `${environment.lambdaUrl}/hello`;
    return this.http.get(url);
  }

  subscribeToNotifications(partyId: string) {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.publicKey,
        })
        .then((subscription) => {
          const subscriptionOptions = {
            vyapariId: partyId,
            subscription: subscription,
          };
          console.log('Subscription options:', subscriptionOptions);

          this.http
            .post(
              `${environment.lambdaUrl}/subscribe`,
              subscriptionOptions
            )
            .subscribe(() => {
              console.log('Successfully subscribed:', subscriptionOptions);
            });
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      console.log('Service Worker is not enabled');
    }
  }

  getPartyGlobal() {
      const url = `${environment.apiUrl}/party/listAllParties`;
      return this.http.get(url);
  };

}
