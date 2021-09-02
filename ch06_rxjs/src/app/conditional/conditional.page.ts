import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {defaultIfEmpty, every, takeUntil} from 'rxjs/operators';
import {interval, Observable, of, Subscription, timer} from 'rxjs';

@Component({
	selector: 'app-conditional',
	templateUrl: './conditional.page.html',
	styleUrls: ['./conditional.page.scss'],
})
export class ConditionalPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	defaultIfEmptySubscription: Subscription;
	everySubscription: Subscription;
	takeUntilSubscription: Subscription;

	defaultIfEmptyObservable: Observable<any>;
	everyObservable: Observable<any>;
	takeUntilObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	defaultIfEmptyTest() {
		this.appendOutput();
		this.defaultIfEmptyCreate();
		this.defaultIfEmptySubscription = this.defaultIfEmptyObservable.subscribe(this.printObservableCreateTypeWithValue('defaultIfEmpty'));
	}

	defaultIfEmptyCreate() {
		const emptyObservable = of();
		this.defaultIfEmptyObservable = emptyObservable
			.pipe(
				defaultIfEmpty('빈 Observable')
			);
	}

	everyTest() {
		this.appendOutput();
		this.everyCreate();
		this.everySubscription = this.everyObservable.subscribe(this.printObservableCreateTypeWithValue('every'));
	}

	everyCreate() {
		const ofObservable = of(2, 4, 6, 8, 10);
		this.everyObservable = ofObservable
			.pipe(
				every(value => value % 2 === 0)
			);
	}

	takeUntilTest() {
		this.appendOutput();
		this.takeUntilCreate();
		this.takeUntilSubscription = this.takeUntilObservable.subscribe(this.printObservableCreateTypeWithValue('takeUntil'));
	}

	takeUntilCreate() {
		const intervalObservable = interval(1000);
		this.takeUntilObservable = intervalObservable
			.pipe(
				takeUntil(interval(3000))
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
		if (this.defaultIfEmptySubscription) {
			this.defaultIfEmptySubscription.unsubscribe();
		}
		if (this.everySubscription) {
			this.everySubscription.unsubscribe();
		}
		if (this.takeUntilSubscription) {
			this.takeUntilSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
