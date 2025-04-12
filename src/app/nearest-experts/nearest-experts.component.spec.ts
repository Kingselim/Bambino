import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestExpertsComponent } from './nearest-experts.component';

describe('NearestExpertsComponent', () => {
  let component: NearestExpertsComponent;
  let fixture: ComponentFixture<NearestExpertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearestExpertsComponent]
    });
    fixture = TestBed.createComponent(NearestExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
