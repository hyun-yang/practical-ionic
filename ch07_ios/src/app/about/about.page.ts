import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import firebase from 'firebase';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  userInfo: firebase.User;

  constructor(public authenticationService: AuthenticationService) {
    this.userInfo = this.authenticationService.authStateBehaviorSubject.value;
  }

  ngOnInit() {
  }

}
