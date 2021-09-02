import {TestBed} from '@angular/core/testing';
import {ThemeService} from './theme.service';
import createSpyObj = jasmine.createSpyObj;
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage-angular';

describe('Theme Service', () => {
	let service: ThemeService;
	let storageMock;

	beforeEach(() => {
		storageMock = createSpyObj('Storage', ['get', 'set']);
		TestBed.configureTestingModule({
			imports: [
				IonicStorageModule.forRoot(),
				TranslateModule.forRoot()
			],
			providers: [
				{provide: Storage, useValue: storageMock}
			],
		}).compileComponents();
		service = TestBed.inject(ThemeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
