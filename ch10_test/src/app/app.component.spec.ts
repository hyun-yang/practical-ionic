import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {AlertControllerMock, AuthenticationServiceMock, BackButtonMock, FCMMock, PlatformMock, StorageMock} from '../../test/KMeetUpMock';
import {AuthenticationService} from './services/authentication.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {Storage} from '@ionic/storage';
import {ThemeService} from './services/theme.service';
import {LanguageService} from './services/language.service';
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
	let statusBarMock;
	let splashScreenMock;
	let platformMock;
	let backButtonMock;
	let themeServiceMock;
	let languageServiceMock;
	const platformReadySpy = createSpy().and.returnValue(Promise.resolve());
	const setAppDefaultThemeSpy = createSpy().and.returnValue('light');
	const setAppDefaultLanguageSpy = createSpy().and.returnValue('en');
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(waitForAsync(() => {
		statusBarMock = createSpyObj('StatusBar', ['styleDefault']);
		splashScreenMock = createSpyObj('SplashScreen', ['hide']);
		themeServiceMock = createSpyObj('ThemeService', ['setAppDefaultTheme']);
		languageServiceMock = createSpyObj('LanguageService', ['setAppDefaultLanguage']);
		backButtonMock = new BackButtonMock();
		backButtonMock.subscribeWithPriority = createSpy('subscribeWithPriority', (priority, fn) => {
		});

		platformMock = new PlatformMock();
		platformMock.backButton = backButtonMock;
		platformMock.ready = platformReadySpy;

		themeServiceMock.setAppDefaultTheme = setAppDefaultThemeSpy;
		languageServiceMock.setAppDefaultLanguage = setAppDefaultLanguageSpy;

		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				RouterTestingModule,
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{provide: StatusBar, useValue: statusBarMock},
				{provide: SplashScreen, useValue: splashScreenMock},
				{provide: Platform, useValue: platformMock},
				{provide: AlertController, useClass: AlertControllerMock},
				{provide: ThemeService, useValue: themeServiceMock},
				{provide: LanguageService, useValue: languageServiceMock},
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: FCM, useClass: FCMMock},
				{provide: Storage, useClass: StorageMock}
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create the appComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the app', async () => {
		expect(platformMock.ready).toHaveBeenCalled();
		await platformReadySpy;
		expect(statusBarMock.styleDefault).toHaveBeenCalled();
		expect(splashScreenMock.hide).toHaveBeenCalled();
	});

	it('should have 3 pages', () => {
		expect(component.appPages.length).toEqual(3);
	});

	it('should call Platform ready method', () => {
		component.initializeApp();
		expect(platformMock.ready).toHaveBeenCalled();
	});

	it('should call alertController create method', () => {
		const alertController = fixture.debugElement.injector.get(AlertController);
		spyOn(alertController, 'create').and.callThrough();
		component.confirmExit();
		expect(alertController.create).toHaveBeenCalled();
	});

	it('should call setAppDefaultTheme method', () => {
		component.setAppTheme();
		expect(themeServiceMock.setAppDefaultTheme).toHaveBeenCalled();
	});

	it('should call setAppDefaultLanguage method', () => {
		component.setAppLanguage();
		expect(languageServiceMock.setAppDefaultLanguage).toHaveBeenCalled();
	});
});
