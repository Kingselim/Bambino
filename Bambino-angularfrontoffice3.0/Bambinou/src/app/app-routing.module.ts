import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PregnancyTrackingComponent} from './pregnancy-tracking/pregnancy-tracking.component';
//
import {BabySittingComponent} from './baby-sitting/baby-sitting.component';
import {AlimentationComponent} from './alimentation/alimentation.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {ShopComponent} from './shop/shop.component';
import { CoachingComponent } from './coaching/coaching.component';
import { BabyFormComponent } from './baby-sitting/baby-form/baby-form.component';
import { BabysittingFormComponent } from './backoffice/baby-sitting/babysitting-form/babysitting-form.component';
import { BabysitterReviewListComponent } from './baby-sitting/babysitter-review-list/babysitter-review-list.component';
import { ReviewbabysitterFormComponent } from './baby-sitting/reviewbabysitter-form/reviewbabysitter-form.component';
import { ParentContractListComponent } from './baby-sitting/parent-contract-list/parent-contract-list.component';
import { BabyListFrontComponent } from './baby-sitting/baby-list-front/baby-list-front.component';
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection au chargement
  {path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'PregnancyTracking', component: PregnancyTrackingComponent  },
  { path: 'backoffice', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule) },
  { path: 'BabySitting', component:BabySittingComponent },
  { path: 'baby-sitting/baby-form', component: BabyFormComponent }, //pour l'ajout
  { path: 'baby-sitting/baby-form/:id', component: BabyFormComponent }, // pour l'édition
  {path: 'Alimentation', component:AlimentationComponent},
  {path: 'Appointment' , component:AppointmentComponent},
  {path: 'Shop' , component:ShopComponent},
  {path :'Coaching' , component:CoachingComponent},
  {path: 'babysittings/new', component: BabysittingFormComponent },
  {path: 'babysittings/new/:id', component: BabysittingFormComponent},
  { path: 'reviews/babysitter/:id', component: BabysitterReviewListComponent },
  { path: 'review/babysitting/:id', component: ReviewbabysitterFormComponent },
  { path: 'my-contracts', component: ParentContractListComponent },
  { path: 'services/babysitting/babies', component: BabyListFrontComponent },
  { path: 'services/babysitting/baby-edit/:id', component: BabyFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
