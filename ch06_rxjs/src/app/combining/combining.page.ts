import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {combineLatest, concat, forkJoin, interval, merge, Observable, of, race, Subscription, zip} from 'rxjs';
import {map, mapTo, startWith, take} from 'rxjs/operators';

@Component({
	selector: 'app-combining',
	templateUrl: './combining.page.html',
	styleUrls: ['./combining.page.scss'],
})
export class CombiningPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	mergeSubscription: Subscription;
	concatSubscription: Subscription;
	zipSubscription: Subscription;
	forkJoinSubscription: Subscription;
	combineLatestSubscription: Subscription;
	raceSubscription: Subscription;
	startWithSubscription: Subscription;

	mergeObservable: Observable<any>;
	concatObservable: Observable<any>;
	zipObservable: Observable<any>;
	forkJoinObservable: Observable<any>;
	combineLatestObservable: Observable<any>;
	raceObservable: Observable<any>;
	startWithObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	mergeTest() {
		this.appendOutput();
		this.mergeCreate();
		this.mergeSubscription = this.mergeObservable.subscribe(this.printObservableCreateTypeWithValue('merge'));
	}

	mergeCreate() {
		const intervalObservableA = interval(1500);
		const intervalObservableB = interval(1000);
		this.mergeObservable = merge(intervalObservableA, intervalObservableB);
	}

	concatTest() {
		this.appendOutput();
		this.concatCreate();
		this.concatSubscription = this.concatObservable.subscribe(this.printObservableCreateTypeWithValue('concat'));
	}

	concatCreate() {
		const intervalObservableA = interval(1500);
		const intervalObservableB = interval(1000);
		this.concatObservable = concat(intervalObservableA, intervalObservableB);
	}

	zipTest() {
		this.appendOutput();
		this.zipCreate();
		this.zipSubscription = this.zipObservable.subscribe(this.printObservableCreateTypeWithValue('zip'));
	}

	zipCreate() {
		const intervalObservableA = interval(1500);
		const numbersArray = [1, 2, 3, 4, 5];
		const numbersObservable = intervalObservableA
			.pipe(
				take(5),
				map(i => numbersArray[i])
			);

		const intervalObservableB = interval(1000);
		const charArray = ['A', 'B', 'C', 'D', 'E'];
		const charObservable = intervalObservableB
			.pipe(
				take(5),
				map(i => charArray[i])
			);

		this.zipObservable = zip(numbersObservable, charObservable);
	}

	combineLatestTest() {
		this.appendOutput();
		this.combineLatestCreate();
		this.combineLatestSubscription = this.combineLatestObservable.subscribe(this.printObservableCreateTypeWithValue('combineLatest'));
	}

	combineLatestCreate() {
		const intervalObservableA = interval(1500);
		const numbersArray = [1, 2, 3, 4, 5];
		const numbersObservable = intervalObservableA
			.pipe(
				take(5),
				map(i => numbersArray[i])
			);

		const intervalObservableB = interval(1000);
		const charArray = ['A', 'B', 'C', 'D', 'E'];
		const charObservable = intervalObservableB
			.pipe(
				take(5),
				map(i => charArray[i])
			);

		this.combineLatestObservable = combineLatest([numbersObservable, charObservable]);
	}

	forkJoinTest() {
		this.appendOutput();
		this.forkJoinCreate();
		this.forkJoinSubscription = this.forkJoinObservable.subscribe(this.printObservableCreateTypeWithValue('forkJoin'));
	}

	forkJoinCreate() {
		const ofObservableA = of('Ionic');
		const ofObservableB = of('RxJS');
		const intervalObservableA = interval(500).pipe(take(3));
		const intervalObservableB = interval(1000).pipe(take(2));

		this.forkJoinObservable = forkJoin(
			[
				ofObservableA,
				ofObservableB,
				intervalObservableA,
				intervalObservableB
			]);
	}

	raceTest() {
		this.appendOutput();
		this.raceCreate();
		this.raceSubscription = this.raceObservable.subscribe(this.printObservableCreateTypeWithValue('race'));
	}

	raceCreate() {
		const intervalObservableA = interval(500).pipe(mapTo('1 등'));
		const intervalObservableB = interval(1000).pipe(mapTo('2 등'));
		const intervalObservableC = interval(1500).pipe(mapTo('3 등'));
		this.raceObservable = race(intervalObservableC, intervalObservableB, intervalObservableA);
	}

	startWithTest() {
		this.appendOutput();
		this.startWithCreate();
		this.startWithSubscription = this.startWithObservable.subscribe(this.printObservableCreateTypeWithValue('startWith'));
	}

	startWithCreate() {
		const ofObservableA = of(2, 3, 4, 5);
		this.startWithObservable = ofObservableA
			.pipe(
				startWith(1)
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
		if (this.mergeSubscription) {
			this.mergeSubscription.unsubscribe();
		}
		if (this.concatSubscription) {
			this.concatSubscription.unsubscribe();
		}
		if (this.zipSubscription) {
			this.zipSubscription.unsubscribe();
		}
		if (this.forkJoinSubscription) {
			this.forkJoinSubscription.unsubscribe();
		}
		if (this.combineLatestSubscription) {
			this.combineLatestSubscription.unsubscribe();
		}
		if (this.raceSubscription) {
			this.raceSubscription.unsubscribe();
		}
		if (this.startWithSubscription) {
			this.startWithSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}

}
