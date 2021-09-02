## 아이오닉 프로젝트 만들기

ionic start ch07_ios blank --type=angular

**커패시터를 사용할까요 라는 질문에는 Y을 입력합니다.**

Integrate your new app with Capacitor to target native iOS and Android? (y/N) Y

아래처럼 한 줄로 커패시터 프로젝트를 생성할 수도 있다.

ionic start ch07_ios blank --type=angular --capacitor

## 아이오닉 프로젝트 설정

**패키지 설치**

npm i firebase --save

npm i @angular/fire --save

npm i @capacitor/splash-screen --save

npm i @capacitor/status-bar --save

**페이지 추가**

ionic g page login

ionic g page signup

ionic g page forgotpassword

ionic g page meetupDetail

ionic g page setting

ionic g page about

**서비스 추가**

ionic g service services/data

ionic g service services/authentication

ionic g service services/util

ionic g service services/authenticationGuard

**소셜 로그인**

npm i capacitor-firebase-auth@3.0.0-rc.0 --save

**구글맵**

npm i @capacitor-community/capacitor-googlemaps-native --save

**위치 정보**

npm i @capacitor/geolocation --save

**알림 메시지**

npm i @capacitor/push-notifications --save

**커패시터 추가**

ionic integrations enable capacitor

npm i @capacitor/ios

**커패시터 설정 순서**

1) 커패시터 초기화

npx cap init KMeetUp io.mycompany.kmeetup

2) capacitor.config.json 수정
   
3) 앱 빌드

ionic build

4) 플랫폼 추가

npx cap add ios

5) 플러그인을 추가한 후 동기화 

npx cap sync

6) ios 의 pod 파일을 변경하면( 플러그인 추가등 ) 아래 명령어로 해당 pod를 설치

npx cap update ios

만일 아래 에러가 나면 아래 명령어를 실행

xcode-select: error: command line tools are already installed, use "Software Update" to install updates
Updating iOS native dependencies with pod install - failed!

sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

https://stackoverflow.com/questions/17980759/xcode-select-active-developer-directory-error

7) Xcode로 프로젝트 빌드

npx cap open ios

8) 앱을 수정, 빌드 후 아래 명령어로 변경 사항 적용

npx cap copy


## 아이오닉 프로젝트 실행

ionic serve --lab


