import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hover-details-dialog',
  template: `
    <h3>Appointment Details</h3>
    <p><strong>Date/Time:</strong> {{ data.appointment.appointmentDateTime }}</p>
    <p><strong>Patient Name:</strong> {{ data.appointment.user.name }}</p>
    <p><strong>Location:</strong> {{ data.appointment.location }}</p>
    <p><strong>Status:</strong> {{ data.appointment.status }}</p>
    <p><strong>Driver:</strong> {{ data.appointment.driver?.nameDriver || 'No Driver' }}</p>
  `,
  styles: [`
    h3 {
      margin-top: 0;
    }
  `]
})
export class HoverDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
