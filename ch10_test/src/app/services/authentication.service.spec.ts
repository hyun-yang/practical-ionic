import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {FacebookMock, GooglePlusMock, SignInWithAppleMock} from '../../../test/KMeetUpMock';
import {AngularFireModule} from '@angular/fire';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';
import {SignInWithApple} from '@ionic-native/sign-in-with-apple/ngx';
import {environment} from '../../environments/environment';

describe('Authentication Service', () => {
	let service: AuthenticationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(environment.FIREBASE_CONFIG)
			],
			providers: [
				{provide: GooglePlus, useClass: GooglePlusMock},
				{provide: Facebook, useClass: FacebookMock},
				{provide: SignInWithApple, useClass: SignInWithAppleMock},
			],
		}).compileComponents();
		service = TestBed.inject(AuthenticationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
