import { Component, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { LoginServiceService } from '../../login-service.service';
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
  idNo: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoading) return;

    const mobileNumber = this.mobileNumber.trim();
    const idNo = this.idNo.trim();
    if (!mobileNumber || !/^\d+$/.test(idNo)) {
      this.errorMessage = 'सही मोबाइल नंबर और व्यापारी आई.डी. डालें।';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.loginService.signUp(mobileNumber, idNo).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Backend returns 200 with responseBody "Party not found" for wrong details,
        // so only treat it as a login when an actual party comes back.
        // HIS (Spring) returns one camelCase party; HMB's lambda returns a list of DB rows.
        const body = response?.responseBody;
        const party = Array.isArray(body) ? body[0] : body;
        const partyId = party?.partyId ?? party?.party_id;
        if (!partyId) {
          this.errorMessage = 'मोबाइल नंबर या व्यापारी आई.डी. गलत है।';
          return;
        }
        localStorage.setItem('partyCode', party.partyCode ?? party.party_code);
        localStorage.setItem('partyId', partyId);
        this.valueChange.emit(true);
        this.sharedService.subscribeToNotifications(partyId);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'लॉगिन नहीं हो पाया। इंटरनेट जाँचें और फिर कोशिश करें।';
      },
    });
  }

  constructor(private sharedService: SharedServiceService, private loginService: LoginServiceService) { }

}
