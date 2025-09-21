import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
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

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    // Notification.permission !== 'granted' ? Notification.requestPermission().then(permission => {
    //   if (permission === 'granted') {
    //     // this.subscribeToNotifications();
    //   }
    // }) : this.subscribeToNotifications();
    if (Notification.permission !== 'granted') {
      this.hasNotificationPermission = false;
    }else this.hasNotificationPermission = true;


  }

  toggleDrawerFn() {
    this.toggleDrawer.emit(false);
  }

  subscribeToNotifications() {
    console.log("Subscribing to notifications...");
    
    // const partyId = localStorage.getItem('partyId');
    // if (partyId) {
    //   this.sharedService.subscribeToNotifications(partyId);
    // }else{
      // console.warn("Vyapari ID not found in local storage. Cannot subscribe to notifications.");
    // }

  }


  
  logOut(){
    localStorage.removeItem('partyCode');
    localStorage.removeItem('partyId');
    window.location.reload();
  }

}
