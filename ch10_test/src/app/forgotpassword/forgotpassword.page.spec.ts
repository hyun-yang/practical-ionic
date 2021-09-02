import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ForgotpasswordPage} from './forgotpassword.page';
import {DebugElement} from '@angular/core';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMock, UtilServiceMock} from '../../../test/KMeetUpMock';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {UtilService} from '../services/util.service';

describe('Forgot password Page', () => {
	let component: ForgotpasswordPage;
	let fixture: ComponentFixture<ForgotpasswordPage>;
	let de: DebugElement;
	let el: HTMLElement;

	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {"FORGOT_PASSWORD": "Reset password"};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ForgotpasswordPage],
			imports: [
				IonicModule.forRoot(),
				RouterTestingModule,
				ReactiveFormsModule,
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
				{provide: UtilService, useClass: UtilServiceMock},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForgotpasswordPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotpasswordPage);
		component = fixture.componentInstance;
		const email = new FormControl('test@gmail.com');
		component.userForm.controls.email = email;
		fixture.detectChanges();
	});

	it('should create', () => {
		const translateService = fixture.debugElement.injector.get(TranslateService);
		translateService.setDefaultLang('en');
		de = fixture.debugElement.query(By.css('ion-title'));
		el = de.nativeElement;
		expect(el.textContent).toEqual('Reset password');
		expect(component).toBeTruthy();
	});

	it('should call sendPasswordResetEmail method', () => {
		const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
		spyOn(authenticationService, 'sendPasswordResetEmail').and.returnValue(Promise.resolve());
		component.onSubmit();
		expect(authenticationService.sendPasswordResetEmail).toHaveBeenCalled();
	});
});
