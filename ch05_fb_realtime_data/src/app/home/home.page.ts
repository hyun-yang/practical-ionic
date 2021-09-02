import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {UtilService} from '../services/util.service';
import {Test} from '../model/Test';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	testList: Test[] = [];

	constructor(private router: Router,
							private dataService: DataService,
							private utilService: UtilService,
							private alertController: AlertController) {
	}

	ngOnInit(): void {
		this.getAllTestData();
	}

	ngOnDestroy(): void {
		console.log('Home 페이지 Destroy');
	}

	getAllTestData(): any {
		this.dataService.getAllTestData().subscribe(result => {
			console.log(result);
			this.testList = result;
		}, error => {
			console.log(error);
		});
	}

	createAllTestData() {
		this.dataService.createRealDatabaseTestData();
	}

	deleteAllTestData() {
		this.dataService.deleteAllTestData();
	}

	async deleteTestDataById(id: string) {
		const alert = await this.alertController.create({
			header: '삭제 확인',
			message: '삭제 하시겠습니까?',
			buttons: [
				{
					text: '취소',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: '삭제',
					handler: () => {
						this.dataService.deleteTestDataById(id);
					}
				}
			]
		});
		await alert.present();
	}

	updateTestDataById(id: string) {
		this.router.navigateByUrl('/edit', {state: {id: id}});
	}
}
