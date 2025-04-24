import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
import { BabyFormComponent } from './baby-sitting/baby-form/baby-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BabysitterListComponent } from './babysitter-list/babysitter-list.component';
//import { ReviewComponent } from './baby-sitting/review/review.component';

import { ReviewComponent } from './baby-sitting/review/review.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BabysitterReviewListComponent } from './baby-sitting/babysitter-review-list/babysitter-review-list.component';
import { ReviewbabysitterFormComponent } from './baby-sitting/reviewbabysitter-form/reviewbabysitter-form.component';
import { ParentContractListComponent } from './baby-sitting/parent-contract-list/parent-contract-list.component';
import { BabyListFrontComponent } from './baby-sitting/baby-list-front/baby-list-front.component';

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
    BabyFormComponent,
    BabysitterListComponent,
    BabysitterReviewListComponent,
    ReviewbabysitterFormComponent,
    ParentContractListComponent,
    BabyListFrontComponent,
    //ReviewComponent
    
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // 👈 obligatoire pour les animations
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // ou top-center, bottom-center, etc.
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
