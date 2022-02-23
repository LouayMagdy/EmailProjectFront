import { TestBed } from '@angular/core/testing';

import { LoggerPageGaurdService } from './logger-page-gaurd.service';

describe('LoggerPageGaurdService', () => {
  let service: LoggerPageGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerPageGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
