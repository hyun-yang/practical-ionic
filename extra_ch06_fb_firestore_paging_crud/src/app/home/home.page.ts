import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KMeetUp} from '../model/KMeetUp';
import {IonInfiniteScroll} from '@ionic/angular';
import {DataService} from '../services/data.service';
import {UtilService} from '../services/util.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	@ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
	allMeetUp: KMeetUp[] = [];
	cursor: any;
	endOfData = false;

	constructor(private dataService: DataService,
							private utilService: UtilService) {
	}

	ngOnInit(): void {
		this.getData();
	}

	refresh() {
		this.allMeetUp = [];
		this.cursor = null;
		this.endOfData = false;
		this.getData();
	}

	getData(event: any = null) {
		this.dataService.getData(this.utilService.recordsPerPage, this.cursor)
			.then(result => {
				this.allMeetUp = [...this.allMeetUp, ...result];
				this.cursor = this.allMeetUp[this.allMeetUp.length - 1].docs;
				if (this.utilService.recordsPerPage > result.length) {
					this.endOfData = true;
					this.infinite.disabled = true;
				} else {
					this.endOfData = false;
					this.infinite.disabled = false;
				}
			})
			.catch(error => {
				this.utilService.showAlert('에러', error);
			});

		if (event) {
			event.target.complete();
		}
	}

	ngOnDestroy(): void {
	}
}
