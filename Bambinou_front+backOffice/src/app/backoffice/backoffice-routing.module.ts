import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { UserComponent } from './user/user.component';
import { AlimentationBComponent } from './alimentation-b/alimentation-b.component';
import { PostsBComponent } from './posts-b/posts-b.component';

const routes: Routes = [
  { 
    path: '', 
    component: BackofficeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'alimentation', component: AlimentationBComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'poste' ,component:PostsBComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }