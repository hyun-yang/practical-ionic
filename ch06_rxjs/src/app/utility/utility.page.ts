import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {asyncScheduler, from, merge, Observable, of, Subscription} from 'rxjs';
import {delay, map, mapTo, observeOn, pluck, tap, toArray} from 'rxjs/operators';

@Component({
	selector: 'app-utility',
	templateUrl: './utility.page.html',
	styleUrls: ['./utility.page.scss'],
})
export class UtilityPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	tapSubscription: Subscription;
	pluckSubscription: Subscription;
	delaySubscription: Subscription;
	toArraySubscription: Subscription;
	observeOnSubscription: Subscription;

	tapObservable: Observable<any>;
	pluckObservable: Observable<any>;
	delayObservable: Observable<any>;
	toArrayObservable: Observable<any>;
	observeOnObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	tapTest() {
		this.appendOutput();
		this.tapCreate();
		this.tapSubscription = this.tapObservable.subscribe(this.printObservableCreateTypeWithValue('tap'));
	}

	tapCreate() {
		const ofObservable = of(1, 2, 3, 4, 5);
		this.tapObservable = ofObservable
			.pipe(
				tap(value => this.appendOutput(`함수 적용 전의 값 : ${value}`)),
				map(value => value * value),
				tap(value => this.appendOutput(`함수 적용 후의 값 : ${value}`)),
			);
	}

	pluckTest() {
		this.appendOutput();
		this.pluckCreate();
		this.pluckSubscription = this.pluckObservable.subscribe(this.printObservableCreateTypeWithValue('pluck'));
	}

	pluckCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];
		const fromObservable = from(ionicVersion);

		this.pluckObservable = fromObservable
			.pipe(
				pluck('name')
			);
	}

	delayTest() {
		this.appendOutput();
		this.delayCreate();
		this.delaySubscription = this.delayObservable.subscribe(this.printObservableCreateTypeWithValue('delay'));
	}

	delayCreate() {
		const ofObservable = of(null);
		this.delayObservable = merge(
			ofObservable.pipe(mapTo('1')),
			ofObservable.pipe(mapTo('2'), delay(1000))
		);
	}

	toArrayTest() {
		this.appendOutput();
		this.toArrayCreate();
		this.toArraySubscription = this.toArrayObservable.subscribe(this.printObservableCreateTypeWithValue('toArray'));
	}

	toArrayCreate() {
		const ofObservable = of(1, 2, 3, 4, 5);
		this.toArrayObservable = ofObservable
			.pipe(
				toArray()
			);
	}

	observeOnTest() {
		this.appendOutput();
		this.observeOnCreate();
		this.observeOnSubscription = this.observeOnObservable.subscribe(this.printObservableCreateTypeWithValue('observeOn'));
	}

	observeOnCreate() {
		const ofObservableA = of(1, 2, 3, 4, 5);
		const ofObservableB = of(6, 7, 8, 9, 10);
		this.observeOnObservable = merge(
			ofObservableA.pipe(observeOn(asyncScheduler)),
			ofObservableB
		);
	}

	printObservableCreateTypeWithValue(subjectType: any) {
		return (value: any) => this.appendOutput(`${subjectType} : ${value}`);
	}

	appendOutput(value: any = '') {
		this.output += value + '\n';
	}

	clear() {
		this.output = '';
		this.unsubscribeAll();
	}

	unsubscribeAll() {
		if (this.tapSubscription) {
			this.tapSubscription.unsubscribe();
		}
		if (this.pluckSubscription) {
			this.pluckSubscription.unsubscribe();
		}
		if (this.delaySubscription) {
			this.delaySubscription.unsubscribe();
		}
		if (this.toArraySubscription) {
			this.toArraySubscription.unsubscribe();
		}
		if (this.observeOnSubscription) {
			this.observeOnSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}

}
