import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PregnancyTrackingComponent } from './pregnancy-tracking/pregnancy-tracking.component';
import { BackofficeModule } from './backoffice/backoffice.module';
import { BabySittingComponent } from './baby-sitting/baby-sitting.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ShopComponent } from './shop/shop.component';
import { CoachingComponent } from './coaching/coaching.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './backoffice/forgot-password/forgot-password.component';
import { UserProfileFrontComponent } from './user-profile-front/user-profile-front.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    PregnancyTrackingComponent,
    BabySittingComponent,
    AlimentationComponent,
    AppointmentComponent,
    ShopComponent,
    CoachingComponent,
    UserProfileFrontComponent
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Ajouter l'intercepteur ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
