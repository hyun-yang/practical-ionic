import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import firebase from 'firebase';
import {SplashScreen} from '@capacitor/splash-screen';
import {
  PushNotificationSchema,
  PushNotifications,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/push-notifications';
import {environment} from '../environments/environment';
import {Platform} from '@ionic/angular';
import {UtilService} from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {
      title: '함께 모임',
      url: '/home',
      icon: 'home'
    },
    {
      title: '환경 설정',
      url: '/setting',
      icon: 'settings'
    },
    {
      title: '소개',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  constructor(private platform: Platform,
              public authenticationService: AuthenticationService,
              private utilService: UtilService) {
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp(environment.FIREBASE_CONFIG);
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
      this.configurePushNotification();
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
}
