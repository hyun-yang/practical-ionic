import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {IonicStorageModule} from '@ionic/storage-angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CallNumber} from '@ionic-native/call-number/ngx';

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
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (TranslateHttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
	],
	providers: [
		CallNumber,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
