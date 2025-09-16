import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { TransactionScreenComponent } from './transaction-screen/transaction-screen.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from './shared-service.service';
// import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
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
  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private sharedService: SharedServiceService
  ) {}
  ngOnInit(): void {
    if (false) {
      this.isLoggedIn = true;
    }
    this.swPush.messages.subscribe((message) => {
      console.log('Received push message:', message);
    });
  }

  onLoginChange(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  // Default values for selects
  mode: 'side' | 'over' | 'push' = 'over';
  hasBackdrop: boolean | undefined = true;

  // Function to toggle drawer
  toggleDrawer() {
    this.drawer.toggle();
  }
}
