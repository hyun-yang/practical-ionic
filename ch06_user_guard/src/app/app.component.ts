import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

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

	constructor(public authenticationService: AuthenticationService) {
	}
}
