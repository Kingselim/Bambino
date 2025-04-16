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
import { EditCoachingComponent } from './editcoaching/editcoaching.component';
import { AddCoachingComponent } from './addcoaching/addcoaching.component';
import { ExerciceListComponent } from './components/exercice/exercice-list/exercice-list.component';  
import { ExerciceFormComponent } from './components/exercice/exercice-form/exercice-form.component';
import { EditExerciceComponent } from './components/exercice/edit-exercice/edit-exercice.component';
import { AjouterComponent } from './ajouter/ajouter.component';

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
  { path: 'editcoaching/:id', component: EditCoachingComponent },
  { path: 'addcoaching', component: AddCoachingComponent },
  { path: 'exercices', component: ExerciceListComponent },
  { path: 'edit-exercice/:id', component: EditExerciceComponent },
  { path: 'coaching/:id/exercices/ajouter', component: AjouterComponent },
  { path: 'coaching/:id/exercices', component: ExerciceListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
