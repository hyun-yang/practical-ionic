import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {defer, from, generate, interval, Observable, of, range, Subject, Subscription} from 'rxjs';

@Component({
	selector: 'app-observable',
	templateUrl: './observable.page.html',
	styleUrls: ['./observable.page.scss'],
})
export class ObservablePage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';

	myObservable: Observable<any>;
	ofObservable: Observable<any>;
	fromObservable: Observable<any>;
	intervalObservable: Observable<number>;
	rangeObservable: Observable<any>;
	deferObservable: Observable<any>;
	generateObservable: Observable<any>;

	ofSubscription: Subscription;
	fromSubscription: Subscription;
	intervalSubscription: Subscription;
	rangeSubscription: Subscription;
	deferSubscription: Subscription;
	generateSubscription: Subscription;
	subjectSubscription: Subscription;
	mySubscription: Subscription;

	mySubject: Subject<any>;

	RXJS_OPERATOR = ['filter', 'map', 'reduce', 'pipe', 'take', 'merge'];

	constructor() {
	}

	appendOutput(value: any = '') {
		this.output += value + '\n';
	}

	promiseBasicTest(value: number) {
		this.appendOutput('  promiseBasicTest(value: number) {\n' +
			'    this.function1(value)\n' +
			'      .then(result => {\n' +
			'        console.log(\'최종 결과 값은 : \' + result);\n' +
			'      })\n' +
			'      .catch(error => {\n' +
			'        console.log(\'에러 : \' + error);\n' +
			'      })\n' +
			'      .finally(() => {\n' +
			'        console.log(\'항상 실행되는 작업입니다.\');\n' +
			'      });\n' +
			'  }\n' +
			'\n' +
			'  function1(param) {\n' +
			'    return Promise.resolve(param + 1);\n' +
			'  }');
		this.function1(value)
			.then(result => {
				console.log('최종 결과 값은 : ' + result);
			})
			.catch(error => {
				console.log('에러 : ' + error);
			})
			.finally(() => {
				console.log('항상 실행되는 작업입니다.');
			});
	}

	async asyncAwaitBasicTest(value: number) {
		this.appendOutput('  async asyncAwaitBasicTest(value: number) {\n' +
			'    const result = await this.function1(value);\n' +
			'    console.log(\'최종 결과 값은 : \' + result);\n' +
			'  }\n' +
			'\n' +
			'  function1(param) {\n' +
			'    console.log(\'function1 의 인자 값은 : \' + param);\n' +
			'    return Promise.resolve(param + 1);\n' +
			'  }');
		const result = await this.function1(value);
		console.log('최종 결과 값은 : ' + result);
	}

	promiseCallbackHellTest(value: number) {
		this.appendOutput(' promiseCallbackHellTest(value: number) {\n' +
			'    this.function1(1)\n' +
			'      .then((res1) => {\n' +
			'        return this.function2(res1)\n' +
			'          .then((res2) => {\n' +
			'            return this.function3(res2)\n' +
			'              .then((res3) => {\n' +
			'                console.log(\'최종 결과 값은 : \' + res3);\n' +
			'              });\n' +
			'          });\n' +
			'       });\n' +
			'\n' +
			'  function1(param) {\n' +
			'    return Promise.resolve(param + 1);\n' +
			'  }\n' +
			'\n' +
			'  function2(param) {\n' +
			'    return Promise.resolve(param + 2);\n' +
			'  }\n' +
			'\n' +
			'  function3(param) {\n' +
			'    return Promise.resolve(param + 3);\n' +
			'  }');

		this.function1(value)
			.then((res1) => {
				return this.function2(res1)
					.then((res2) => {
						return this.function3(res2)
							.then((res3) => {
								console.log('최종 결과 값은 : ' + res3);
							});
					});
			});
	}

	promiseTest(value: number) {
		this.appendOutput('  promiseTest(value: number) {\n' +
			'    console.log(\'인자 값 : \' + value);\n' +
			'    this.function1(1)\n' +
			'      .then(res1 => {\n' +
			'        console.log(\'res1 결과 값은 : \' + res1);\n' +
			'        return this.function2(res1);\n' +
			'      })\n' +
			'      .then(res2 => {\n' +
			'        console.log(\'res2 결과 값은 : \' + res2);\n' +
			'        return this.function3(res2);\n' +
			'      })\n' +
			'      .then(result => {\n' +
			'        console.log(\'최종 결과 값은 : \' + result);\n' +
			'      });\n' +
			'  }\n' +
			'\n' +
			'  function1(param) {\n' +
			'    return Promise.resolve(param + 1);\n' +
			'  }\n' +
			'\n' +
			'  function2(param) {\n' +
			'    return Promise.resolve(param + 2);\n' +
			'  }\n' +
			'\n' +
			'  function3(param) {\n' +
			'    return Promise.resolve(param + 3);\n' +
			'  }');
		console.log('인자 값 : ' + value);
		this.function1(value)
			.then(res1 => {
				console.log('res1 결과 값은 : ' + res1);
				return this.function2(res1);
			})
			.then(res2 => {
				console.log('res2 결과 값은 : ' + res2);
				return this.function3(res2);
			})
			.then(result => {
				console.log('최종 결과 값은 : ' + result);
			});
	}

	promiseAllTest(value: number) {
		Promise.all(
			[
				this.function1(value),
				this.function2(value),
				this.function3(value)
			]
		);
	}

	async asyncAwaitTest(value: number) {
		this.appendOutput('  async asyncAwaitTest(value: number) {\n' +
			'const res1 = await this.function1(value);\n' +
			'    console.log(\'res1 결과 값은 : \' + res1);\n' +
			'\n' +
			'    const res2 = await this.function2(res1);\n' +
			'    console.log(\'res2 결과 값은 : \' + res2);\n' +
			'\n' +
			'    const res3 = await this.function3(res2);\n' +
			'    console.log(\'최종 결과 값은 : \' + res3);\n' +
			'  }\n' +
			'\n' +
			'  function1(param) {\n' +
			'    return Promise.resolve(param + 1);\n' +
			'  }\n' +
			'\n' +
			'  function2(param) {\n' +
			'    return Promise.resolve(param + 2);\n' +
			'  }\n' +
			'\n' +
			'  function3(param) {\n' +
			'    return Promise.resolve(param + 3);\n' +
			'  }');
		const res1 = await this.function1(value);
		console.log('res1 결과 값은 : ' + res1);

		const res2 = await this.function2(res1);
		console.log('res2 결과 값은 : ' + res2);

		const res3 = await this.function3(res2);
		console.log('최종 결과 값은 : ' + res3);
	}

	function1(param) {
		console.log('function1 의 인자 값은 : ' + param);
		return Promise.resolve(param + 1);
	}

	function2(param) {
		console.log('function2 의 인자 값은 : ' + param);
		return Promise.resolve(param + 2);
	}

	function3(param) {
		console.log('function3 의 인자 값은 : ' + param);
		return Promise.resolve(param + 3);
	}

	createObservable() {
		this.output = '';
		this.appendOutput('Observable 을 생성합니다.\n' +
			'this.basicObservable = new Observable((observer: any) => { // Observable 을 생성하고 구독자의 next, error, complete 호출\n' +
			'      observer.next(\'next()로 첫번째 데이터 발행\');\n' +
			'      observer.next(\'next()로 첫번째 데이터 발행\');\n' +
			'      observer.next(\'next()로 첫번째 데이터 발행\');\n' +
			'      observer.error(\'error() 호출\');\n' +
			'      observer.complete(\'complete() 호출\');\n' +
			'    });');
		this.myObservable = new Observable((observer: any) => { // Observable 을 생성하고 구독자의 next, error, complete 호출
			observer.next('next()로 첫번째 데이터 발행');
			observer.next('next()로 두번째 데이터 발행');
			observer.next('next()로 세번째 데이터 발행');
			observer.error('error() 호출');
			observer.complete('complete() 호출');
		});
	}

	subscribeExecuteObservable() {
		this.output = '';
		this.appendOutput('Observable 을 구독합니다.\n' +
			'this.basicSubscription = this.basicObservable.subscribe((next) => { // next 처리\n' +
			'      console.log(\'데이터 값은 : \' + next);\n' +
			'    }, (error) => { // error 처리\n' +
			'      console.log(\'에러 값은 : \' + error);\n' +
			'    }, () => { // complete 처리\n' +
			'      console.log(\'완료\');\n' +
			'    });');
		this.mySubscription = this.myObservable.subscribe((next) => { // next 처리
			console.log('데이터 값은 : ' + next);
		}, (error) => { // error 처리
			console.log('에러 값은 : ' + error);
		}, () => { // complete 처리
			console.log('완료');
		});
	}

	unsubscribeObservable() {
		this.output = '';
		this.appendOutput('구독을 해지 합니다.');
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}

	createSubject() {
		this.appendOutput('  createSubject() {\n' +
			'    this.basicSubject = new Subject<any>();\n' +
			'    this.subjectSubscription = this.basicSubject.subscribe((data) => {\n' +
			'      console.log(\'데이터 값은 : \' + data);\n' +
			'    });\n' +
			'    this.basicSubject.next(\'next()로 첫번째 데이터 발행\');\n' +
			'  }');
		this.mySubject = new Subject<any>();
		this.subjectSubscription = this.mySubject.subscribe((data) => {
			console.log('데이터 값은 : ' + data);
		});
		this.mySubject.next('next()로 첫번째 데이터 발행');
	}

	ofTest() {
		this.appendOutput();
		this.ofCreate();
		this.ofSubscription = this.ofObservable.subscribe(this.printObservableCreateTypeWithValue('of'));
	}

	fromTest() {
		this.appendOutput();
		this.fromCreate();
		this.fromSubscription = this.fromObservable.subscribe(this.printObservableCreateTypeWithValue('from'));
	}

	intervalTest() {
		this.appendOutput();
		this.intervalCreate();
		this.intervalSubscription = this.intervalObservable.subscribe(this.printObservableCreateTypeWithValue('interval'));
	}

	rangeTest() {
		this.appendOutput();
		this.rangeCreate();
		this.rangeSubscription = this.rangeObservable.subscribe(this.printObservableCreateTypeWithValue('range'));
	}

	deferTest() {
		this.appendOutput();
		this.deferCreate();
		this.deferSubscription = this.deferObservable.subscribe(this.printObservableCreateTypeWithValue('defer'));
	}

	generateTest() {
		this.appendOutput();
		this.generateCreate();
		this.generateSubscription = this.generateObservable.subscribe(this.printObservableCreateTypeWithValue('generate'));
	}

	ofCreate() {
		this.ofObservable = of(1, 2, 3);
	}

	fromCreate() {
		this.fromObservable = from([[1, 2, 3], [4, 5, 6]]);
	}

	intervalCreate() {
		this.intervalObservable = interval(1000);
	}

	rangeCreate() {
		this.rangeObservable = range(1, 5);
	}

	deferCreate() {
		this.deferObservable = defer(() => of(this.getRandomRxJSOperator()));
	}

	generateCreate() {
		this.generateObservable = generate(
			1,
			x => x <= 10,
			x => x + 1
		);
	}

	getRandomRxJSOperator() {
		return this.RXJS_OPERATOR[Math.floor(Math.random() * (this.RXJS_OPERATOR.length))];
	}

	printObservableCreateTypeWithValue(subjectType: any) {
		return (value: any) => this.appendOutput(`${subjectType} : ${value}`);
	}

	clear() {
		this.output = '';
		this.unsubscribeAll();
	}

	unsubscribeAll() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
		if (this.ofSubscription) {
			this.ofSubscription.unsubscribe();
		}
		if (this.fromSubscription) {
			this.fromSubscription.unsubscribe();
		}
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
		if (this.rangeSubscription) {
			this.rangeSubscription.unsubscribe();
		}
		if (this.deferSubscription) {
			this.deferSubscription.unsubscribe();
		}
		if (this.generateSubscription) {
			this.generateSubscription.unsubscribe();
		}
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
		if (this.subjectSubscription) {
			this.subjectSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		this.unsubscribeAll();
	}
}
