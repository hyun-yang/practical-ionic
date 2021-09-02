## 아이오닉 프로젝트 만들기

ionic start ch09_fb_realtime_ios blank --type=angular --capacitor

## 아이오닉 프로젝트 설정

**페이지 추가**

ionic g page login

ionic g page signup

ionic g page forgotpassword

ionic g page meetupDetail

ionic g page newMeetUp

ionic g page setting

ionic g page about

**서비스 추가**

ionic g service services/data

ionic g service services/authentication

ionic g service services/authenticationGuard

ionic g service services/util

ionic g service services/theme

ionic g service services/language

**패키지 설치**

npm i firebase --save

npm i @angular/fire --save

npm i @capacitor/splash-screen --save

npm i @ionic-native/core --save

npm i @ionic/lab --save-dev

**커패시터 설정**

npx cap init KMeetUp io.mycompany.kmeetup

**구글, 페이스북,애플 로그인**

npm i capacitor-firebase-auth@3.0.0-rc.0 --save

**구글맵**

npm i @capacitor-community/capacitor-googlemaps-native --save

**위치 정보**

npm i @capacitor/geolocation --save

**알림 메시지**

npm i @capacitor/push-notifications --save

**전화걸기**

npm i call-number --save

npm i @ionic-native/call-number --save

## 아이오닉 프로젝트 실행

ionic serve --lab
