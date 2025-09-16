import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { SharedServiceService } from "../shared-service.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sharedService: SharedServiceService) { }

  toggleDrawerFn() {
    this.toggleDrawer.emit(false);
  }

  subscribeToNotifications() {

    const vyapariId = localStorage.getItem('vyapariId');
    if (vyapariId) {
      this.sharedService.subscribeToNotifications(vyapariId);
    }else{
      
    }

  }
}
