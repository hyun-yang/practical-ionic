import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	FIRE_DATABASE_NODE_NAME = 'Test';

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
}
