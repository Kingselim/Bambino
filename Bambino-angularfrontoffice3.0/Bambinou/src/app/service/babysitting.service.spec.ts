import { TestBed } from '@angular/core/testing';

import { BabysittingService } from './babysitting.service';

describe('BabysittingService', () => {
  let service: BabysittingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabysittingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
