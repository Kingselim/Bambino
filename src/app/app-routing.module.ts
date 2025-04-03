import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PregnancyTrackingComponent} from './pregnancy-tracking/pregnancy-tracking.component';
import { ExpertsComponent } from './experts/experts.component';
import { ExpertDetailsComponent } from './expert-details/expert-details.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { ExpertAppointmentComponent } from './expert-appointment/expert-appointment.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection au chargement
  {path: 'about', component: AboutComponent},
  {path: 'experts', component: ExpertsComponent},
  {path: 'expert-appointments/:id', component: ExpertAppointmentComponent},
  { path: 'expert-details/:id', component: ExpertDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'PregnancyTracking', component: PregnancyTrackingComponent  },
  { path: 'appointments', component: AppointmentListComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
