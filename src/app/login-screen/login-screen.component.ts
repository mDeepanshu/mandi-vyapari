import { Component, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent {

  @Output() valueChange = new EventEmitter<boolean>();

  onSubmit(event: Event, mobileNumber: string, otp: string) {
    event.preventDefault(); // Prevent the default form submission
    this.valueChange.emit(true);
    this.sharedService.mobileNumber = mobileNumber; // Set mobile number on submit
    
  }

  constructor(private sharedService: SharedServiceService) { }


}
