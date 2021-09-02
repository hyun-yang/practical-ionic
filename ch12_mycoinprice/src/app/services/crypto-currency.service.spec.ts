import { TestBed } from '@angular/core/testing';

import { CryptoCurrencyService } from './crypto-currency.service';

describe('CryptoCurrencyService', () => {
  let service: CryptoCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
