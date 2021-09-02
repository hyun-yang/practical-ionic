import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {ThemeService} from './services/theme.service';
import {LanguageService} from './services/language.service';
import firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	userInfo: firebase.User;

	public appPages = [
		{
			title: 'HOME',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'SETTING',
			url: '/setting',
			icon: 'settings'
		},
		{
			title: 'ABOUT',
			url: '/about',
			icon: 'information-circle'
		}
	];

	constructor(public authenticationService: AuthenticationService,
							private fcm: FCM,
							private themeService: ThemeService,
							public languageService: LanguageService) {
		authenticationService.user.subscribe(result => {
			this.userInfo = result;
		});
		this.setAppTheme();
		this.setAppLanguage();
		this.configureFCMNotification();
	}

	configureFCMNotification() {
		this.fcm.getToken().then(token => {
			console.log(token);
		});

		this.fcm.onNotification().subscribe(data => {
			if (data.wasTapped) {
				console.log('앱이 백그라운드 상태에서 수신');
			} else {
				console.log('앱이 포그라운드 상태에서 수신');
			}
		});

		this.fcm.onTokenRefresh().subscribe(token => {
		});
	}

	setAppTheme() {
		this.themeService.setAppDefaultTheme();
	}

	setAppLanguage() {
		this.languageService.setAppDefaultLanguage();
	}
}
