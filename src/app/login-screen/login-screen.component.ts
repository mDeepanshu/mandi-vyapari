import { Component, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { LoginServiceService } from '../login-service.service';
@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
  providers: [LoginServiceService]
})
export class LoginScreenComponent {

  @Output() valueChange = new EventEmitter<boolean>();

  onSubmit(event: Event, mobileNumber: string, otp: string) {
    event.preventDefault();
    this.valueChange.emit(true);
    this.sharedService.mobileNumber = mobileNumber;
    this.loginService.signUp().subscribe((response) => {
      localStorage.setItem('permanentAccessCode', '9876');
      localStorage.setItem('vyapariId', '6789');
      // this.sharedService.subscribeToNotifications(this.sharedService.mobileNumber);

    });
  }

  constructor(private sharedService: SharedServiceService, private loginService: LoginServiceService) { }




}
