import { TestBed } from '@angular/core/testing';

import { ConnectorSettingsService } from './connector-settings.service';

describe('ConnectorSettingsService', () => {
  let service: ConnectorSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectorSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
