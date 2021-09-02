import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {LoginPage} from './login.page';
import {RouterTestingModule} from '@angular/router/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMock, UtilServiceMock} from '../../../test/KMeetUpMock';
import {UtilService} from '../services/util.service';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

describe('Login Page', () => {
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let routerSpy;
	let de: DebugElement;
	let el: HTMLElement;
	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {"HOME": "KMeetUp"};

	beforeEach(waitForAsync(() => {
		routerSpy = createSpyObj('Router', ['navigateByUrl']);
		TestBed.configureTestingModule({
			declarations: [LoginPage],
			imports: [
				IonicModule.forRoot(),
				RouterTestingModule,
				ReactiveFormsModule,
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: UtilService, useClass: UtilServiceMock},
				{provide: Router, useValue: routerSpy},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
		const email = new FormControl('test@gmail.com');
		const password = new FormControl('123456');
		component.userForm.controls.email = email;
		component.userForm.controls.password = password;
		fixture.detectChanges();
	});

	it('should create', () => {
		const translateService = fixture.debugElement.injector.get(TranslateService);
		translateService.setDefaultLang('en');
		de = fixture.debugElement.query(By.css('ion-title'));
		el = de.nativeElement;
		expect(el.textContent).toEqual('KMeetUp');
		expect(component).toBeTruthy();
	});

	it('should call signInWithEmailAndPassword method', () => {
		const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
		const userCredentialMock = {
			promise: new Promise<UserCredential>((resolve, reject) => resolve())
		};
		spyOn(authenticationService, 'signInWithEmailAndPassword').and.returnValue(userCredentialMock.promise);
		component.signIn();
		expect(authenticationService.signInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', '123456');
	});

	it('should call signInWithGoogle method', () => {
		const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
		const userCredentialMock = {
			promise: new Promise<UserCredential>((resolve, reject) => resolve())
		};
		spyOn(authenticationService, 'signInWithGoogle').and.returnValue(userCredentialMock.promise);
		component.signInWithGoogle();
		expect(authenticationService.signInWithGoogle).toHaveBeenCalled();
	});

	it('should call signInWithFacebook method', () => {
		const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
		const userCredentialMock = {
			promise: new Promise<UserCredential>((resolve, reject) => resolve())
		};
		spyOn(authenticationService, 'signInWithFacebook').and.returnValue(userCredentialMock.promise);
		component.signInWithFacebook();
		expect(authenticationService.signInWithFacebook).toHaveBeenCalled();
	});

	it('should call signInWithApple method', () => {
		const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
		const userCredentialMock = {
			promise: new Promise<UserCredential>((resolve, reject) => resolve())
		};
		spyOn(authenticationService, 'signInWithApple').and.returnValue(userCredentialMock.promise);
		const utilService = fixture.debugElement.injector.get(UtilService);
		spyOn(utilService, 'isiOS').and.returnValue(true);
		component.signInWithApple();
		expect(utilService.isiOS).toHaveBeenCalled();
		expect(authenticationService.signInWithApple).toHaveBeenCalled();
	});

	it('should redirect forgotPassword should be called', () => {
		component.forgotPassword();
		expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/forgotpassword');
	});

	it('should redirect forgotPassword should be called', () => {
		component.signUp();
		expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/signup');
	});
});
