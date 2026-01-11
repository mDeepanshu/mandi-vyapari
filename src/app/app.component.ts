import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginScreenComponent } from './features/login-screen/login-screen.component';
import { TransactionScreenComponent } from './features/transaction-screen/transaction-screen.component';
import { SidebarComponent } from "./features/sidebar/sidebar.component";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginScreenComponent,
    TransactionScreenComponent,
    MatSidenavModule,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mandi-vyapari';

  isLoggedIn: boolean = true;
  isHindi: boolean = false;
  constructor() {}

  ngOnInit(): void {
    const partyId = localStorage.getItem('partyId');
    if (partyId && partyId!=="undefined") {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  toggleLanguage(isHindi: boolean) {
    this.isHindi = isHindi;
  }


  onLoginChange(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  mode: 'side' | 'over' | 'push' = 'over';
  hasBackdrop: boolean | undefined = true;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
