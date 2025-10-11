import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './common-dialog.component.html',
  styleUrl: './common-dialog.component.scss'
})
export class CommonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) { }

  onConfirm(val: string): void {
    if (val.trim().toLowerCase() === 'logout')
      this.dialogRef.close(true); // return true when confirmed
    else
      this.dialogRef.close(false);
  }

  onCancel(): void {
    this.dialogRef.close(false); // return false when canceled
  }
}
