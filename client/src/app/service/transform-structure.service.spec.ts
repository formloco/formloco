import { TestBed } from '@angular/core/testing';

import { TransformStructureService } from './transform-structure.service';

describe('TransformStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformStructureService = TestBed.get(TransformStructureService);
    expect(service).toBeTruthy();
  });
});
