import { Component } from '@angular/core';
import { LoginScreenComponent } from "./login-screen/login-screen.component";
import { TransactionScreenComponent } from "./transaction-screen/transaction-screen.component";
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    LoginScreenComponent,
    TransactionScreenComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'mandi-vyapari';
  isLoggedIn: boolean = true;
  onLoginChange(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

}
