import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {TestData} from '../model/TestData';
import {Test} from '../model/Test';
import {map} from 'rxjs/operators';
import {KMeetUpDBData} from '../model/KMeetUpDBData';
import firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	FIRE_DATABASE_NODE_NAME = 'Test';
	FIRE_DATABASE_KMEETUP = 'KMEETUP';
	FIRE_DATABASE_KMEETUP_COMMENT = 'KMEETUP_COMMENT';
	FIRE_DATABASE_KMEETUP_LIKES = 'KMEETUP_LIKES';

	uid = 'HmBa2XQihKYQuwe9IqjjLAlBOe03';

	constructor(private angularFireDatabase: AngularFireDatabase) {
	}

	getAllTestData(): Observable<any> {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_NODE_NAME)
			.snapshotChanges()
			.pipe(
				map(result => {
					return result.map(allData => {
						const data = allData.payload.val();
						const id = allData.payload.key;
						return {id, ...(data as object)};
					});
				})
			);
	}

	getTestDataById(id: string) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_NODE_NAME + '/' + id);
	}

	createAllTestData(): any {
		TestData.FirebaseTestData
			.forEach(data => {
					this.angularFireDatabase.list(this.FIRE_DATABASE_NODE_NAME)
						.push(data);
				}
			);
	}

	deleteAllTestData(): any {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_NODE_NAME).remove();
	}

	updateTestDataById(id: string, data: Test) {
		const testData = this.angularFireDatabase.object(this.FIRE_DATABASE_NODE_NAME + '/' + id);
		return testData.update({
			name: data.name,
			title: data.title,
			subtitle: data.subtitle,
			description: data.description
		});
	}

	deleteTestDataById(id: string) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_NODE_NAME + '/' + id).remove();
	}

	createRealDatabaseTestData(): any {
		KMeetUpDBData.KMeetUpData
			.forEach(kmeetup => {
					const kmeetupRef = this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP).push(kmeetup);
					KMeetUpDBData.KMeetUpComment.forEach(kmeetupComment => {
						const commentRef = firebase.database().ref()
							.child(this.FIRE_DATABASE_KMEETUP_COMMENT)
							.child(kmeetupRef.key)
							.push()
							.set({comment: kmeetupComment.comment, uid: this.uid});
					});
					KMeetUpDBData.KMeetUpLike.forEach(kmeetupLike => {
						const likeRef = firebase.database().ref()
							.child(this.FIRE_DATABASE_KMEETUP_LIKES)
							.child(kmeetupRef.key)
							.push()
							.set({uid: this.uid});
					});
				}
			);
	}
}
