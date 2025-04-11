import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cancel-appointment-dialog',
  templateUrl: './cancel-appointment-dialog.component.html',
  styleUrls: ['./cancel-appointment-dialog.component.css']
})
export class CancelAppointmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: any },
    private http: HttpClient
  ) { }

  confirmCancel() {
    // Call the cancel endpoint.
    this.http.put(`http://localhost:8089/appointment/cancel/${this.data.appointment.idAppointment}`, {})
      .subscribe(
        () => {
          //alert('Appointment canceled successfully.');
          this.dialogRef.close(true); // Close the modal and indicate success.
        },
        error => {
          console.error('Error canceling appointment:', error);
          //alert('Error canceling appointment.');
          // Close modal even if there is an error (or handle differently if needed).
          this.dialogRef.close(false);
        }
      );
  }

  cancel() {
    this.dialogRef.close(false); // Close the modal without canceling.
  }
}
