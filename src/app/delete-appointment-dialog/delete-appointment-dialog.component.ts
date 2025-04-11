import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-appointment-dialog',
  templateUrl: './delete-appointment-dialog.component.html',
  styleUrls: ['./delete-appointment-dialog.component.css']
})
export class DeleteAppointmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: any },
    private http: HttpClient
  ) {}

  confirmDelete() {
    this.http.delete(`http://localhost:8089/appointment/delete/${this.data.appointment.idAppointment}`)
      .subscribe(
        () => {
          //alert('Appointment deleted successfully.');
          this.dialogRef.close(true); // Close dialog and return success
        },
        error => {
          console.error('Error deleting appointment:', error);
          alert('Error deleting appointment.');
        }
      );
  }

  cancel() {
    this.dialogRef.close(false); // Close dialog without deleting
  }
}
