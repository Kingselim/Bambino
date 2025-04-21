import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UserComponent } from './user/user.component';
import { BackofficeComponent } from './backoffice.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AlimentationBComponent } from './alimentation-b/alimentation-b.component';
import { PostsBComponent } from './posts-b/posts-b.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    AlimentationBComponent,
    PostsBComponent,
    SidebarComponent,
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule
    
    
  ]
})

export class BackofficeModule { }
