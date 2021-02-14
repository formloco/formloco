import { TestBed } from '@angular/core/testing';

import { IdbPersistenceService } from './idb-persistence.service';

describe('IdbPersistenceService', () => {
  let service: IdbPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
