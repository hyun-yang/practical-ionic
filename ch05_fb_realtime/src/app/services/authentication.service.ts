import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private angularFireAuth: AngularFireAuth) {
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
}
