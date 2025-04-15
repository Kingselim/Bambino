import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.css']
})
export class EditAppointmentDialogComponent implements OnInit {
  appointment: any;
  selectedDate: Date | null = null;
  selectedTimeSlot: string = "";
  morningSlots: string[] = [];
  eveningSlots: string[] = [];
  expert: any;
  bookedSlots: Set<string> = new Set();

  constructor(
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: any },
    private http: HttpClient
  ) {
    this.appointment = { ...data.appointment };
    this.selectedDate = this.parseDate(this.appointment.appointmentDateTime);
    this.selectedTimeSlot = this.parseTime(this.appointment.appointmentDateTime);
    this.fetchExpertAppointments(this.appointment.expert.id);
  }

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    this.morningSlots = this.createSlots(8, 12);
    this.eveningSlots = this.createSlots(14, 18);
  }

  createSlots(startHour: number, endHour: number): string[] {
    let slots: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      //const h = hour.toString().padStart(2);
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  }

  parseDate(dateTime: string): Date | null {
    if (!dateTime) return null;
    return new Date(dateTime.split(' ')[0]);
  }

  parseTime(dateTime: string): string {
    return dateTime ? dateTime.split(' ')[1] : "";
  }

  fetchExpertAppointments(expertId: number) {
    this.http.get<any>(`http://localhost:8089/expert/retrieve-expert/${expertId}`).subscribe(
      (response) => {
        this.expert = response;
        this.bookedSlots = new Set(
          this.expert.expertAppointments.map((app: any) => app.appointmentDateTime.trim())
        );
      },
      (error) => console.error('Error fetching expert data:', error)
    );
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
  }

  isSlotBooked(slot: string): boolean {
    if (!this.selectedDate) return false;
    const formattedDate = this.formatDate(this.selectedDate);
    const checkingSlot = `${formattedDate} ${slot}`.trim();
    return this.bookedSlots.has(checkingSlot) && checkingSlot !== this.appointment.appointmentDateTime.trim();
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  save() {
    if (!this.selectedDate || !this.selectedTimeSlot) {
      Swal.fire({
                icon: 'error',
                title: 'editing failed',
                text: 'Please select both a date and a time slot.',
                showConfirmButton: true
              });
      return;
    }
    const newAppointmentDateTime = `${this.formatDate(this.selectedDate)} ${this.selectedTimeSlot}`;
    if (new Date(newAppointmentDateTime) <= new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'editing failed',
        text: 'The new appointment date/time must be in the future.',
        showConfirmButton: true
      });
      return;
    }
    if (this.isSlotBooked(this.selectedTimeSlot)) {
      Swal.fire({
        icon: 'error',
        title: 'editing failed',
        text: 'This time slot is already booked by the expert. Please choose another time.',
        showConfirmButton: true
      });
      return;
    }
    const updatedAppointmentDTO = {
      location: this.appointment.location,
      status: this.appointment.status,
      description: this.appointment.description,
      appointmentDateTime: newAppointmentDateTime,
      userId: this.appointment.user?.id || 0,
      expertId: this.appointment.expert?.id || 0,
      driverId: this.appointment.driver ? this.appointment.driver.idDriver : 0
    };
    this.http.put(`http://localhost:8089/appointment/modify/${this.appointment.idAppointment}`, updatedAppointmentDTO)
      .subscribe(
        () => {
          //alert('Appointment updated successfully.');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating appointment:', error);
          Swal.fire({
            icon: 'error',
            title: 'editing failed',
            text: 'Error updating appointment. Please try again.',
            showConfirmButton: true
          });
        }
      );
  }
  selectSlot(slot: string) {
    if (!this.isSlotBooked(slot)) {
      this.selectedTimeSlot = slot;
    }
  }
  

  cancel() {
    this.dialogRef.close(false);
  }
}
