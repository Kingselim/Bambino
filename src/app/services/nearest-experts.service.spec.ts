import { TestBed } from '@angular/core/testing';

import { NearestExpertsService } from './nearest-experts.service';

describe('NearestExpertsService', () => {
  let service: NearestExpertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NearestExpertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
