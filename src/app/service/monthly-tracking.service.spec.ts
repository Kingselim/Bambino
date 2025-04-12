import { TestBed } from '@angular/core/testing';

import { MonthlyTrackingService } from './monthly-tracking.service';

describe('MonthlyTrackingService', () => {
  let service: MonthlyTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
