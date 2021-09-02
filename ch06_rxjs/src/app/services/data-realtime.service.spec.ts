import { TestBed } from '@angular/core/testing';

import { DataRealtimeService } from './data-realtime.service';

describe('DataRealtimeService', () => {
  let service: DataRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
