import { TestBed } from '@angular/core/testing';

import { AdministrationNiveauService } from './administration-niveau.service';

describe('AdministrationNiveauService', () => {
  let service: AdministrationNiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationNiveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
