## 아이오닉 프로젝트 만들기

ionic start ch06_rxjs blank --type=angular

**커패시터를 사용할까요 라는 질문에는 N을 입력합니다.**

Integrate your new app with Capacitor to target native iOS and Android? (y/N) N

**아이오닉 계정을 만들까요 라는 질문에는 N을 입력합니다.**

Create free Ionic account? (y/N) N

## 아이오닉 프로젝트 설정

**패키지 설치**

npm i firebase --save

npm i @angular/fire --save

npm i @ionic/lab --save-dev

**페이지 추가**

ionic g page observable

ionic g page subject

ionic g page operator

ionic g page creation

ionic g page filter

ionic g page transformation

ionic g page combining

ionic g page conditional

ionic g page mathematical

ionic g page utility

ionic g page error

**서비스 추가**

ionic g service services/dataRealtime

ionic g service services/dataFirestore 

ionic g service services/util

## 아이오닉 프로젝트 실행

ionic serve --lab
