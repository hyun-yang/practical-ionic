import {Component} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	public appPages = [
		{
			title: 'RxJS',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'Observable',
			url: '/observable',
			icon: 'options'
		},
		{
			title: 'Subject',
			url: '/subject',
			icon: 'newspaper'
		},
		{
			title: 'Operator',
			url: '/operator',
			icon: 'hardware-chip'
		}
	];

	constructor() {
	}
}
