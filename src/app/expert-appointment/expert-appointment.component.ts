import { Component } from '@angular/core';

@Component({
  selector: 'app-expert-appointment',
  templateUrl: './expert-appointment.component.html',
  styleUrls: ['./expert-appointment.component.css']
})
export class ExpertAppointmentComponent {
  showModal = false;
  modalData = { name: '', time: '', location: '' };
  modalPosition = { x: 0, y: 0 };
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Time generation
  hours = this.generateTimeSlots();
  months = Array.from({length: 12}, (_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }));
  weeks = Array.from({length: 4}, (_, i) => `Week ${i + 1}`);
  selectedMonth = 'January';
  selectedWeek = 'Week 1';

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

  showDetails(event: MouseEvent, name: string, time: string, location: string) {
    this.modalData = { name, time, location };
    this.modalPosition = { x: event.clientX + 20, y: event.clientY };
    this.showModal = true;
  }

  hideDetails() {
    this.showModal = false;
  }
}