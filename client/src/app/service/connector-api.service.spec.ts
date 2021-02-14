import { TestBed } from '@angular/core/testing';

import { ConnectorApiService } from './connector-api.service';

describe('ConnectorApiService', () => {
  let service: ConnectorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
