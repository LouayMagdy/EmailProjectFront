import { TestBed } from '@angular/core/testing';

import { UserPageGuardService } from './user-page-guard.service';

describe('UserPageGuardService', () => {
  let service: UserPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
