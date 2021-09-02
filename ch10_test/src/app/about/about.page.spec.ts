import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {AboutPage} from './about.page';
import {DebugElement} from '@angular/core';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {TranslateService} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMock} from '../../../test/KMeetUpMock';

describe('About Page', () => {
	let component: AboutPage;
	let fixture: ComponentFixture<AboutPage>;

	let de: DebugElement;
	let el: HTMLElement;

	const ENGLISH_LANGUAGE = 'en';
	const ENGLISH_TRANSLATIONS = {'ABOUT': 'About'};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AboutPage],
			imports: [
				IonicModule.forRoot(),
				TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, ENGLISH_TRANSLATIONS)
			],
			providers: [
				{provide: AuthenticationService, useClass: AuthenticationServiceMock},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AboutPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		const translateService = fixture.debugElement.injector.get(TranslateService);
		translateService.setDefaultLang('en');
		de = fixture.debugElement.query(By.css('ion-title'));
		el = de.nativeElement;
		expect(el.textContent).toEqual('About');
		expect(component).toBeTruthy();
	});
});
