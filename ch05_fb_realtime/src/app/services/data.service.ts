import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	FIRE_DATABASE_NODE_NAME = 'Test';

	constructor(private angularFireDatabase: AngularFireDatabase) {
	}

	getAllTestData(): Observable<any> {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_NODE_NAME)
			.snapshotChanges();
	}
}
