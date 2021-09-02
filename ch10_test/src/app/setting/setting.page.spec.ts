import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SettingPage } from './setting.page';
import {DebugElement} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import {StorageMock} from '../../../test/KMeetUpMock';
import {LanguageService} from '../services/language.service';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {ThemeService} from '../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';

describe('Setting Page', () => {
  let component: SettingPage;
  let fixture: ComponentFixture<SettingPage>;
  let de: DebugElement;
  let el: HTMLElement;

  let themeServiceMock;
  let languageServiceMock;

  const ENGLISH_LANGUAGE = 'en';
  const ENGLISH_TRANSLATIONS = {"SETTING": "Setting"};

  beforeEach(waitForAsync(() => {
    themeServiceMock = createSpyObj('ThemeService', ['changeTheme']);
    languageServiceMock = createSpyObj('LanguageService', ['changeLanguage']);

    TestBed.configureTestingModule({
      declarations: [SettingPage],
      imports: [
        IonicModule.forRoot(),
        TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
      ],
      providers: [
        {provide: Storage, useClass: StorageMock},
        {provide: ThemeService, useValue: themeServiceMock},
        {provide: LanguageService, useValue: languageServiceMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const translateService = fixture.debugElement.injector.get(TranslateService);
    translateService.setDefaultLang('en');
    de = fixture.debugElement.query(By.css('ion-title'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('Setting');
    expect(component).toBeTruthy();
  });

  it('should call changeTheme method', () => {
    const event = createSpyObj('CustomEvent', ['detail']);
    component.themeSelect(event);
    expect(themeServiceMock.changeTheme).toHaveBeenCalled();
  });

  it('should call changeLanguage method', () => {
    const event = createSpyObj('CustomEvent', ['detail']);
    component.languageSelect(event);
    expect(languageServiceMock.changeLanguage).toHaveBeenCalled();
  });
});
