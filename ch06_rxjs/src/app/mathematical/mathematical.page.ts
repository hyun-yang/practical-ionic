import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {interval, Observable, of, Subscription, timer} from 'rxjs';
import {count, filter, map, max, min, reduce, takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-mathematical',
	templateUrl: './mathematical.page.html',
	styleUrls: ['./mathematical.page.scss'],
})
export class MathematicalPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	countSubscription: Subscription;
	maxSubscription: Subscription;
	minSubscription: Subscription;
	reduceSubscription: Subscription;

	countObservable: Observable<any>;
	maxObservable: Observable<any>;
	minObservable: Observable<any>;
	reduceObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	countTest() {
		this.appendOutput();
		this.countCreate();
		this.countSubscription = this.countObservable.subscribe(this.printObservableCreateTypeWithValue('count'));
	}

	countCreate() {
		const intervalObservable = interval(1000);
		const timerObservable = timer(3000);
		const takeUntilObservable = intervalObservable
			.pipe(
				takeUntil(timerObservable)
			);
		this.countObservable = takeUntilObservable
			.pipe(
				count()
			);
	}

	maxTest() {
		this.appendOutput();
		this.maxCreate();
		this.maxSubscription = this.maxObservable.subscribe(this.printObservableCreateTypeWithValue('max'));
	}

	maxCreate() {
		this.maxObservable = of(10, 20, 100, 200, 1, 5, 3)
			.pipe(
				max()
			);
	}

	minTest() {
		this.appendOutput();
		this.minCreate();
		this.minSubscription = this.minObservable.subscribe(this.printObservableCreateTypeWithValue('min'));
	}

	minCreate() {
		this.minObservable = of(10, 20, 100, 200, 1, 5, 3)
			.pipe(
				min()
			);
	}

	reduceTest() {
		this.appendOutput();
		this.reduceCreate();
		this.reduceSubscription = this.reduceObservable.subscribe(this.printObservableCreateTypeWithValue('reduce'));
	}

	reduceCreate() {
		const ofObservable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
		this.reduceObservable = ofObservable
			.pipe(
				filter(value => value % 2 === 0),
				reduce((total, oddValue) => total + oddValue, 0)
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
		if (this.countSubscription) {
			this.countSubscription.unsubscribe();
		}
		if (this.maxSubscription) {
			this.maxSubscription.unsubscribe();
		}
		if (this.minSubscription) {
			this.minSubscription.unsubscribe();
		}
		if (this.reduceSubscription) {
			this.reduceSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
