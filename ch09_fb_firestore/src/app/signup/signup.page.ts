import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private utilService: UtilService) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z.-]+.[a-zA-Z]{2,3}$')]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.required])]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.controls.email.valid && this.userForm.controls.password.valid) {
      this.utilService.showLoading('처리 중...');
      this.authenticationService.signUp(this.userForm.controls.email.value,
        this.userForm.controls.password.value)
        .then(result => {
          this.utilService.dismissLoading();
          this.utilService.showAlert('성공', '회원 가입을 축하합니다.');
        })
        .catch(error => {
          this.utilService.dismissLoading();
          this.utilService.showAlert('에러', error.message);
        });
    }
  }

}
