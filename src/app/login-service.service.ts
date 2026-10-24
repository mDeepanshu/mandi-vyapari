import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable()
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  signUp(mobileNumber:string,idNo:string) {
    // No partyCode: the HIS server ignores it when idNo is given, and HMB's lambda would filter on it
    const url = `${environment.apiUrl}/party/validatePartyCode?mobileNumber=${mobileNumber}&idNo=${idNo}`;
    return this.http.get(url); // returns Observable
  }
}
