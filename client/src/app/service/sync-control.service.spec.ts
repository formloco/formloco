import { TestBed } from '@angular/core/testing';

import { SyncControlService } from './sync-control.service';

describe('SyncControlService', () => {
  let service: SyncControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
