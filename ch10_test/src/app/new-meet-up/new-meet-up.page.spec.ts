import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {NewMeetUpPage} from './new-meet-up.page';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {AuthenticationServiceMock, DataServiceMock, GeolocationMock, UserMock, UtilServiceMock} from '../../../test/KMeetUpMock';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {DataService} from '../services/data.service';
import {UtilService} from '../services/util.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../environments/environment';
import {By} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

describe('New MeetUp Page', () => {
	let component: NewMeetUpPage;
	let fixture: ComponentFixture<NewMeetUpPage>;
	let de: DebugElement;
	let el: HTMLElement;
	const formBuilder: FormBuilder = new FormBuilder();
	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {"MAP": "Map"};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [NewMeetUpPage],
			imports: [
				IonicModule.forRoot(),
				AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
				RouterTestingModule,
				ReactiveFormsModule,
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: Geolocation, useClass: GeolocationMock},
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: DataService, useClass: DataServiceMock},
				{provide: UtilService, useClass: UtilServiceMock},
				{provide: FormBuilder, useValue: formBuilder}
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewMeetUpPage);
		component = fixture.componentInstance;
		const user = new UserMock();
		user.uid = 'testUser';
		component.userInfo = user;
		const meetupMap = {latitude: 12345, longitude: 12345};
		component.meetup.map = meetupMap;
		component.meetup = {uid: null, name: '', title: '', description: '', date: '', phone: '', map: meetupMap};
		component.minDate = new Date().toISOString();
		component.userForm = formBuilder.group({
			name: 'test',
			title: 'test',
			description: 'test',
			phone: '011 7777 8888',
			date: '2021-01-01',
		});

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

	it('should call saveMeetUp', () => {
		const dataService = fixture.debugElement.injector.get(DataService);
		spyOn(dataService, 'saveMeetUp').and.callThrough();
		component.saveMeetUp();
		expect(dataService.saveMeetUp).toHaveBeenCalled();
	});
});
