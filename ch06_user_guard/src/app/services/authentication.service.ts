import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {MenuController} from '@ionic/angular';
import firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	user: Observable<firebase.User>;
	authStateBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private angularFireAuth: AngularFireAuth,
							private menuController: MenuController) {
		this.user = this.authStateBehaviorSubject.asObservable();
	}

	signInWithEmailAndPassword(email: string, password: string) {
		return this.angularFireAuth.signInWithEmailAndPassword(email, password);
	}

	sendPasswordResetEmail(email: string) {
		return this.angularFireAuth.sendPasswordResetEmail(email);
	}

	signUp(username: string, email: string, password: string) {
		return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
	}

	async signOut() {
		await this.angularFireAuth.signOut();
		this.authStateBehaviorSubject.next(null);
		await this.menuController.toggle();
		await this.menuController.enable(false);
	}

	isAuthenticated() {
		return !!this.authStateBehaviorSubject.value;
	}
}
