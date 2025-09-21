import { Component, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { LoginServiceService } from '../login-service.service';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
  providers: [LoginServiceService]
})
export class LoginScreenComponent {

  @Output() valueChange = new EventEmitter<boolean>();
  mobileNumber: string = '';
  otp: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    this.valueChange.emit(true);
    this.loginService.signUp(this.mobileNumber,this.otp).subscribe((response:any) => {
      localStorage.setItem('partyCode', response.responseBody.partyCode);
      localStorage.setItem('partyId', response.responseBody.partyId);
      this.sharedService.subscribeToNotifications(response.responseBody.partyId);
    });
  }

  constructor(private sharedService: SharedServiceService, private loginService: LoginServiceService) { }

}
