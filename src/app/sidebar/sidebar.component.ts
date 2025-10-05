import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedServiceService } from "../shared-service.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
  hasNotificationPermission: boolean = false;
  userName: string | null = localStorage.getItem('userName');
  userId: string | null = localStorage.getItem('userId');
  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    if (Notification.permission !== 'granted') {
      this.hasNotificationPermission = false;
    } else this.hasNotificationPermission = true;
    
    if (!this.userName || !this.userId || this.userName==="undefined" || this.userId==="undefined") {
      this.sharedService.getPartyGlobal().subscribe((parties: any) => {
        const partyId = localStorage.getItem('partyId');
        const party = parties.responseBody.find((p: any) => p.partyId === partyId);
        if (party) {
          this.userName = party.name;
          this.userId = party.idNo;
          localStorage.setItem('userName', party.name);
          localStorage.setItem('userId', party.idNo);
        } else {
          console.warn("Party not found for partyId:", partyId);
        }
      });        
    }
  }

  toggleDrawerFn() {
    this.toggleDrawer.emit(false);
  }

  subscribeToNotifications() {
    const partyId = localStorage.getItem('partyId');
    if (partyId) {
      this.sharedService.subscribeToNotifications(partyId);
    } else {
      console.warn("Vyapari ID not found in local storage. Cannot subscribe to notifications.");
    }
  }



  logOut() {
    localStorage.clear();
    window.location.reload();
  }

}
