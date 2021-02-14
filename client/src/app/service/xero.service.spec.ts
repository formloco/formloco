import { TestBed } from '@angular/core/testing';

import { XeroService } from './xero.service';

describe('XeroService', () => {
  let service: XeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
