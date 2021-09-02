import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {HomePage} from './home.page';
import {DebugElement} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import {TranslateTestingModule} from 'ngx-translate-testing';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMock, DataServiceMock, UserMock, UtilServiceMock} from '../../../test/KMeetUpMock';
import {UtilService} from '../services/util.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../services/data.service';
import {By} from '@angular/platform-browser';

describe('Home Page', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let routerSpy;
	let de: DebugElement;
	let el: HTMLElement;
	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {'MEETUP_LIST': 'MeetUp List'};

	beforeEach(waitForAsync(() => {
		routerSpy = createSpyObj('Router', ['navigateByUrl']);
		TestBed.configureTestingModule({
			declarations: [HomePage],
			imports: [
				IonicModule.forRoot(),
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: DataService, useClass: DataServiceMock},
				{provide: UtilService, useClass: UtilServiceMock},
				{provide: Router, useValue: routerSpy},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		const user = new UserMock();
		user.uid = 'testUser';
		component.userInfo = user;
		fixture.detectChanges();
	});

	it('should create', () => {
		const translateService = fixture.debugElement.injector.get(TranslateService);
		translateService.setDefaultLang('en');
		de = fixture.debugElement.query(By.css('ion-title'));
		el = de.nativeElement;
		expect(el.textContent).toEqual('MeetUp List');
		expect(component).toBeTruthy();
	});

	it('should call getData', () => {
		const dataService = fixture.debugElement.injector.get(DataService);
		spyOn(dataService, 'getData').and.callThrough();
		component.getData('');
		expect(dataService.getData).toHaveBeenCalled();
	});

	it('should call addLike', () => {
		const dataService = fixture.debugElement.injector.get(DataService);
		spyOn(dataService, 'deleteLike').and.callThrough();
		const kmeetup = {likes: [{uid: 'testUser'}]};
		component.addLike(kmeetup);
		expect(dataService.deleteLike).toHaveBeenCalled();
	});

	it('should move to meetup-detail page', () => {
		component.showDetail('testId');
		expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/meetup-detail', {state: {id: 'testId'}});
	});

	it('should move to new-meet-up page', () => {
		component.addNewMeetUp();
		expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/new-meet-up');
	});
});
