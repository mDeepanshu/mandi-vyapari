import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  mobileNumber: string = '8349842228';

  constructor(private http: HttpClient) {}

  getMyLedger(vyapariId: string, startDate: string, endDate: string) {
    const url = `https://bate8khjqj.ap-south-1.awsapprunner.com/mandi/vyapari/ledger?vyapariId=${vyapariId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url); // returns Observable
  }
}
