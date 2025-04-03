import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UserComponent } from './user/user.component';
import { BackofficeComponent } from './backoffice.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackofficeFooterComponent } from './backoffice-footer/backoffice-footer.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { BackofficeNavbarComponent } from './backoffice-navbar/backoffice-navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    SidebarComponent,
    BackofficeFooterComponent,
    UserDetailComponent,
    LoginFormComponent,
    SignupFormComponent,
    BackofficeNavbarComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent,
    UserProfileComponent,
    ChatComponent
    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    ReactiveFormsModule

    
    
  ]
})
export class BackofficeModule { }
