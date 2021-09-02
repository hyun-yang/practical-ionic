import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {KMeetUp} from '../model/KMeetUp';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.page.html',
  styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage implements OnInit {

  meetup: KMeetUp;

  constructor(private router: Router) {
    this.meetup = this.router.getCurrentNavigation().extras.state.meetup;
    console.log(this.meetup);
  }

  ngOnInit() {
  }

}
