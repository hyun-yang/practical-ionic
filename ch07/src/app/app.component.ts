import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {FCM} from '@ionic-native/fcm/ngx';

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

  constructor(public authenticationService: AuthenticationService,
              private fcm: FCM) {
    this.initializeApp();
  }

  initializeApp() {
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
}
