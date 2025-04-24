import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewbabysitterFormComponent } from './reviewbabysitter-form.component';

describe('ReviewbabysitterFormComponent', () => {
  let component: ReviewbabysitterFormComponent;
  let fixture: ComponentFixture<ReviewbabysitterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewbabysitterFormComponent]
    });
    fixture = TestBed.createComponent(ReviewbabysitterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
