import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AlertController, IonicModule, NavController} from '@ionic/angular';
import {MeetupDetailPage} from './meetup-detail.page';
import {DebugElement} from '@angular/core';
import {
	AlertControllerMock,
	AuthenticationServiceMock, CallNumberMock,
	DataServiceMock, GeolocationMock,
	NavControllerMock,
	RouterMock, UserMock,
	UtilServiceMock
} from '../../../test/KMeetUpMock';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {UtilService} from '../services/util.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../environments/environment';
import {By} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

describe('Meetup Detail Page', () => {
	let component: MeetupDetailPage;
	let fixture: ComponentFixture<MeetupDetailPage>;
	let de: DebugElement;
	let el: HTMLElement;
	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {'MAP': 'Map'};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [MeetupDetailPage],
			imports: [
				IonicModule.forRoot(),
				AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
				RouterTestingModule,
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: Geolocation, useClass: GeolocationMock},
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: DataService, useClass: DataServiceMock},
				{provide: UtilService, useClass: UtilServiceMock},
				{provide: CallNumber, useClass: CallNumberMock},
				{provide: NavController, useClass: NavControllerMock},
				{provide: Router, useClass: RouterMock},
				{provide: AlertController, useClass: AlertControllerMock},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MeetupDetailPage);
		component = fixture.componentInstance;
		const user = new UserMock();
		user.uid = 'dummy';
		component.userInfo = user;
		fixture.detectChanges();
	});

	it('should create', () => {
		const translateService = fixture.debugElement.injector.get(TranslateService);
		translateService.setDefaultLang('en');
		de = fixture.debugElement.query(By.css('ion-title'));
		el = de.nativeElement;
		expect(el.textContent).toEqual('Map');
		expect(component).toBeTruthy();
	});

	it('should call addComment', () => {
		const dataService = fixture.debugElement.injector.get(DataService);
		spyOn(dataService, 'addComment').and.callThrough();
		component.addComment();
		expect(dataService.addComment).toHaveBeenCalled();
	});

	it('should call deleteComment', () => {
		const alertController = fixture.debugElement.injector.get(AlertController);
		spyOn(alertController, 'create').and.callThrough();
		component.deleteComment('test');
		expect(alertController.create).toHaveBeenCalled();
	});

	it('should call updateMeetUp', () => {
		const dataService = fixture.debugElement.injector.get(DataService);
		spyOn(dataService, 'updateMeetUp').and.callThrough();
		component.updateMeetUp();
		expect(dataService.updateMeetUp).toHaveBeenCalled();
	});

	it('should call AlertController create', () => {
		const alertController = fixture.debugElement.injector.get(AlertController);
		spyOn(alertController, 'create').and.callThrough();
		component.deleteMeetUp();
		expect(alertController.create).toHaveBeenCalled();
	});

	it('should call callNumber', () => {
		const callNumberService = fixture.debugElement.injector.get(CallNumber);
		spyOn(callNumberService, 'callNumber');
		component.call('01177778888');
		expect(callNumberService.callNumber).toHaveBeenCalledWith('01177778888', true);
	});
});
