import { TestBed } from '@angular/core/testing';

import { SongsMockDbService } from './songs-mock-db.service';

describe('SongsMockDbService', () => {
  let service: SongsMockDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongsMockDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
