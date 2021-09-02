import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {UtilService} from '../services/util.service';
import {LanguageService} from '../services/language.service';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.page.html',
	styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

	constructor(public utilService: UtilService,
							public themeService: ThemeService,
							public languageService: LanguageService) {
	}

	ngOnInit() {
	}

	themeSelect(theme: string) {
		this.themeService.changeTheme(theme);
	}

	languageSelect(language: string) {
		this.languageService.changeLanguage(language);
	}
}
