import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	constructor(private router: Router) {
		console.log('HomePage constructor');
	}

	ionViewWillEnter() {
		console.log('HomePage ionViewWillEnter');
	}

	ionViewDidEnter() {
		console.log('HomePage ionViewDidEnter');
	}

	ionViewWillLeave() {
		console.log('HomePage ionViewWillLeave');
	}

	ionViewDidLeave() {
		console.log('HomePage ionViewDidLeave');
	}

	ngOnInit(): void {
		console.log('HomePage ngOnInit');
	}

	ngOnDestroy(): void {
		console.log('HomePage ngOnDestroy');
	}

	// 상세 페이지로 이동 처리
	gotoDetailPage() {
		this.router.navigateByUrl('detail');
	}
}
