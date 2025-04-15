import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PregnancyTrackingComponent } from './pregnancy-tracking/pregnancy-tracking.component';
import { ExpertsComponent } from './experts/experts.component';
import { ExpertDetailsComponent } from './expert-details/expert-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { EditAppointmentDialogComponent } from './edit-appointment-dialog/edit-appointment-dialog.component';
import { DeleteAppointmentDialogComponent } from './delete-appointment-dialog/delete-appointment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpertAppointmentComponent } from './expert-appointment/expert-appointment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { HoverDetailsDialogComponent } from './hover-details-dialog/hover-details-dialog.component';
import { ExpertStatisticsComponent } from './expert-statistics/expert-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { CancelAppointmentDialogComponent } from './cancel-appointment-dialog/cancel-appointment-dialog.component';
import { NearestExpertsComponent } from './nearest-experts/nearest-experts.component';
import { AppointmentMeetingComponent } from './appointment-meeting/appointment-meeting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingUrgenceComponent } from './meeting-urgence/meeting-urgence.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    PregnancyTrackingComponent,
    ExpertsComponent,
    AppointmentListComponent,
    EditAppointmentDialogComponent,
    DeleteAppointmentDialogComponent,
    ExpertAppointmentComponent,
    HoverDetailsDialogComponent,
    ExpertStatisticsComponent,
    CancelAppointmentDialogComponent,
    NearestExpertsComponent,
    AppointmentMeetingComponent,
    MeetingUrgenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ExpertDetailsComponent,
    NgChartsModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents: [EditAppointmentDialogComponent, DeleteAppointmentDialogComponent]
})
export class AppModule { }
