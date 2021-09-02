import {KMeetUpModel} from './KMeetUpModel';
import {KMeetUpView} from './KMeetUpView';
import {KMeeUpInterface} from './KMeeUpInterface';

export class KMeetUpViewModel implements KMeeUpInterface {

	model: KMeetUpModel;
	view: KMeetUpView;

	constructor() {
		this.model = new KMeetUpModel();
		this.view = new KMeetUpView();
	}

	display() {
		this.view.showKMeetUp(this.model.getKMeetUpList());
	}

}
