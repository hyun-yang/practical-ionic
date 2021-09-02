import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	language: string;

	constructor(private translateService: TranslateService,
							private storage: Storage) {
		this.initializeStorage();
	}

	async initializeStorage() {
		await this.storage.create();
	}

	setAppDefaultLanguage() {
		this.storage.get('KMEETUP_LANGUAGE')
			.then((language) => {
				if (language == null) {
					this.language = 'kr';
					this.translateService.setDefaultLang('kr');
					this.translateService.use('kr');
				} else {
					this.language = language;
					this.translateService.setDefaultLang(language);
					this.translateService.use(language);
				}
			});
	}

	changeLanguage(language: string) {
		this.language = language;
		this.storage.set('KMEETUP_LANGUAGE', language);
		this.translateService.use(language);
	}
}
