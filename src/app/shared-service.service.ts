import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  mobileNumber: string = '8349842228';
  private readonly publicKey: string =
    'BFcAYkpjplEVe5f4dBBRpNZTlk-Fp-mdtqdex0DZEGiEIFtNy8GaM1Fge4UmIlf0n2yvyKrr9mUM-K88Wih5Djs';

  constructor(private http: HttpClient, private swPush: SwPush) {}

  getMyLedger(vyapariId: string, startDate: string, endDate: string) {
    const url = `https://bate8khjqj.ap-south-1.awsapprunner.com/mandi/vyapari/ledger?vyapariId=${vyapariId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url); // returns Observable
  }

    getHelloLambda() {
    const url = `https://5txvte0v46.execute-api.ap-southeast-1.amazonaws.com/dev/%7Bproxy+%7D/`;
    return this.http.get(url); // returns Observable
  }

  subscribeToNotifications(vyapariId: string = this.mobileNumber) {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.publicKey,
        })
        .then((subscription) => {
          console.log('Received subscription:', subscription);

          const subscriptionOptions = {
            vyapariId: vyapariId,
            subscription: subscription,
          };
          console.log('Subscription options:', subscriptionOptions);

          this.http
            .post('https://5txvte0v46.execute-api.ap-southeast-1.amazonaws.com/dev/%7Bproxy+%7D/subscribe', subscriptionOptions)
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
