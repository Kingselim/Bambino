import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to fetch appointment data
import { ActivatedRoute, Router } from '@angular/router';  // Added Router


@Component({
  selector: 'app-appointment-meeting',
  templateUrl: './appointment-meeting.component.html',
  styleUrls: ['./appointment-meeting.component.css']
})
export class AppointmentMeetingComponent implements OnInit {
  appointment: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router  // Inject Router
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


  joinMeeting(): void {
    // Use the appointment ID as the room ID for consistency
    const roomId = this.route.snapshot.paramMap.get('id') || 'default-room';
    this.router.navigate(['/meeting-urgence'], { queryParams: { roomID: roomId } });
  }

  
}
