import { TestBed } from '@angular/core/testing';

import { TransformRunService } from './transform-run.service';

describe('TransformRunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformRunService = TestBed.get(TransformRunService);
    expect(service).toBeTruthy();
  });
});
