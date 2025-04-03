// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Appointment {
  appointmentDateTime: string;
  location: string;
  status: string;
  description: string;
  user: { name: string; };
  expert: { id: number; };
  driver?: { nameDriver: string; };
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:8089/appointment'; // update with your endpoint

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/get-all`)
      .pipe(
        // filter for expert id 1
        map(appointments => appointments.filter(app => app.expert.id === 1))
      );
  }
}
