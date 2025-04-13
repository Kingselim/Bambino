import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMeetingComponent } from './appointment-meeting.component';

describe('AppointmentMeetingComponent', () => {
  let component: AppointmentMeetingComponent;
  let fixture: ComponentFixture<AppointmentMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentMeetingComponent]
    });
    fixture = TestBed.createComponent(AppointmentMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
