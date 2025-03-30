import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  upcomingAppointments: any[] = [];
  historyAppointments: any[] = [];
  todaysAppointments: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserAppointments();
  }

  fetchUserAppointments() {
    const userId = 1; // Hardcoding userId as 1 for now
    this.http.get<any[]>(`http://localhost:8089/appointment/get-all`).subscribe(
      (data) => {
        // Filter the appointments of the user with id = 1
        this.appointments = data.filter(
          (appointment) => appointment.user.id === userId
        );
        this.splitAppointments();
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  splitAppointments() {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();

    this.upcomingAppointments = [];
    this.historyAppointments = [];
    this.todaysAppointments = [];

    this.appointments.forEach((appointment) => {
      const appointmentDateTime = new Date(appointment.appointmentDateTime);
      if (isNaN(appointmentDateTime.getTime())) {
        console.warn('Invalid date format:', appointment.appointmentDateTime);
        this.historyAppointments.push(appointment);
        return;
      }

      const apYear = appointmentDateTime.getFullYear();
      const apMonth = appointmentDateTime.getMonth();
      const apDate = appointmentDateTime.getDate();

      const isSameDay =
        apYear === todayYear && apMonth === todayMonth && apDate === todayDate;

      if (isSameDay) {
        this.todaysAppointments.push(appointment);
      } else if (appointmentDateTime > now) {
        this.upcomingAppointments.push(appointment);
      } else {
        this.historyAppointments.push(appointment);
      }
    });
  }
}
