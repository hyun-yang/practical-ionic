import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';
import {MenuController} from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	userForm: FormGroup;
	isSubmitted: boolean;

	constructor(private router: Router,
							private formBuilder: FormBuilder,
							private authenticationService: AuthenticationService,
							private utilService: UtilService,
							private menuController: MenuController) {

		this.userForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z.-]+.[a-zA-Z]{2,3}$')]],
			password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.required])]
		});
	}

	ngOnInit() {
	}

	signIn() {
		this.isSubmitted = true;
		if (this.userForm.controls.email.valid && this.userForm.controls.password.valid) {
			this.utilService.showLoading('처리 중...');
			this.authenticationService.signInWithEmailAndPassword(this.userForm.controls.email.value,
				this.userForm.controls.password.value)
				.then(result => {
					this.utilService.dismissLoading();
					this.authenticationService.authStateBehaviorSubject.next(result.user);
					this.menuController.enable(true);
					this.router.navigateByUrl('/home');
				})
				.catch(error => {
					this.utilService.dismissLoading();
					this.utilService.showAlert('에러', error.message);
				});
		}
	}

	forgotPassword() {
		this.router.navigateByUrl('/forgotpassword');
	}

	signUp() {
		this.router.navigateByUrl('/signup');
	}

	signInWithGoogle() {
		this.utilService.showLoading('처리 중...');
		this.authenticationService.signInWithGoogle()
			.then(result => {
				this.utilService.dismissLoading();
				this.authenticationService.authStateBehaviorSubject.next(result.user);
				this.menuController.enable(true);
				this.router.navigateByUrl('/home');
			})
			.catch(error => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', error.message);
			});
	}

	signInWithFacebook() {
		this.utilService.showLoading('처리 중...');
		this.authenticationService.signInWithFacebook()
			.then(result => {
				this.utilService.dismissLoading();
				this.authenticationService.authStateBehaviorSubject.next(result.user);
				this.menuController.enable(true);
				this.router.navigateByUrl('/home');
			})
			.catch(error => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', error.message);
			});
	}

	signInWithApple() {
		if (this.utilService.isiOS()) {
			this.utilService.showLoading('처리 중...');
			this.authenticationService.signInWithApple()
				.then(result => {
					this.utilService.dismissLoading();
					this.authenticationService.authStateBehaviorSubject.next(result.user);
					this.menuController.enable(true);
					this.router.navigateByUrl('/home');
				})
				.catch(error => {
					this.utilService.dismissLoading();
					this.utilService.showAlert('에러', error.message);
				});
		} else {
			this.utilService.showAlert('iOS 전용', '이 기능은 iOS 버전 13 이상이 필요합니다.');
		}
	}
}
