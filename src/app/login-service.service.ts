import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable()
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  signUp(mobileNumber:string,idNo:string) {
    const url = `${environment.apiUrl}/party/validatePartyCode?mobileNumber=${mobileNumber}&idNo=${idNo}&partyCode=0000`;
    return this.http.get(url); // returns Observable
  }
}
