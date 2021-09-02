import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {UtilService} from '../services/util.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	dataForm: FormGroup;
	dataId: any;

	constructor(private router: Router,
							private formBuilder: FormBuilder,
							private dataService: DataService,
							private utilService: UtilService) {
		this.dataForm = this.formBuilder.group({
			name: [''],
			title: [''],
			subtitle: [''],
			description: ['']
		});

		this.dataId = this.router.getCurrentNavigation().extras.state.id;
		this.dataService.getTestDataById(this.dataId)
			.valueChanges()
			.subscribe(result => {
				console.log(result);
				this.dataForm.setValue(result);
			});
	}

	updateTestData() {
		this.dataService.updateTestDataById(this.dataId, this.dataForm.value)
			.then(result => {
				this.utilService.showToast('수정되었습니다.');
				this.router.navigateByUrl('/home');
			})
			.catch(error => {
				this.utilService.showAlert('에러', error.message);
			});
	}

	ngOnInit() {
	}

}
