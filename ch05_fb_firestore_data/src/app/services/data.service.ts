import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Test} from '../model/Test';
import {TestData} from '../model/TestData';
import {map} from 'rxjs/operators';
import {KMeetUpDBData} from '../model/KMeetUpDBData';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	FIRE_DATABASE_NODE_NAME = 'Test';
	FIRE_DATABASE_KMEETUP = 'KMEETUP';

	constructor(private angularFireStore: AngularFirestore) {
	}

	getAllTestData(): Observable<any> {
		return this.angularFireStore
			.collection(this.FIRE_DATABASE_NODE_NAME, ref => ref.orderBy('name'))
			.snapshotChanges()
			.pipe(
				map(result => {
					return result.map(allData => {
						const data = allData.payload.doc.data();
						const docId = allData.payload.doc.id;
						return {docId, ...(data as object)};
					});
				})
			);
	}

	getTestDataById(id: string) {
		return this.angularFireStore.doc(this.FIRE_DATABASE_NODE_NAME + '/' + id);
	}

	createFireStoreTestData(): any {
		KMeetUpDBData.KMeetUpData
			.forEach(kmeetup => {
					this.angularFireStore.collection(this.FIRE_DATABASE_KMEETUP).add(kmeetup);
				}
			);
	}

	createAllTestData(): any {
		TestData.FirebaseTestData
			.forEach(data => {
					this.angularFireStore.collection(this.FIRE_DATABASE_NODE_NAME)
						.add(data);
				}
			);
	}

	deleteAllTestData(): any {
		const listTestDBRef = this.angularFireStore.collection(this.FIRE_DATABASE_NODE_NAME)
			.get()
			.subscribe(result => {
				result.forEach(element => {
					element.ref.delete();
				});
			});
	}

	updateTestDataById(id: string, data: Test) {
		const testData = this.angularFireStore.doc(this.FIRE_DATABASE_NODE_NAME + '/' + id);
		return testData.update({
			name: data.name,
			title: data.title,
			subtitle: data.subtitle,
			description: data.description
		});
	}

	deleteTestDataById(id: string) {
		return this.angularFireStore.doc(this.FIRE_DATABASE_NODE_NAME + '/' + id).delete();
	}
}
