import { TestBed } from '@angular/core/testing';

import { ProcessHttpserviceService } from './process-httpservice.service';

describe('ProcessHttpserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHttpserviceService = TestBed.get(ProcessHttpserviceService);
    expect(service).toBeTruthy();
  });
});
