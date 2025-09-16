import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  signUp() {
    const url = `https://5txvte0v46.execute-api.ap-southeast-1.amazonaws.com/dev/hello`;
    return this.http.get(url); // returns Observable
  }
}
