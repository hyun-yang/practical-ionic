import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: '기본 테마',
      url: '/home',
      icon: 'home'
    },
    {
      title: '고급 테마',
      url: '/theme-exercise',
      icon: 'settings'
    }
  ];

  constructor() {
  }

}
