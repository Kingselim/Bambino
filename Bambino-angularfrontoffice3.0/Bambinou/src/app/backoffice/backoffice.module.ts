import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UserComponent } from './user/user.component';
import { BackofficeComponent } from './backoffice.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { BabySittingComponent } from './baby-sitting/baby-sitting.component';
import { BabysittingListComponent } from './baby-sitting/babysitting-list/babysitting-list.component';
import { BabysittingFormComponent } from './baby-sitting/babysitting-form/babysitting-form.component';

import { BabyListComponent } from './baby/baby-list/baby-list.component';
//import { ReviewComponent } from '../baby-sitting/review/review.component';
//import { BabyFormComponent } from '../baby-sitting/baby-form/baby-form.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    //BabySittingComponent,
    BabysittingListComponent,
    BabyListComponent,
    //BabyFormComponent,
    BabysittingFormComponent
    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    RouterModule
    
  ],
  exports: [
    BabysittingFormComponent // 👈 ajoute ça ici
  ]
})
export class BackofficeModule { }
