import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {interval, Observable, of, Subscription, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

@Component({
	selector: 'app-error',
	templateUrl: './error.page.html',
	styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';
	operatorName: string;

	catchErrorSubscription: Subscription;
	retrySubscription: Subscription;

	catchErrorObservable: Observable<any>;
	retryObservable: Observable<any>;

	constructor(private router: Router) {
		this.operatorName = this.router.getCurrentNavigation().extras.state.operator;
	}

	catchErrorTest() {
		this.appendOutput();
		this.catchErrorCreate();
		this.catchErrorSubscription = this.catchErrorObservable.subscribe(this.printObservableCreateTypeWithValue('catchError'));
	}

	catchErrorCreate() {
		this.catchErrorObservable = of(2, 4, 5, 6, 8, 10)
			.pipe(
				map(value => {
					if (value % 2 !== 0) {
						throw new Error('Not even value : ' + value);
					}
					return value;
				}),
				catchError(error => {
					console.log(error.message);
					return of('catchError return this message');
				})
			);
	}

	retryTest() {
		this.appendOutput();
		this.retryCreate();
		this.retrySubscription = this.retryObservable.subscribe(this.printObservableCreateTypeWithValue('retry'));
	}

	retryCreate() {
		const intervalObservable = interval(1000);
		this.retryObservable = intervalObservable
			.pipe(
				map(value => {
					if (value > 2) {
						this.appendOutput('2 보다 더 큽니다, 이제부터 2번 더 시도하고 중단합니다.');
						throw new Error('값이 2 보다 큽니다.' + value);
					}
					return value;
				}),
				retry(2)
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
		if (this.catchErrorSubscription) {
			this.catchErrorSubscription.unsubscribe();
		}
		if (this.retrySubscription) {
			this.retrySubscription.unsubscribe();
		}
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		console.log('OnDestroy');
		this.unsubscribeAll();
	}
}
