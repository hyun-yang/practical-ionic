import {TestBed} from '@angular/core/testing';

import {AuthenticationGuardService} from './authentication-guard.service';
import {AuthenticationService} from './authentication.service';
import {AuthenticationServiceMock} from '../../../test/KMeetUpMock';

describe('Authentication Guard Service', () => {
	let service: AuthenticationGuardService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
			],
		}).compileComponents();
		service = TestBed.inject(AuthenticationGuardService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
