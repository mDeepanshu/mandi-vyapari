import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PAYEE_NAME, PAYEE_UPI_ID } from '../../utils/constants/payment';

@Component({
  selector: 'app-pay-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatIconModule],
  templateUrl: './pay-dialog.component.html',
  styleUrl: './pay-dialog.component.scss'
})
export class PayDialogComponent {
  upiId = PAYEE_UPI_ID;
  payeeName = PAYEE_NAME;
  copied = false;
  private copiedTimer?: ReturnType<typeof setTimeout>;

  constructor(public dialogRef: MatDialogRef<PayDialogComponent>) { }

  async copyUpiId() {
    try {
      await navigator.clipboard.writeText(this.upiId);
    } catch {
      // Fallback for browsers without the async clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = this.upiId;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    this.copied = true;
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => (this.copied = false), 2500);
  }

  close() {
    this.dialogRef.close();
  }
}
