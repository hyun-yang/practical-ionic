import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {MenuController, Platform} from '@ionic/angular';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';
import {SignInWithApple} from '@ionic-native/sign-in-with-apple/ngx';
import {ASAuthorizationAppleIDRequest} from '@ionic-native/sign-in-with-apple';
import firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	user: Observable<firebase.User>;
	authStateBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private angularFireAuth: AngularFireAuth,
							private menuController: MenuController,
							private googlePlus: GooglePlus,
							private facebook: Facebook,
							private apple: SignInWithApple,
							private platform: Platform) {
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
		await this.menuController.enable(false);
	}

	isAuthenticated() {
		return !!this.authStateBehaviorSubject.value;
	}

	signInWithGoogle() {
		if (this.platform.is('cordova')) {
			return this.googlePlus.login({
					webClientId: '클라이언트ID.apps.googleusercontent.com',
					offline: true
				}
			).then(result => {
				const googleCredential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
				return this.angularFireAuth.signInWithCredential(googleCredential);
			});
		} else {
			return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		}
	}

	signInWithFacebook() {
		if (this.platform.is('cordova')) {
			return this.facebook.login(['email', 'public_profile'])
				.then(result => {
					const facebookCredential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
					return this.angularFireAuth.signInWithCredential(facebookCredential);
				});
		} else {
			return this.angularFireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
		}
	}

	signInWithApple() {
		if (this.platform.is('ios')) {
			return this.apple.signin({
				requestedScopes: [
					ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
					ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
				]
			})
				.then(result => {
					const appleCredential = new firebase.auth.OAuthProvider('apple.com')
						.credential(result.identityToken);
					return this.angularFireAuth.signInWithCredential(appleCredential);
				});
		}
	}
}
