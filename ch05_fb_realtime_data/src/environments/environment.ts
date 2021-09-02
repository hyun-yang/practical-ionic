// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// 아래 정보는 파이이베이스 설정 정보 예시입니다.
// 앱에 파이어베이스를 추가하여 유효한 파이어베이스 설정 정보를 생성한 후, 해당 정보를 입력합니다.

export const environment = {
	production: false,
	FIREBASE_CONFIG: {	
		apiKey: '1234567890',
		authDomain: 'kmeetup-xxxx.firebaseapp.com',
		databaseURL: 'https://kmeetup-xxxx.firebaseio.com',
		projectId: 'kmeetup-xxxx',
		storageBucket: 'kmeetup-xxxx.appspot.com',
		messagingSenderId: '1234567890',
		appId: '1234567890',
		measurementId: '1234567890'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
