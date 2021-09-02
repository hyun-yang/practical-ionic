import {Injectable} from '@angular/core';
import {AngularFireDatabase, QueryFn} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataRealtimeService {

	FIRE_DATABASE_NODE_NAME = 'Test';

	constructor(private angularFireDatabase: AngularFireDatabase) {
	}

	getList(): Observable<any> {
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

	getListPagination(numberItems, startAtKey?): Observable<any> {
		let queryFn: QueryFn;
		queryFn = ref => ref.orderByKey().startAt(startAtKey).limitToFirst(numberItems + 1);

		return this.angularFireDatabase.list(this.FIRE_DATABASE_NODE_NAME, queryFn)
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
}
