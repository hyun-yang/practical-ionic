import {BaseModel} from './BaseModel';

export class KMeetUpDetail implements BaseModel {
	id: number;
	description: string;
	address: string;

	constructor(id: number, address: string, description: string) {
		this.id = id;
		this.address = address;
		this.description = description;
	}
}
