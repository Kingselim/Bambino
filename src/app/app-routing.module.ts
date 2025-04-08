import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PregnancyTrackingComponent} from './pregnancy-tracking/pregnancy-tracking.component';
import {BabySittingComponent} from './baby-sitting/baby-sitting.component';
import {AlimentationComponent} from './alimentation/alimentation.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {ShopComponent} from './shop/shop.component';
import { CoachingComponent } from './coaching/coaching.component';
import { PregnancyTrackingFormComponent }  from './pregnancy-tracking-form/pregnancy-tracking-form.component';
import { PregnancyTrackingForm2Component } from './pregnancy-tracking-form2/pregnancy-tracking-form2.component';
import { ForumComponent } from './forum/forum.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection au chargement
  {path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'PregnancyTracking', component: PregnancyTrackingComponent  },
  { path: 'backoffice', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule) },
  { path: 'BabySitting', component:BabySittingComponent },
  {path: 'Alimentation', component:AlimentationComponent},
  {path: 'Appointment' , component:AppointmentComponent},
  {path: 'Shop' , component:ShopComponent},
  {path :'Coaching' , component:CoachingComponent},
  {path :'form1' , component:PregnancyTrackingFormComponent},
  {path :'form2' , component:PregnancyTrackingForm2Component},
  {path :'forum' , component:ForumComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
