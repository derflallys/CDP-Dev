import { TestBed } from '@angular/core/testing';

import { SprintService } from './sprint.service';

describe('SprintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintService = TestBed.get(SprintService);
    expect(service).toBeTruthy();
  });
});
