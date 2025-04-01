import { NgModule } from '@angular/core';
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


@NgModule({
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
    DeleteAppointmentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ExpertDetailsComponent,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents: [EditAppointmentDialogComponent, DeleteAppointmentDialogComponent]
})
export class AppModule { }
