import { TestBed } from '@angular/core/testing';

import { BuilderControlService } from './builder-control.service';

describe('BuilderControlService', () => {
  let service: BuilderControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuilderControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
