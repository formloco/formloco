import { TestBed } from '@angular/core/testing';

import { SuccessService } from './success.service';

describe('SuccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessService = TestBed.get(SuccessService);
    expect(service).toBeTruthy();
  });
});
