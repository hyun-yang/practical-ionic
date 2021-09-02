import { TestBed } from '@angular/core/testing';

import { DataFirestoreService } from './data-firestore.service';

describe('DataFirestoreService', () => {
  let service: DataFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
