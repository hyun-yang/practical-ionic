import {Component, ViewChild} from '@angular/core';
import {format, parseISO} from 'date-fns';
import {IonDatetime} from '@ionic/angular';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	@ViewChild(IonDatetime) dateTime: IonDatetime;
	language: string;
	theme: string;
	minDate: string;
	orgDate: string;
	formattedDate: string;

	constructor() {
		this.minDate = new Date().toISOString();
		this.formattedDate = format(parseISO(this.minDate), 'yyyy-MM-dd, HH:mm');
	}

	dateTimeChanged(value: string) {
		this.orgDate = value;
		this.formattedDate = format(parseISO(value), 'yyyy-MM-dd, HH:mm');
	}

	confirm() {
		this.dateTime.confirm(true);
	}

	cancel() {
		this.dateTime.cancel(true);
	}
}
