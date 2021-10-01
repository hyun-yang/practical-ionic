import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service';
import {Test} from '../model/Test';
import {Subscription} from 'rxjs';

// 리얼타임 데이터베이스용 서비스
import {DataRealtimeService} from '../services/data-realtime.service';

// 파이어스토용 서비스
import {DataFirestoreService} from '../services/data-firestore.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	items: Test[] = [];
	itemsSubscription: Subscription;
	startAtKey: string;
	prevKeys: string[] = [];
	firstOfData = true;
	endOfData = false;
	showSearchBar = false;

	constructor(private dataService: DataFirestoreService,
							private utilService: UtilService) {
	}

	ngOnInit(): void {
		this.getListPagination();
	}

	ngOnDestroy(): void {
		if (this.itemsSubscription) {
			this.itemsSubscription.unsubscribe();
		}
	}

	async getListPagination(startAtKey: string = ' ') {
		if (this.itemsSubscription) {
			this.itemsSubscription.unsubscribe();
		}

		await this.utilService.showLoading('로딩 중...');
		this.itemsSubscription = this.dataService.getListPagination(this.utilService.pagingCount, startAtKey)
			.subscribe(result => {
				this.utilService.dismissLoading();
				this.items = result.slice(0, this.utilService.pagingCount);
				this.endOfData = result.length < this.utilService.pagingCount;
				if (result[this.utilService.pagingCount] !== undefined) {
					this.startAtKey = result[this.utilService.pagingCount].id;
					this.firstOfData = false;
				}
			}, (error) => {
				this.utilService.showAlert('에러', error.message);
				this.utilService.dismissLoading();
			});
	}

	onSearch(event: Event): void {
		const search = event.target.value;
		this.items = this.items.filter(currentList => {
			return currentList.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});
	}

	refresh(): void {
		this.getListPagination();
	}

	getPrev() {
		if (this.prevKeys.length > 0) {
			const lastStartAtKey = this.prevKeys[this.prevKeys.length - 1];
			this.prevKeys.pop();
			this.getListPagination(lastStartAtKey);
		} else {
			this.firstOfData = true;
		}
	}

	getNext() {
		if (this.prevKeys.indexOf(this.items[0].id) > 1) {
			return;
		}
		this.prevKeys.push(this.items[0].id);
		this.getListPagination(this.startAtKey);
	}

}

