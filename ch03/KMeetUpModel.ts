import {KMeetUpData} from './KMeetUpData';

export class KMeetUpModel {

	kmeetupList: KMeetUpData[] = [];

	constructor() {
		this.setupModel();
	}

	private setupModel() {
		for (let i = 1; i < 11; i++) {
			const kMeetUp: KMeetUpData = new KMeetUpData(i, '모임');
			this.kmeetupList.push(kMeetUp);
		}
	}

	public getKMeetUpList(): KMeetUpData[] {
		return this.kmeetupList;
	}

}
