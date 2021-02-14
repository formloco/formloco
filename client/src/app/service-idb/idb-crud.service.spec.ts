import { TestBed } from '@angular/core/testing';

import { IdbCrudService } from './idb-crud.service';

describe('IdbCrudService', () => {
  let service: IdbCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
