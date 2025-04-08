import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyTrackingForm2Component } from './pregnancy-tracking-form2.component';

describe('PregnancyTrackingForm2Component', () => {
  let component: PregnancyTrackingForm2Component;
  let fixture: ComponentFixture<PregnancyTrackingForm2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnancyTrackingForm2Component]
    });
    fixture = TestBed.createComponent(PregnancyTrackingForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
