import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {from, interval, Observable, of, Subscription} from 'rxjs';
import {concatMap, delay, map, mapTo, mergeMap, scan, switchMap} from 'rxjs/operators';

@Component({
	selector: 'app-transformation',
	templateUrl: './transformation.page.html',
	styleUrls: ['./transformation.page.scss'],
})
export class TransformationPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	mapSubscription: Subscription;
	mapToSubscription: Subscription;
	concatMapSubscription: Subscription;
	mergeMapSubscription: Subscription;
	switchMapSubscription: Subscription;
	scanSubscription: Subscription;

	mapObservable: Observable<any>;
	mapToObservable: Observable<any>;
	concatMapObservable: Observable<any>;
	mergeMapObservable: Observable<any>;
	switchMapObservable: Observable<any>;
	scanObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	mapTest() {
		this.appendOutput();
		this.mapCreate();
		this.mapSubscription = this.mapObservable.subscribe(this.printObservableCreateTypeWithValue('map'));
	}

	mapCreate() {
		const fromObservable = from([1, 2, 3, 4, 5]);
		this.mapObservable = fromObservable
			.pipe(
				map(value => value * value)
			);
	}

	mapToTest() {
		this.appendOutput();
		this.mapToCreate();
		this.mapToSubscription = this.mapToObservable.subscribe(this.printObservableCreateTypeWithValue('mapTo'));
	}

	mapToCreate() {
		const intervalObservable = interval(1000);
		this.mapToObservable = intervalObservable
			.pipe(
				mapTo('데이터 출력')
			);
	}

	mergeMapTest() {
		this.appendOutput();
		this.mergeMapCreate();
		this.mergeMapSubscription = this.mergeMapObservable.subscribe(this.printObservableCreateTypeWithValue('mergeMap'));
	}

	mergeMapCreate() {
		const ofObservable = of(2000, 1000);
		this.mergeMapObservable = ofObservable
			.pipe(
				mergeMap(value => of(`${value} 밀리세컨드 후`)
					.pipe(delay(value)))
			);
	}

	concatMapTest() {
		this.appendOutput();
		this.concatMapCreate();
		this.concatMapSubscription = this.concatMapObservable.subscribe(this.printObservableCreateTypeWithValue('concatMap'));
	}

	concatMapCreate() {
		const ofObservable = of(2000, 1000);
		this.concatMapObservable = ofObservable
			.pipe(
				concatMap(value => of(`${value} 밀리세컨드 후`)
					.pipe(delay(value)))
			);
	}

	switchMapTest() {
		this.appendOutput();
		this.switchMapCreate();
		this.switchMapSubscription = this.switchMapObservable.subscribe(this.printObservableCreateTypeWithValue('switchMap'));
	}

	switchMapCreate() {
		const ofObservable = of(3000, 1000);
		this.switchMapObservable = ofObservable
			.pipe(
				switchMap(value => of(`${value} 밀리세컨드 후`)
					.pipe(delay(value)))
			);
	}

	scanTest() {
		this.appendOutput();
		this.scanCreate();
		this.scanSubscription = this.scanObservable.subscribe(this.printObservableCreateTypeWithValue('scan'));
	}

	scanCreate() {
		const intervalObservable = interval(1000);
		this.scanObservable = intervalObservable
			.pipe(
				scan((acc, value) => [...acc, value], [])
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
		if (this.mapSubscription) {
			this.mapSubscription.unsubscribe();
		}
		if (this.mapToSubscription) {
			this.mapToSubscription.unsubscribe();
		}
		if (this.concatMapSubscription) {
			this.concatMapSubscription.unsubscribe();
		}
		if (this.mergeMapSubscription) {
			this.mergeMapSubscription.unsubscribe();
		}
		if (this.switchMapSubscription) {
			this.switchMapSubscription.unsubscribe();
		}
		if (this.scanSubscription) {
			this.scanSubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
