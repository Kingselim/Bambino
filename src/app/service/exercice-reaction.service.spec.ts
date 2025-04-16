import { TestBed } from '@angular/core/testing';

import { ExerciceReactionService } from './exercice-reaction.service';

describe('ExerciceReactionService', () => {
  let service: ExerciceReactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceReactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
