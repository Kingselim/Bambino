// expert-appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../services/appointment.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-expert-appointment',
  templateUrl: './expert-appointment.component.html',
  styleUrls: ['./expert-appointment.component.css']
})
export class ExpertAppointmentComponent implements OnInit {
  showModal = false;
  modalData = { name: '', time: '', location: '' };
  modalPosition = { x: 0, y: 0 };

  // Calendar layout arrays remain the same
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  hours = this.generateTimeSlots();
  months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }));
  weeks = Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
  selectedMonth = 'January';
  selectedWeek = 'Week 1';

  // Array to hold fetched appointments for expert id 1
  appointments: Appointment[] = [];
  expertId: number = this.sharedService.getExpertId();

  constructor(private appointmentService: AppointmentService,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.expertId = this.sharedService.getExpertId();
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

  private generateTimeSlots() {
    const slots = [];
    // Morning slots (8:00 AM - 12:00 PM)
    for (let hour = 8; hour <= 11; hour++) {
      for (let minute of ['00', '30']) {
        const time = `${hour % 12 || 12}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push(time);
      }
    }
    // Add 12:00 PM separately
    slots.push('12:00 PM');

    // Afternoon slots (2:00 PM - 6:00 PM)
    for (let hour = 14; hour <= 18; hour++) {
      for (let minute of ['00', '30']) {
        if (hour === 18 && minute === '30') break; // Stop at 6:00 PM
        const displayHour = hour % 12 || 12;
        const time = `${displayHour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push(time);
      }
    }
    return slots;
  }

  // Filter appointments based on selected month and week.
  // get filteredAppointments(): Appointment[] {
  //   return this.appointments.filter(app => {
  //     const appDate = this.parseAppointmentDateTime(app.appointmentDateTime);
  //     const monthName = appDate.toLocaleString('en', { month: 'long' });
  //     if (monthName !== this.selectedMonth) return false;
      
  //     // New week boundaries:
  //     const weekNumber = parseInt(this.selectedWeek.split(' ')[1]); // e.g. "Week 1" becomes 1
  //     const startDay = (weekNumber - 1) * 7 + 1; // Week 1: day 1, Week 2: day 8, etc.
  //     const endDay = weekNumber * 7;            // Week 1: day 7, Week 2: day 14, etc.
  //     const day = appDate.getDate();
  //     return day >= startDay && day <= endDay;
  //   });
  // }
  get filteredAppointments(): Appointment[] {
    // Compute week boundaries based on the selected month and week.
    const { start, end } = this.getWeekBoundaries(this.selectedMonth, this.selectedWeek);
    return this.appointments.filter(app => {
      const appDate = this.parseAppointmentDateTime(app.appointmentDateTime);
      // Ensure the appointment is in the correct month.
      const monthName = appDate.toLocaleString('en', { month: 'long' });
      if (monthName !== this.selectedMonth) return false;
      // Check that the appointment's date falls between the boundaries.
      return appDate >= start && appDate <= end;
    });
  }
  
  
  
  

  // Return the appointment that belongs in the grid slot if it exists.
  
  getAppointmentForSlot(day: string, time: string): Appointment | null {
    for (const app of this.filteredAppointments) {
      const appDate = this.parseAppointmentDateTime(app.appointmentDateTime);
      // Get the day name from the appointment’s local date
      const appDay = this.daysOfWeek[appDate.getDay()];
      // Format the appointment time to match the calendar’s time slot format.
      const appTime = this.formatTime(appDate);
      if (appDay === day && appTime === time) {
        return app;
      }
    }
    return null;
  }
  

  // Helper to format a Date object's time into a string matching your slot format (e.g. "9:00 AM")
  
  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes === 0 ? '00' : minutes.toString();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${formattedMinutes} ${period}`;
  }
  

  showDetails(event: MouseEvent, appointment: Appointment) {
    // You might show the dialog details, e.g.:
    this.modalData = { 
      name: appointment.user.name, 
      time: this.formatTime(new Date(appointment.appointmentDateTime.replace(' ', 'T'))), 
      location: appointment.location 
    };
    this.modalPosition = { x: event.clientX + 20, y: event.clientY };
    this.showModal = true;
  }

  hideDetails() {
    this.showModal = false;
  }

  parseAppointmentDateTime(dateTimeStr: string): Date {
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }

  getWeekBoundaries(selectedMonth: string, selectedWeek: string, year: number = 2025): { start: Date; end: Date } {
    // Find month index (0 = January, etc.)
    const monthIndex = this.months.indexOf(selectedMonth);
    // First day of the month (e.g., April 1, 2025)
    const firstOfMonth = new Date(year, monthIndex, 1);
    const firstDayIndex = firstOfMonth.getDay(); // 0 (Sun) ... 6 (Sat)
    
    const weekNumber = parseInt(selectedWeek.split(' ')[1]); // e.g., "Week 1" -> 1
    let startDay: number;
    let endDay: number;
    
    if (weekNumber === 1) {
      // First week: from day 1 to the coming Saturday.
      startDay = 1;
      endDay = 7 - firstDayIndex; // E.g., for April 2025, firstDayIndex is 2 (Tuesday), so endDay = 5.
    } else {
      // Subsequent weeks: first week ended on:
      const firstWeekEnd = 7 - firstDayIndex;
      // Week 2 starts on firstWeekEnd + 1.
      startDay = firstWeekEnd + (weekNumber - 1 - 1) * 7 + 1;
      endDay = startDay + 6;
      // Clamp endDay to the last day of the month.
      const lastDay = new Date(year, monthIndex + 1, 0).getDate();
      if (endDay > lastDay) {
        endDay = lastDay;
      }
    }
    
    // Create Date objects for boundaries.
    const start = new Date(year, monthIndex, startDay);
    const end = new Date(year, monthIndex, endDay, 23, 59, 59); // end of day
    return { start, end };
  }
  
}
