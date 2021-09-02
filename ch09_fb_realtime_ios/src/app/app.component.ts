import {Component, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {ThemeService} from './services/theme.service';
import {LanguageService} from './services/language.service';
import firebase from 'firebase';
import {AlertController, IonRouterOutlet, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {UtilService} from './services/util.service';
import {TranslateService} from '@ngx-translate/core';
import {LocationStrategy} from '@angular/common';
import {SplashScreen} from '@capacitor/splash-screen';
import {
	PushNotificationSchema,
	PushNotifications,
	PushNotificationToken,
	PushNotificationActionPerformed,
} from '@capacitor/push-notifications';
import {environment} from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	@ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
	userInfo: firebase.User;
	counter = 0;

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

	constructor(private platform: Platform,
							private router: Router,
							private alertController: AlertController,
							private locationStrategy: LocationStrategy,
							private translateService: TranslateService,
							public authenticationService: AuthenticationService,
							private themeService: ThemeService,
							public languageService: LanguageService,
							private utilService: UtilService) {
		authenticationService.user.subscribe(result => {
			this.userInfo = result;
		});
		this.initializeApp();
	}

	initializeApp() {
		firebase.initializeApp(environment.FIREBASE_CONFIG);
		this.platform.ready().then(async () => {
			await SplashScreen.hide();
			this.setAppTheme();
			this.setAppLanguage();
			this.configurePushNotification();
			this.routerOutlet.swipeGesture = false;
		});
	}

	configurePushNotification() {
		PushNotifications.requestPermissions().then(result => {
			if (result.receive === 'granted') {
				PushNotifications.register();
			} else {
				this.utilService.showAlert('에러', '알림 메시지 등록 에러가 발생했습니다.');
			}
		});

		PushNotifications.addListener(
			'registration',
			(token: PushNotificationToken) => {
				console.log(JSON.stringify(token));
			},
		);

		PushNotifications.addListener('registrationError', (error: any) => {
			this.utilService.showAlert('에러 ', JSON.stringify(error));
		});

		PushNotifications.addListener(
			'pushNotificationReceived',
			(notification: PushNotificationSchema) => {
				console.log(JSON.stringify(notification));
			},
		);

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			(notification: PushNotificationActionPerformed) => {
				console.log(JSON.stringify(notification));
			},
		);
	}

	setAppTheme() {
		this.themeService.setAppDefaultTheme();
	}

	setAppLanguage() {
		this.languageService.setAppDefaultLanguage();
	}

}
