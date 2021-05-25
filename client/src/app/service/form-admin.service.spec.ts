import { TestBed } from '@angular/core/testing';

import { FormAdminService } from './form-admin.service';

describe('FormAdminService', () => {
  let service: FormAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
