import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MenuController} from '@ionic/angular';
import {cfaSignIn, cfaSignOut} from 'capacitor-firebase-auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User>;
  authStateBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private menuController: MenuController) {
    this.user = this.authStateBehaviorSubject.asObservable();
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signUp(username: string, email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async signOut() {
    cfaSignOut().subscribe(async (result) => {
      this.authStateBehaviorSubject.next(null);
      await this.menuController.enable(false);
    });
  }

  signInWithGoogle() {
    return cfaSignIn('google.com');
  }

  signInWithFacebook() {
    return cfaSignIn('facebook.com');
  }

  signInWithApple() {
    return cfaSignIn('apple.com');
  }

  isAuthenticated() {
    return !!this.authStateBehaviorSubject.value;
  }
}
