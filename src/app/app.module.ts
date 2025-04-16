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
import { EditCoachingComponent } from './editcoaching/editcoaching.component';
import { AddCoachingComponent } from './addcoaching/addcoaching.component';
import { ExerciceListComponent } from './components/exercice/exercice-list/exercice-list.component';
import { ExerciceFormComponent } from './components/exercice/exercice-form/exercice-form.component';
import { EditExerciceComponent } from './components/exercice/edit-exercice/edit-exercice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterComponent } from './ajouter/ajouter.component';
import { CoachingbackComponent } from './components/backoffice/coachingback/coachingback.component';

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
    EditCoachingComponent,
    AddCoachingComponent,
    ExerciceListComponent,
    ExerciceFormComponent,
    EditExerciceComponent,
    AjouterComponent,
    CoachingbackComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
