import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { TransactionScreenComponent } from './transaction-screen/transaction-screen.component';
import { SidebarComponent } from "./sidebar/sidebar.component";

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
  constructor() {}

  ngOnInit(): void {
    const vyapariId = localStorage.getItem('vyapariId');
    if (vyapariId) {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
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
