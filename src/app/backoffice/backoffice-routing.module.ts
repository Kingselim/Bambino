import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { UserComponent } from './user/user.component';
import { PregnancyTracking2Component } from './pregnancy-tracking2/pregnancy-tracking2.component';
import { Forum2Component } from './forum2/forum2.component';
const routes: Routes = [
 // { path: 'dashboard', component: DashboardComponent },

  { path: '', component: BackofficeComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    {path: 'user', component: UserComponent },
    { path: 'pregnancytracking2', component: PregnancyTracking2Component },
    {path: 'forum2' , component: Forum2Component},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  

  ] 
}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
