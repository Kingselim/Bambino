import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { UserComponent } from './user/user.component';
//import { BabySittingComponent } from './baby-sitting/baby-sitting.component';
import { BabysittingListComponent } from './baby-sitting/babysitting-list/babysitting-list.component';
import { BabyListComponent } from './baby/baby-list/baby-list.component';
//import { BabyFormComponent } from '../baby-sitting/baby-form/baby-form.component';
import { BabysittingFormComponent } from './baby-sitting/babysitting-form/babysitting-form.component';
const routes: Routes = [
 // { path: 'dashboard', component: DashboardComponent },

  { path: '', component: BackofficeComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    {path: 'user', component: UserComponent },
    //{ path: 'BabySitting', component: BabySittingComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'contrats-babysitting', component: BabysittingListComponent },
    { path: 'babies', component: BabyListComponent },
               // pour l'ajout
    //{ path: 'baby-form/:id', component: BabyFormComponent },
    //{ path: 'babysittings/new', component: BabysittingFormComponent },
    { path: 'babysittings/edit/:id', component: BabysittingFormComponent }
  ] 
}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
