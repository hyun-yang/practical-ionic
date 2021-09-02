import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  userForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private utilService: UtilService) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z.-]+.[a-zA-Z]{2,3}$')]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.controls.email.valid) {
      this.utilService.showLoading('처리 중...');
      this.authenticationService.sendPasswordResetEmail(this.userForm.controls.email.value)
        .then(result => {
          this.utilService.dismissLoading();
          this.utilService.showAlert('성공', '비밀번호 찾기 이메일을 발송했습니다.');
        })
        .catch(error => {
          this.utilService.dismissLoading();
          this.utilService.showAlert('에러', error.message);
        });
    }
  }
}
