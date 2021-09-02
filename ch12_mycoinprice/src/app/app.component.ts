import {Component} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	public appPages = [
		{
			title: '코인 가격',
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

	constructor() {
	}
}
