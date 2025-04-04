import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertStatisticsComponent } from './expert-statistics.component';

describe('ExpertStatisticsComponent', () => {
  let component: ExpertStatisticsComponent;
  let fixture: ComponentFixture<ExpertStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertStatisticsComponent]
    });
    fixture = TestBed.createComponent(ExpertStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
