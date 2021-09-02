import {TestBed} from '@angular/core/testing';
import {LanguageService} from './language.service';
import createSpyObj = jasmine.createSpyObj;
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage-angular';

describe('Language Service', () => {
	let service: LanguageService;
	let storageMock;

	beforeEach(() => {
		storageMock = createSpyObj('Storage', ['get', 'set']);
		TestBed.configureTestingModule({
			imports: [
				IonicStorageModule.forRoot(),
				TranslateModule.forRoot(),
			],
			providers: [
				{provide: Storage, useValue: storageMock}
			],
		}).compileComponents();
		service = TestBed.inject(LanguageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
