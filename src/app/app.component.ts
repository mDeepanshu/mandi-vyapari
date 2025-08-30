import { Component, OnInit } from '@angular/core';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { TransactionScreenComponent } from './transaction-screen/transaction-screen.component';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from './shared-service.service';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    LoginScreenComponent,
    TransactionScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mandi-vyapari';
  isLoggedIn: boolean = false;
  
  constructor(private swPush: SwPush, private http: HttpClient,private sharedService: SharedServiceService) {}
  ngOnInit(): void {
    this.swPush.messages.subscribe((message) => {
      console.log('Received push message:', message);
    });
  }

  onLoginChange(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }


}
