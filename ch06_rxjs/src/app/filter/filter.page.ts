import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {from, interval, Observable, Subscription, timer} from 'rxjs';
import {debounce, distinct, filter, find, first, last, take, takeUntil, tap} from 'rxjs/operators';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.page.html',
	styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	filterSubscription: Subscription;
	findSubscription: Subscription;
	firstSubscription: Subscription;
	lastSubscription: Subscription;
	distinctSubscription: Subscription;
	takeSubscription: Subscription;
	takeUntilSubscription: Subscription;
	debounceSubscription: Subscription;

	filterObservable: Observable<any>;
	findObservable: Observable<any>;
	firstObservable: Observable<any>;
	lastObservable: Observable<any>;
	distinctObservable: Observable<any>;
	takeObservable: Observable<any>;
	takeUntilObservable: Observable<any>;
	debounceObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	filterTest() {
		this.appendOutput();
		this.filterCreate();
		this.filterSubscription = this.filterObservable.subscribe(this.printObservableCreateTypeWithValueEx('filter'));
	}

	filterCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];

		const fromObservable = from(ionicVersion);
		this.filterObservable = fromObservable
			.pipe(
				filter(value => value.version >= 4)
			);
	}

	findTest() {
		this.appendOutput();
		this.findCreate();
		this.findSubscription = this.findObservable.subscribe(this.printObservableCreateTypeWithValueEx('find'));
	}

	findCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];

		const fromObservable = from(ionicVersion);
		this.findObservable = fromObservable
			.pipe(
				find(value => value.version === 4)
			);
	}

	firstTest() {
		this.appendOutput();
		this.firstCreate();
		this.firstSubscription = this.firstObservable.subscribe(this.printObservableCreateTypeWithValueEx('first'));
	}

	firstCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];

		const fromObservable = from(ionicVersion);
		this.firstObservable = fromObservable
			.pipe(
				first(value => value.version === 4)
			);
	}

	lastTest() {
		this.appendOutput();
		this.lastCreate();
		this.lastSubscription = this.lastObservable.subscribe(this.printObservableCreateTypeWithValueEx('last'));
	}

	lastCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];

		const fromObservable = from(ionicVersion);
		this.lastObservable = fromObservable
			.pipe(
				last(value => value.version === 4)
			);
	}

	distinctTest() {
		this.appendOutput();
		this.distinctCreate();
		this.distinctSubscription = this.distinctObservable.subscribe(this.printObservableCreateTypeWithValueEx('distinct'));
	}

	distinctCreate() {
		const ionicVersion = [
			{name: 'Ionic 3', version: 3},
			{name: 'Ionic 4.1', version: 4},
			{name: 'Ionic 4.2', version: 4},
			{name: 'Ionic 5', version: 5},
		];

		const fromObservable = from(ionicVersion);
		this.distinctObservable = fromObservable
			.pipe(
				distinct(value => value.version)
			);
	}

	takeTest() {
		this.appendOutput();
		this.takeCreate();
		this.takeSubscription = this.takeObservable.subscribe(this.printObservableCreateTypeWithValue('take'));
	}

	takeCreate() {
		const intervalObservable = interval(1000);
		this.takeObservable = intervalObservable
			.pipe(
				take(3)
			);
	}

	debounceTest() {
		this.appendOutput();
		this.debounceCreate();
		this.debounceSubscription = this.debounceObservable.subscribe(this.printObservableCreateTypeWithValue('debounce'));
	}

	debounceCreate() {
		const intervalObservable = interval(1000);
		this.debounceObservable = intervalObservable
			.pipe(
				debounce(value => timer(value * 500))
			);
	}

	printObservableCreateTypeWithValueEx(subjectType: any) {
		return (value: any) => this.appendOutput(`${subjectType} : ${value.name}`);
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
		if (this.filterSubscription) {
			this.filterSubscription.unsubscribe();
		}
		if (this.findSubscription) {
			this.findSubscription.unsubscribe();
		}
		if (this.firstSubscription) {
			this.firstSubscription.unsubscribe();
		}
		if (this.lastSubscription) {
			this.lastSubscription.unsubscribe();
		}
		if (this.distinctSubscription) {
			this.distinctSubscription.unsubscribe();
		}
		if (this.takeSubscription) {
			this.takeSubscription.unsubscribe();
		}
		if (this.takeUntilSubscription) {
			this.takeUntilSubscription.unsubscribe();
		}
		if (this.debounceSubscription) {
			this.debounceSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
