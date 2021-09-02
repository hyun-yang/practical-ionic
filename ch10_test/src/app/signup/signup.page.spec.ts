import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup.page';
import {DebugElement} from '@angular/core';
import {UtilService} from '../services/util.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationServiceMock, UtilServiceMock} from '../../../test/KMeetUpMock';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

describe('Signup Page', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let de: DebugElement;
  let el: HTMLElement;
  const ENGLISH_LANGUAGE = 'en';
  const ENGLISH_TRANSLATIONS = {"REGISTER": "Register"};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPage],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    const username = new FormControl('Test');
    const email = new FormControl('test@gmail.com');
    const password = new FormControl('123456');
    component.userForm.controls.email = email;
    component.userForm.controls.password = password;
    component.userForm.controls.username = username;
    fixture.detectChanges();
  });

  it('should create', () => {
    const translateService = fixture.debugElement.injector.get(TranslateService);
    translateService.setDefaultLang('en');
    de = fixture.debugElement.query(By.css('ion-title'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('Register');
    expect(component).toBeTruthy();
  });

  it('should call signUp method', () => {
    const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    const userCredentialMock = {
      promise: new Promise<UserCredential>((resolve, reject) => resolve())
    };
    spyOn(authenticationService, 'signUp').and.returnValue(userCredentialMock.promise);
    component.onSubmit();
    expect(authenticationService.signUp).toHaveBeenCalled();
  });
});
