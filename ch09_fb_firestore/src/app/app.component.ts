import {Component, ViewChild} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {ThemeService} from './services/theme.service';
import {LanguageService} from './services/language.service';
import firebase from 'firebase';
import {AlertController, IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {UtilService} from './services/util.service';
import {TranslateService} from '@ngx-translate/core';
import {LocationStrategy} from '@angular/common';

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
							private splashScreen: SplashScreen,
							private statusBar: StatusBar,
							private router: Router,
							private alertController: AlertController,
							private locationStrategy: LocationStrategy,
							private translateService: TranslateService,
							public authenticationService: AuthenticationService,
							private fcm: FCM,
							private themeService: ThemeService,
							public languageService: LanguageService,
							private utilService: UtilService) {
		authenticationService.user.subscribe(result => {
			console.log(result);
			this.userInfo = result;
		});
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.setAppTheme();
			this.setAppLanguage();
			this.configureFCMNotification();
			this.handleBackToExit();
		});
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

	handleBackToExit() {
		this.platform.backButton.subscribeWithPriority(100, () => {
			if (this.locationStrategy.path() === '/home' ||
				this.locationStrategy.path() === '/setting' ||
				this.locationStrategy.path() === '/about') {
				this.confirmExit();
			} else {
				if (this.routerOutlet && this.routerOutlet.canGoBack() && this.locationStrategy.path() !== '/login') {
					this.routerOutlet.pop();
				} else {
					if (this.counter === 0) {
						this.counter++;
						this.utilService.showToast(this.translateService.instant('EXIT_TOAST_MSG'));
						setTimeout(() => {
							this.counter = 0;
						}, 1500);
					} else {
						this.counter = 0;
						navigator['app'].exitApp();
					}
				}
			}
		});
	}

	async confirmExit() {
		const alert = await this.alertController.create({
			header: this.translateService.instant('EXIT'),
			message: this.translateService.instant('EXIT_CONFIRM_MSG'),
			buttons: [
				{
					text: this.translateService.instant('EXIT'),
					handler: () => {
						this.authenticationService.signOut();
						this.router.navigateByUrl('/login');
					}
				},
				{
					text: this.translateService.instant('CANCEL'),
					handler: () => {
					}
				}
			]
		});
		await alert.present();
	}
}
