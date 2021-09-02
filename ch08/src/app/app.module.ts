import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';
import {SignInWithApple} from '@ionic-native/sign-in-with-apple/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {IonicStorageModule} from '@ionic/storage-angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

export function TranslateHttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/language/', '.json');
}

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		HttpClientModule,
		IonicStorageModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
		AngularFireAuthModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (TranslateHttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
	],
	providers: [
		GooglePlus,
		Facebook,
		SignInWithApple,
		Geolocation,
		FCM,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
