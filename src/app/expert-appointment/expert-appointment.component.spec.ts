import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAppointmentComponent } from './expert-appointment.component';

describe('ExpertAppointmentComponent', () => {
  let component: ExpertAppointmentComponent;
  let fixture: ComponentFixture<ExpertAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertAppointmentComponent]
    });
    fixture = TestBed.createComponent(ExpertAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
