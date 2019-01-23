import { TestBed } from '@angular/core/testing';

import { GiphyapiService } from './giphyapi.service';

describe('GiphyapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiphyapiService = TestBed.get(GiphyapiService);
    expect(service).toBeTruthy();
  });
});
