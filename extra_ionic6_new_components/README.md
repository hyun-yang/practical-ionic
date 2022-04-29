## 아이오닉 프로젝트 만들기
    ionic start extra_ionic6_new_components tabs --type=angular --capacitor

## 아이오닉 프로젝트 설정
#### ionic lab 설치
    npm i @ionic/lab --save-dev

#### date-fns 설치
    npm i date-fns 

## 팝오버 컴포넌트 추가
    ionic g component Popover

## 아이오닉 6 신규 컴포넌트
    Accordion, Breadcrumbs, Datetime 그 외 추가 사항

#### Accordion
    아코디언 값, 그룹, 확장 스타일, scss 설정, 하나 이상의 아코디언 열기/닫기

#### Breadcrumbs
* 기본, 컬러, 아이콘, 아이템 최대 갯수 제한, 확장, 팝오버
* 예제에서 팝오버 컴포넌트를 사용하려면 해당 컴포넌트 모듈에 아래처럼 추가해야 한다.

```
    tab2.module.ts    
    ...
    @NgModule({
	imports: [
		IonicModule,
		...
		Tab2PageRoutingModule
	],
	
	declarations: [Tab2Page, PopoverComponent]
    })
    
    export class Tab2PageModule {
    }
```    

#### Datetime
* 기존 displayFormat 과 placeholder 속성이 없어졌다.
* presentation, hour-cycle, firstDayOfWeek, showDefaultButtons 속성 설명.
* date-fns 를 이용해서 데이트 타임 포맷을 설정하기, inline modal popover 기능 설명.
* [min]을 이용해서 선택할 수 있는 날자 제한하기, minuteValues를 이용해서 분 간격 설정하기.


## 아이오닉 6 마이그레이션, 업그레이드
2021년 12월 13일에 아이오닉 6가 정식으로 발표 됐습니다.
[아이오닉 6 업그레이드 가이드](https://ionicframework.com/docs/intro/upgrading-to-ionic-6)

### 아이오닉 앱 프로그래밍 책은 앵귤러를 사용하고 있습니다.
1) 아이오닉 6는 앵귤러 12+ 버전을 지원합니다.
2) 먼저 최신 버전으로 업데이트 합니다. npm install @ionic/angular@6
3) 만일 아이오닉 앵귤러 서버를 사용하고 있다면 이것도 업그레이드 합니다.npm install @ionic/angular@6 @ionic/angular-server@6. 이 책에서는 사용하지 않습니다.
4) Config.set() 함수를 사용하고 있다면 IonicModule.forRoot() 로 대체합니다. 이 책에서는 사용하지 않습니다.
5) @ionic/angular 모듈에서 임포트한 setupConfig 함수를 쓰고 있다면 이것 역시 IonicModule.forRoot() 로 대체합니다. 이 책에서는 사용하지 않습니다.

### 컴포넌트 업데이트
1) Datetime 컴포넌트
   1) 더 이상 지원하지 않는 속성 - placeholder, displayFormat, displayTimezone pickerOptions, pickerFormat, monthNames, monthShortNames, dayNames, 
      dayShortNames
   2) text 와 placeholder CSS 쉐도우 파트 삭제
   3) CSS 변수 --padding-bottom, --padding-end, --padding-start, --padding-top, --placeholder-color 삭제
   4) open 메소드 삭제, 오버레이에 datetime 컴포넌트를 표시하려면 ion-modal 이나 ion-popover 구성 요소 내부에 넣습니다.
2) Icon 컴포넌트
   1) ariaLabel 와 ariaHidden 속성이 없어졌습니다. ( https://github.com/ionic-team/ionicons/releases/tag/v6.0.0)
3) Input 컴포넌트
   1) placeholder 속성에 null 값 대신 undefined 를 사용합니다.
4) Modal 컴포넌트
   1) ion-modal은 이제 Shadow DOM을 사용합니다. ion-modal CSS 변수 또는 ion-modal CSS Shadow Parts를 사용하도록 ion-modal의 내부를 대상으로 하는 모든 스타일을 업데이트합니다.
5) Popover 컴포넌트
   1) ion-popover는 이제 Shadow DOM을 사용합니다. ion-popover CSS 변수 또는 ion-popover CSS Shadow Parts를 사용하도록 ion-popover의 내부를 대상으로 하는 모든 스타일을 업데이트합니다.
6) Radio 컴포넌트
   1) RadioChangeEventDetail 인터페이스의 사용을 삭제합니다.
7) Select 컴포넌트
   1) placeholder 속성에 null 값 대신 undefined 를 사용합니다.
8) Textarea 컴포넌트
   1) placeholder 속성에 null 값 대신 undefined 를 사용합니다.

아이오닉 앱 프로그래밍과 관련된 사항은 Datetime 컴포넌트 입니다. 
