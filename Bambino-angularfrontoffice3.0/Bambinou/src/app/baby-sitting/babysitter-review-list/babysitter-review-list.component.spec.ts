import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterReviewListComponent } from './babysitter-review-list.component';

describe('BabysitterReviewListComponent', () => {
  let component: BabysitterReviewListComponent;
  let fixture: ComponentFixture<BabysitterReviewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterReviewListComponent]
    });
    fixture = TestBed.createComponent(BabysitterReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
