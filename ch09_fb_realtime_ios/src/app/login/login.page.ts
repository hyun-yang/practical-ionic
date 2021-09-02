import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';
import {MenuController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

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
							private menuController: MenuController,
							private translateService: TranslateService) {

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
			this.utilService.showLoading(this.translateService.instant('PROCESSING'));
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
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
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
		this.utilService.showLoading(this.translateService.instant('PROCESSING'));
		this.authenticationService.signInWithGoogle()
			.subscribe(
				(result) => {
					this.utilService.dismissLoading();
					this.authenticationService.authStateBehaviorSubject.next(result);
					this.menuController.enable(true);
					this.router.navigateByUrl('/home');
				},
				(error) => {
					this.utilService.dismissLoading();
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
	}

	signInWithFacebook() {
		this.utilService.showLoading(this.translateService.instant('PROCESSING'));
		this.authenticationService.signInWithFacebook()
			.subscribe(
				(result) => {
					this.utilService.dismissLoading();
					this.authenticationService.authStateBehaviorSubject.next(result);
					this.menuController.enable(true);
					this.router.navigateByUrl('/home');
				},
				(error) => {
					this.utilService.dismissLoading();
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
	}

	signInWithApple() {
		this.utilService.showLoading(this.translateService.instant('PROCESSING'));
		this.authenticationService.signInWithApple()
			.subscribe(
				(result) => {
					this.utilService.dismissLoading();
					this.authenticationService.authStateBehaviorSubject.next(result);
					this.menuController.enable(true);
					this.router.navigateByUrl('/home');
				},
				(error) => {
					this.utilService.dismissLoading();
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
	}
}
