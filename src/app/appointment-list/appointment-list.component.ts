import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';
import { CancelAppointmentDialogComponent } from '../cancel-appointment-dialog/cancel-appointment-dialog.component';

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

  historyCurrentPage: number = 1;
appointmentsPerPage: number = 5;  // Or any number you want

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

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

  openEditModal(appointment: any): void {
    // Open the edit appointment modal.
    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      width: '900px',
      data: { appointment: appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the appointment list after editing.
        this.fetchUserAppointments();
      }
    });
  }

  openDeleteModal(appointment: any): void {
    // Open a confirmation modal for deletion.
    const dialogRef = this.dialog.open(DeleteAppointmentDialogComponent, {
      width: '400px',
      height: '260px',
      data: { appointment: appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Call delete endpoint if confirmed.
        this.http.delete(`http://localhost:8089/appointment/delete/${appointment.idAppointment}`)
          .subscribe(() => {
            //alert('Appointment deleted successfully.');
            this.fetchUserAppointments();
          }, error => {
            console.error("Error deleting appointment:", error);
            alert("Error deleting appointment.");
          });
      }
    });
  }


  // cancelAppointment(appointment: any): void {
  //   if (confirm('Are you sure you want to cancel this appointment?')) {
  //     this.http.put(`http://localhost:8089/appointment/cancel/${appointment.idAppointment}`, {})
  //       .subscribe(() => {
  //         alert('Appointment canceled successfully.');
  //         this.fetchUserAppointments();
  //       }, error => {
  //         console.error("Error canceling appointment:", error);
  //         alert("Error canceling appointment.");
  //       });
  //   }
  // }

  openCancelModal(appointment: any): void {
    const dialogRef = this.dialog.open(CancelAppointmentDialogComponent, {
      width: '400px',
      height: '260px',
      data: { appointment: appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Optionally, call fetchUserAppointments to refresh the list, or handle UI updates.
        this.fetchUserAppointments();
      }
    });
  }

  goToAppointmentMeeting(appointment: any): void {
    // Navigate to the appointment meeting page
    this.router.navigate(['/appointment-meeting', appointment.idAppointment]);
  }


  get paginatedHistoryAppointments() {
    const startIndex = (this.historyCurrentPage - 1) * this.appointmentsPerPage;
    return this.historyAppointments.slice(startIndex, startIndex + this.appointmentsPerPage);
  }
  
  changeHistoryPage(page: number) {
    this.historyCurrentPage = page;
  }
  
  get totalHistoryPages(): number[] {
    return Array.from({ length: Math.ceil(this.historyAppointments.length / this.appointmentsPerPage) }, (_, i) => i + 1);
  }








  downloadPDF(appointmentId: number): void {
    const pdfUrl = `http://localhost:8089/download/summary/meeting-summary-${appointmentId}.pdf`;

    // Trigger file download by creating an invisible link and clicking it programmatically
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.click();
  }





}
