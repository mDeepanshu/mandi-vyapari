import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private readonly publicKey: string =
    'BFcAYkpjplEVe5f4dBBRpNZTlk-Fp-mdtqdex0DZEGiEIFtNy8GaM1Fge4UmIlf0n2yvyKrr9mUM-K88Wih5Djs';

  constructor(private http: HttpClient, private swPush: SwPush) { }

  getMyLedger(partyId: string, startDate: string, endDate: string) {
    const url = `http://localhost:8080/mandi/vyapari/ledger?vyapariId=${partyId}&startDate=${startDate}&endDate=${endDate}`;
    const headers = new HttpHeaders().set('vyapariCode', localStorage.getItem('partyCode') || '');
    return this.http.get(url, {headers});
  }

  getHelloLambda() {
    const url = `https://5txvte0v46.execute-api.ap-southeast-1.amazonaws.com/dev/hello`;
    return this.http.get(url);
  }

  subscribeToNotifications(partyId: string) {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.publicKey,
        })
        .then((subscription) => {
          console.log('Received subscription:', subscription);

          const subscriptionOptions = {
            partyId: partyId,
            subscription: subscription,
          };
          console.log('Subscription options:', subscriptionOptions);

          this.http
            .post(
              'https://5txvte0v46.execute-api.ap-southeast-1.amazonaws.com/dev/subscribe',
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
}
