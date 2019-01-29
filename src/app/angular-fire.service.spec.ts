import { TestBed } from '@angular/core/testing';

import { AngularFireService } from './angular-fire.service';

describe('AngularFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFireService = TestBed.get(AngularFireService);
    expect(service).toBeTruthy();
  });
});
