import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {AsyncSubject, BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

@Component({
	selector: 'app-subject',
	templateUrl: './subject.page.html',
	styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';

	subject = new Subject();
	asyncSubject = new AsyncSubject();
	behaviorSubject = new BehaviorSubject(null);
	replaySubject = new ReplaySubject(3);

	subjects = [];
	observerNameIndex = 0;
	dummyTestString: string[] = ['R', 'x', 'J', 'S', 's', 'u', 'b', 'j', 'e', 't', 'T', 'e', 's', 't'];

	constructor() {
		this.subjects = [this.subject, this.asyncSubject, this.behaviorSubject, this.replaySubject];
	}

	printSubjectNameWithValue(subjectType: any) {
		return (value: any) => this.appendOutput(`${subjectType} : ${value}`);
	}

	appendOutput(value: any) {
		this.output += value + '\n';
	}

	triggerNext() {
		if (this.dummyTestString.length === 0) {
			this.dummyTestString = ['R', 'x', 'J', 'S', 's', 'u', 'b', 'j', 'e', 't', 'T', 'e', 's', 't'];
		}
		const value = this.dummyTestString.shift();
		this.appendOutput(`\nnext(${value})`);
		this.subjects.forEach(subject => subject.next(value));
	}

	triggerComplete() {
		this.appendOutput('\ncomplete');
		this.subjects.forEach(subject => subject.complete());
	}

	triggerError() {
		this.appendOutput('\nerror');
		this.subjects.forEach(subject => subject.error());
	}

	createSubscriber() {
		const name = 'S' + (++this.observerNameIndex);
		this.subscribeAllSubjects(name);
	}

	subscribeAllSubjects(name: string) {
		this.appendOutput(`\n${name} subscribe`);
		this.subject.subscribe(this.printSubjectNameWithValue(`${name} subject`));
		this.asyncSubject.subscribe(this.printSubjectNameWithValue(`${name} asyncSubject`));
		this.behaviorSubject.subscribe(this.printSubjectNameWithValue(`${name} behaviorSubject`));
		this.replaySubject.subscribe(this.printSubjectNameWithValue(`${name} replaySubject`));
	}

	clear() {
		this.output = '';
	}

	ngOnInit() {
		this.createSubscriber();
	}
}
