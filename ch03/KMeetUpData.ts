import {BaseModel} from './BaseModel';

export class KMeetUpData implements BaseModel {
	id: number;
	title: string;

	constructor(id: number, title: string) {
		this.id = id;
		this.title = title;
	}
}
