import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  FIRE_DATABASE_NODE_NAME = 'Test';

  constructor(private angularFireStore: AngularFirestore) {
  }

  getAllTestData(): Observable<any> {
    return this.angularFireStore.collection(this.FIRE_DATABASE_NODE_NAME)
      .snapshotChanges();
  }
}
