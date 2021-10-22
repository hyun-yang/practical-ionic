import {Injectable} from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {KMeetUp} from '../model/KMeetUp';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	// eslint-disable-next-line @typescript-eslint/naming-convention
	FIRE_DATABASE_KMEETUP = 'KMEETUP';
	db: firebase.firestore.Firestore;

	constructor() {
		this.db = firebase.firestore();
	}

	async getData(pageSize, cursor?) {
		const result = [];
		let query;
		if (cursor === undefined) { // 처음 실행
			query = this.db
				.collection(this.FIRE_DATABASE_KMEETUP)
				.orderBy('orderedDate')
				.limit(pageSize);
		} else { // 스크롤을 아래로 내리면 그 다음 데이터셋을 읽어옴
			query = this.db
				.collection(this.FIRE_DATABASE_KMEETUP)
				.orderBy('orderedDate')
				.startAfter(cursor)
				.limit(pageSize);
		}

		const documentSnapshots = await query.get();
		documentSnapshots.forEach((doclist) => {
			const data = doclist.data();
			const id = doclist.id;
			const docs = doclist;
			// eslint-disable-next-line @typescript-eslint/ban-types
			result.push({docs, id, ...(data as object)});
		});
		return result;
	}

	saveMeetUp(meetup: KMeetUp) {
		return this.db.collection(this.FIRE_DATABASE_KMEETUP)
			.add(meetup);
	}

	deleteMeetUp(docId: any) {
		return this.db.collection(this.FIRE_DATABASE_KMEETUP)
			.doc(docId)
			.delete();
	}

	updateMeetUp(meetup: KMeetUp) {
		return this.db.collection(this.FIRE_DATABASE_KMEETUP)
			.doc(meetup.id)
			.update({
				id: meetup.id,
				uid: meetup.uid,
				name: meetup.name,
				title: meetup.title,
				description: meetup.description,
				date: meetup.date,
				phone: meetup.phone,
				map: meetup.map
			});
	}

	async getDataById(docId: any) {
		const query = this.db.collection(this.FIRE_DATABASE_KMEETUP)
			.doc(docId);
		const documentSnapshots = await query.get();
		const data = documentSnapshots.data();
		const id = documentSnapshots.id;
		const docs = documentSnapshots;
		// eslint-disable-next-line @typescript-eslint/ban-types
		return {docs, id, ...(data as object)};
	}
}
