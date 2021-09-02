import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.router.navigateByUrl('/home');
  }

  signInWithFacebook() {
    this.router.navigateByUrl('/home');
  }

  signInWithApple() {
    this.router.navigateByUrl('/home');
  }

  signIn() {
    this.router.navigateByUrl('/home');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgotpassword');
  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
