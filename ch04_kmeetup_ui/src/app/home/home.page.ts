import {Component} from '@angular/core';
import {KMeetUp} from '../model/KMeetUp';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  meetupList: KMeetUp[];

  constructor(private router: Router) {
    this.meetupList = [
      {id: 1, title: '모음 제목 1', description: '모임 설명 1'},
      {id: 2, title: '모음 제목 2', description: '모임 설명 2'},
      {id: 3, title: '모음 제목 3', description: '모임 설명 3'}
    ];
  }

  goDetailPage(meetup: KMeetUp) {
    this.router.navigateByUrl('/meetup-detail', {state: {meetup}});
  }
}
