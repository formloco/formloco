import { TestBed } from '@angular/core/testing';

import { IdbSyncService } from './idb-sync.service';

describe('IdbSyncService', () => {
  let service: IdbSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
