import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UserComponent } from './user/user.component';
import { BackofficeComponent } from './backoffice.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PregnancyTracking2Component } from './pregnancy-tracking2/pregnancy-tracking2.component';
import { Forum2Component } from './forum2/forum2.component';
@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    PregnancyTracking2Component,
    Forum2Component
    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    
    
  ]
})
export class BackofficeModule { }
