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

	themeSelect(event: CustomEvent) {
		this.themeService.changeTheme(event.detail.value);
	}

	languageSelect(event: CustomEvent) {
		this.languageService.changeLanguage(event.detail.value);
	}
}
