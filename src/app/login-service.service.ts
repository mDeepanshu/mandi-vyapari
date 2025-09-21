import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable()
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  signUp(mobileNumber:string,partyCode:string) {
    const url = `${environment.apiUrl}/party/validatePartyCode?mobileNumber=${mobileNumber}&partyCode=${partyCode}`;
    return this.http.get(url); // returns Observable
  }
}
