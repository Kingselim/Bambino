import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute to access route params
import { HttpClient } from '@angular/common/http'; // Import HttpClient to fetch appointment data

@Component({
  selector: 'app-appointment-meeting',
  templateUrl: './appointment-meeting.component.html',
  styleUrls: ['./appointment-meeting.component.css']
})
export class AppointmentMeetingComponent implements OnInit {
  appointment: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id'); // Get the appointment ID from the URL

    // Fetch the appointment details using the ID
    if (appointmentId) {
      this.http.get<any>(`http://localhost:8089/appointment/get-one/${appointmentId}`).subscribe(
        (data) => {
          this.appointment = data;
        },
        (error) => {
          console.error('Error fetching appointment details:', error);
        }
      );
    }
  }
}
