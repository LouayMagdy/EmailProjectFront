import { TestBed } from '@angular/core/testing';

import { UserBackLinkService } from './user-back-link.service';

describe('UserBackLinkService', () => {
  let service: UserBackLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBackLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
