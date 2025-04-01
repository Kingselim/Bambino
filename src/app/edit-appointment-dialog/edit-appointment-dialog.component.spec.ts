import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentDialogComponent } from './edit-appointment-dialog.component';

describe('EditAppointmentDialogComponent', () => {
  let component: EditAppointmentDialogComponent;
  let fixture: ComponentFixture<EditAppointmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppointmentDialogComponent]
    });
    fixture = TestBed.createComponent(EditAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
