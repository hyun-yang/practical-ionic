import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import firebase from 'firebase/compat/app';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor() {
		this.initialize();
	}

	initialize() {
		firebase.initializeApp(environment.FIREBASE_CONFIG);
	}
}
