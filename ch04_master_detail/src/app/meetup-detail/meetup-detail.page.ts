import {Component} from '@angular/core';
import {KMeetUp} from '../model/KMeetUp';
import {Router} from '@angular/router';

@Component({
	selector: 'app-meetup-detail',
	templateUrl: './meetup-detail.page.html',
	styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage {

	meetup: KMeetUp;

	constructor(private router: Router) {
		// 홈 컴포넌트의 openDetailPage 함수에서 navigateByUrl로 전달받은 meetup 값을 사용합니다.
		this.meetup = this.router.getCurrentNavigation().extras.state.meetup;
	}

}
