import {KMeetUp} from '../src/app/model/KMeetUp';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GeolocationOptions} from '@ionic-native/geolocation/ngx';
import {NavigationExtras} from '@angular/router';
import {ASAuthorizationAppleIDRequest} from '@ionic-native/sign-in-with-apple/ngx';
import firebase from 'firebase';

export class PlatformMock {
  ready: jasmine.Spy<any>;
  backButton: any;
}

export class BackButtonMock {
  subscribeWithPriority: jasmine.Spy<any>;
}

export class AlertControllerMock {
  public create(param): any {
    return new AlertMock();
  }
}

export class AlertMock {
  public present(): any {
    return;
  }

  public dismiss() {
    return;
  }
}

export class StorageMock {
  get(key: string) {
    return new Promise((resolve, reject) => {
      resolve('kr');
    });
  }

  set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class AuthenticationServiceMock {
  user: Observable<firebase.User>;
  authStateBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    this.user = this.authStateBehaviorSubject.asObservable();
  }

  public signInWithEmailAndPassword(email, password) {
    return new Promise<any>((resolve, reject) => {
      resolve();
    });

  }

  public sendPasswordResetEmail(email) {
    return new Promise((resolve, reject) => {
      resolve();
    });

  }

  public signInWithGoogle() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public signInWithFacebook() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public signInWithApple() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public signUp(email: string, password: string, username: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public signOut(title, text) {
  }

  public isAuthenticated() {
    return true;
  }

  public share(shareMessage: string, shareTitle: string, shareUrl: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public shareViaGooglePlus(shareMessage: string, shareTitle: string, shareUrl: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public shareViaFacebook(shareMessage: string, shareTitle: string, shareUrl: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}

export class FCMMock {
  getToken() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  onTokenRefresh() {
    return of();
  }

  subscribeToTopic(topic: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  unsubscribeFromTopic(topic: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  onNotification() {
    return of();
  }
}

export class UserMock implements firebase.User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: firebase.auth.UserMetadata;
  multiFactor: firebase.User.MultiFactorUser;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: (firebase.UserInfo | null)[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;

  delete(): Promise<void> {
    return Promise.resolve(undefined);
  }

  getIdToken(forceRefresh?: boolean): Promise<string> {
    return Promise.resolve('');
  }

  getIdTokenResult(forceRefresh?: boolean): Promise<firebase.auth.IdTokenResult> {
    return Promise.resolve(undefined);
  }

  linkAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  linkWithPhoneNumber(phoneNumber: string,
                      applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
    return Promise.resolve(undefined);
  }

  linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    return Promise.resolve(undefined);
  }

  reauthenticateAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  reauthenticateWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  reauthenticateWithPhoneNumber(phoneNumber: string,
                                applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
    return Promise.resolve(undefined);
  }

  reauthenticateWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  }

  reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    return Promise.resolve(undefined);
  }

  reload(): Promise<void> {
    return Promise.resolve(undefined);
  }

  sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
    return Promise.resolve(undefined);
  }

  // tslint:disable-next-line:ban-types
  toJSON(): Object {
    return undefined;
  }

  unlink(providerId: string): Promise<firebase.User> {
    return Promise.resolve(undefined);
  }

  updateEmail(newEmail: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  updatePassword(newPassword: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateProfile(profile: { displayName?: string | null; photoURL?: string | null }): Promise<void> {
    return Promise.resolve(undefined);
  }

  verifyBeforeUpdateEmail(newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
    return Promise.resolve(undefined);
  }

}

export class RouterMock {
  navigateByUrl(url, extras?: NavigationExtras) {
    return new Promise((resolve): void => {
      resolve();
    });
  }

  getCurrentNavigation() {
    return {
      extras: {
        state: {
          id: 'dummy'
        }
      }
    };
  }
}

export class NavControllerMock {
  public pop(): any {
    return new Promise((resolve): void => {
      resolve();
    });
  }

  public push(): any {
    return new Promise((resolve): void => {
      resolve();
    });
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return;
  }

}

export class UtilServiceMock {
  pagingCount = 15;
  minZoom = 15;
  MAP_MAX_ZOOM = 20;

  showLoading(message: string) {
  }

  dismissLoading() {
  }

  showAlert(header, message) {
  }

  showToast(message) {
  }

  isCordova() {
    return true;
  }

  isAndroid() {
    return true;
  }

  isiOS() {
    return true;
  }
}

export class DataServiceMock {
  getList() {
    return of();
  }

  getData(pageSize, offset?) {
    return of();
  }

  getCommentAndMeetUpByMeetUpId(meetupId) {
    return of();
  }

  getMeetUpByMeetUpId(meetupId) {
    return of();
  }

  getCommentsByMeetUpId(meetup) {
    return of();
  }

  addComment(meetup, comment, userInfo) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  deleteComment(meetup, comment) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  getLikesByMeetUpId(meetup) {
    return of();
  }

  addLike(meetup, userInfo) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  deleteLike(meetup, like) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  deleteMeetUp(meetup) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  saveMeetUp(meetup: KMeetUp) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  updateMeetUp(meetup) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class GooglePlusMock {
  login(options: any) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class FacebookMock {
  login(permissions: string[]) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class SignInWithAppleMock {
  signin(options?: ASAuthorizationAppleIDRequest) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class GeolocationMock {
  getCurrentPosition(options?: GeolocationOptions) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class CallNumberMock {
  callNumber(numberToCall: string, bypassAppChooser: boolean) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
