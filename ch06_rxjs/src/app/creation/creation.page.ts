import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {defer, from, generate, interval, Observable, of, range, Subscription} from 'rxjs';

@Component({
	selector: 'app-creation',
	templateUrl: './creation.page.html',
	styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	ofSubscription: Subscription;
	fromSubscription: Subscription;
	intervalSubscription: Subscription;
	rangeSubscription: Subscription;
	deferSubscription: Subscription;
	generateSubscription: Subscription;

	ofObservable: Observable<any>;
	fromObservable: Observable<any>;
	intervalObservable: Observable<number>;
	rangeObservable: Observable<any>;
	deferObservable: Observable<any>;
	generateObservable: Observable<any>;

	RXJS_OPERATOR = ['filter', 'map', 'reduce', 'pipe', 'take', 'merge'];

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	ofTest() {
		this.appendOutput();
		this.ofCreate();
		this.ofSubscription = this.ofObservable.subscribe(this.printObservableCreateTypeWithValue('of'));
	}

	ofCreate() {
		this.ofObservable = of(1, 2, 3);
	}

	fromTest() {
		this.appendOutput();
		this.fromCreate();
		this.fromSubscription = this.fromObservable.subscribe(this.printObservableCreateTypeWithValue('from'));
	}

	fromCreate() {
		this.fromObservable = from([[1, 2, 3], [4, 5, 6]]);
	}

	intervalTest() {
		this.appendOutput();
		this.intervalCreate();
		this.intervalSubscription = this.intervalObservable.subscribe(this.printObservableCreateTypeWithValue('interval'));
	}

	intervalCreate() {
		this.intervalObservable = interval(1000);
	}

	rangeTest() {
		this.appendOutput();
		this.rangeCreate();
		this.rangeSubscription = this.rangeObservable.subscribe(this.printObservableCreateTypeWithValue('range'));
	}

	rangeCreate() {
		this.rangeObservable = range(1, 5);
	}

	deferTest() {
		this.appendOutput();
		this.deferCreate();
		this.deferSubscription = this.deferObservable.subscribe(this.printObservableCreateTypeWithValue('defer'));
	}

	deferCreate() {
		this.deferObservable = defer(() => of(this.getRandomRxJSOperator()));
	}

	generateTest() {
		this.appendOutput();
		this.generateCreate();
		this.generateSubscription = this.generateObservable.subscribe(this.printObservableCreateTypeWithValue('generate'));
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

	appendOutput(value: any = '') {
		this.output += value + '\n';
	}

	clear() {
		this.output = '';
		this.unsubscribeAll();
	}

	unsubscribeAll() {
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
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
