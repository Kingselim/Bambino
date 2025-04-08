import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyTrackingFormComponent } from './pregnancy-tracking-form.component';

describe('PregnancyTrackingFormComponent', () => {
  let component: PregnancyTrackingFormComponent;
  let fixture: ComponentFixture<PregnancyTrackingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnancyTrackingFormComponent]
    });
    fixture = TestBed.createComponent(PregnancyTrackingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
