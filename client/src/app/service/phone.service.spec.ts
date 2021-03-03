import { TestBed } from '@angular/core/testing';

import { PhoneService } from './phone.service';

describe('PhoneService', () => {
  let service: PhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
