import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingbackComponent } from './coachingback.component';

describe('CoachingbackComponent', () => {
  let component: CoachingbackComponent;
  let fixture: ComponentFixture<CoachingbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachingbackComponent]
    });
    fixture = TestBed.createComponent(CoachingbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
