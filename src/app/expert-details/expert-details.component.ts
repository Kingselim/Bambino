import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css'],
  //providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,]
})
export class ExpertDetailsComponent implements OnInit {
  expert: any;
  morningSlots: string[] = [];
  eveningSlots: string[] = [];
  currentDate = new Date();
  //selectedDate: Date | null = null; // Store selected date
  drivers: any[] = []; // Store retrieved drivers

  selectedDate: Date | null = null;
  selectedTimeSlot: string = "";
  selectedDriverId: number = 0; // 0 means no driver selected


  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchExpertDetails(id);
    this.generateTimeSlots();

    this.fetchDrivers();
  }

  fetchDrivers() {
    this.http.get<any[]>('http://localhost:8089/driver/retrieve-all-drivers').subscribe(
      (data) => {
        this.drivers = data;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }


  fetchExpertDetails(id: string | null) {
    if (id) {
      this.http.get<any>(`http://localhost:8089/expert/retrieve-expert/${id}`).subscribe(data => {
        this.expert = data;
      });
    }
  }


  generateTimeSlots() {
    this.morningSlots = this.createSlots(8, 12);
    this.eveningSlots = this.createSlots(14, 17);
  }

  createSlots(startHour: number, endHour: number): string[] {
    let slots: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00 AM`);
      slots.push(`${hour}:30 AM`);
    }
    return slots;
  }


  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log('Selected Date:', this.selectedDate);
  }




  isSlotBooked(slot: string): boolean {
    // If no date is selected or expert appointments are not loaded, the slot is available.
    if (!this.selectedDate || !this.expert || !this.expert.expertAppointments) return false;
    
    const dateObj = new Date(this.selectedDate);
    // Format the date as "MM/DD/YYYY"
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    
    // Check if any appointment's appointmentDateTime exactly matches the combination of formatted date and the slot.
    return this.expert.expertAppointments.some((app: any) => {
      return app.appointmentDateTime.trim() === `${formattedDate} ${slot}`.trim();
    });
  }
  








//book appointment

bookAppointment() {
  if (!this.selectedDate || !this.selectedTimeSlot) {
    alert('Please select both an appointment date and a time slot.');
    return;
  }
  
  // Format the date as MM/DD/YYYY:
  const dateObj = new Date(this.selectedDate);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  const appointmentDateTime = `${formattedDate} ${this.selectedTimeSlot}`;

  // Get current date and time for comparison
  const currentDate = new Date();
  const appointmentDate = new Date(`${formattedDate} ${this.selectedTimeSlot}`);
  
  // Validate that the appointment date/time is in the future
  if (appointmentDate <= currentDate) {
    alert('The appointment date/time must be in the future. Please choose a valid date/time.');
    return;
  }

  // Create appointment DTO
  const appointmentDTO = {
    location: "Online",      // Default or set as needed
    status: "Scheduled",     // Default status
    description: "",         // Add description if required
    appointmentDateTime: appointmentDateTime,
    userId: 1,               // Hardcoded user id
    expertId: this.expert ? this.expert.id : null,
    driverId: this.selectedDriverId ? this.selectedDriverId : 0
  };

  this.http.post<any>('http://localhost:8089/appointment/create', appointmentDTO).subscribe(
    response => {
      console.log("Appointment created:", response);
      alert("Appointment booked successfully!");
    },
    error => {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment. Please try again.");
    }
  );
}





  
}
