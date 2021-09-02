import {Component} from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	testList: any;

	constructor(private dataService: DataService,
							private router: Router) {
		this.getAllTestList();
	}

	getAllTestList(): any {
		this.dataService.getAllTestData().subscribe(result => {
			console.log(result);
			this.testList = result;
		}, error => {
			console.log(error);
		});
	}

	showDetail(item: any) {
		this.router.navigateByUrl('/meetup-detail', {state: item});
	}
}
