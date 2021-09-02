import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.page.html',
	styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

	constructor() {
		console.log('DetailPage constructor');
	}

	ionViewWillEnter() {
		console.log('DetailPage ionViewWillEnter');
	}

	ionViewDidEnter() {
		console.log('DetailPage ionViewDidEnter');
	}

	ionViewWillLeave() {
		console.log('DetailPage ionViewWillLeave');
	}

	ionViewDidLeave() {
		console.log('DetailPage ionViewDidLeave');
	}

	ngOnInit(): void {
		console.log('DetailPage ngOnInit');
	}

	ngOnDestroy(): void {
		console.log('DetailPage ngOnDestroy');
	}

}
