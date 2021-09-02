import {Injectable} from '@angular/core';
import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataFirestoreService {

	FIRE_DATABASE_NODE_NAME = 'Test';

	constructor(private angularFireStore: AngularFirestore) {
	}

	getListPagination(numberItems, cursor?): Observable<any> {
		let queryFn: QueryFn;
		if (cursor === undefined) {
			queryFn = value => value.orderBy('title').limit(numberItems + 1);
		} else {
			queryFn = value => value.orderBy('title').limit(numberItems + 1).startAt(cursor);
		}

		return this.angularFireStore
			.collection(this.FIRE_DATABASE_NODE_NAME, queryFn)
			.snapshotChanges()
			.pipe(
				map(result => {
					return result.map(allData => {
						const data = allData.payload.doc.data();
						const id = allData.payload.doc;
						return {id, ...(data as object)};
					});
				})
			);
	}
}
