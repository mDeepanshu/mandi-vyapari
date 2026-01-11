import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedServiceService } from "../../shared-service.service";
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonDialogComponent } from '../../dialogs/common-dialog/common-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {


  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
  hasNotificationPermission: boolean = false;
  userName: string | null = localStorage.getItem('userName');
  userId: string | null = localStorage.getItem('userId');

  @Output() isHindiChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sharedService: SharedServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (Notification.permission !== 'granted') {
      this.hasNotificationPermission = false;
    } else this.hasNotificationPermission = true;

    if (!this.userName || !this.userId || this.userName === "undefined" || this.userId === "undefined") {
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

  toggleLanguage(isHindi: boolean) {
    this.isHindiChange.emit(isHindi);
    localStorage.setItem('isHindi', isHindi ? 'true' : 'false');
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


  openConfirmDialog() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?'
      }
    });
    dialogRef.afterClosed().subscribe(result => result && this.logOut());
  }

}
