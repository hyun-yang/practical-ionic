import {KMeetUpData} from './KMeetUpData';

export class KMeetUpView {

	constructor() {
	}

	showKMeetUp(kMeetUplist: KMeetUpData[]) {
		for (const meetup of kMeetUplist) {
			console.log(meetup.id + meetup.title);
		}
	}

}
