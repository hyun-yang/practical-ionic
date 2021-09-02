import {Injectable} from '@angular/core';
import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {KMeetUpComment} from '../model/KMeetUpComment';
import {KMeetUpLike} from '../model/KMeetUpLike';
import {KMeetUp} from '../model/KMeetUp';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  FIRE_DATABASE_KMEETUP = 'KMEETUP';
  FIRE_DATABASE_KMEETUP_COMMENT = 'KMEETUP_COMMENT';
  FIRE_DATABASE_KMEETUP_LIKES = 'KMEETUP_LIKES';

  constructor(private angularFireStore: AngularFirestore) {
  }

  getData(pageSize, offset?): Observable<any> {
    let queryFn: QueryFn;
    queryFn = ref => ref.orderBy('orderedDate').startAt(offset).limit(pageSize);

    return this.angularFireStore
      .collection(this.FIRE_DATABASE_KMEETUP, queryFn)
      .snapshotChanges()
      .pipe(
        switchMap(allMeetUps => {
          const allMeetUpKeys = allMeetUps.map(meetUp => meetUp.payload.doc.id);
          return combineLatest(
            of(allMeetUps),
            combineLatest(
              allMeetUpKeys.map(eachMeetUpKey =>
                this.angularFireStore
                  .collection(this.FIRE_DATABASE_KMEETUP_COMMENT, ref => ref.where('mid', '==', eachMeetUpKey))
                  .snapshotChanges()
                  .pipe(
                    map(allComments => {
                      const comments = allComments.map(eachComment => {
                        const data = eachComment.payload.doc.data();
                        const id = eachComment.payload.doc.id;
                        return {id, ...(data as object)};
                      });
                      return {eachMeetUpKey, comments};
                    })
                  )
              ),
            ),
            combineLatest(
              allMeetUpKeys.map(eachMeetUpKey =>
                this.angularFireStore
                  .collection(this.FIRE_DATABASE_KMEETUP_LIKES, ref => ref.where('mid', '==', eachMeetUpKey))
                  .snapshotChanges()
                  .pipe(
                    map(allLikes => {
                      const likes = allLikes.map(eachLike => {
                        const data = eachLike.payload.doc.data();
                        const id = eachLike.payload.doc.id;
                        return {id, ...(data as object)};
                      });
                      return {eachMeetUpKey, likes};
                    })
                  )
              ),
            )
          );
        }),
        map(([allMeetUps, allComments, allLikes]) => {
          return allMeetUps.map(eachMeetUp => {
            const data = eachMeetUp.payload.doc.data();
            const id = eachMeetUp.payload.doc.id;
            const comments = allComments.find(c => c.eachMeetUpKey === id).comments;
            const likes = allLikes.find(c => c.eachMeetUpKey === id).likes;
            return {
              id,
              comments,
              likes,
              ...(data as object)
            };
          });
        })
      );
  }

  addComment(meetup, comment, userInfo) {
    const newComment: KMeetUpComment = {mid: null, uid: null, comment: null};
    newComment.uid = userInfo.uid;
    newComment.mid = meetup.id;
    if (userInfo?.displayName) {
      newComment.comment = userInfo.displayName.substring(0, 5) + ' : ' + comment;
    } else {
      newComment.comment = comment;
    }
    return this.angularFireStore.collection(this.FIRE_DATABASE_KMEETUP_COMMENT).add(newComment);
  }

  deleteComment(meetup, comment) {
    return this.angularFireStore.doc(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + comment.id).delete();
  }

  addLike(meetup, userInfo) {
    const newLike: KMeetUpLike = {mid: null, uid: null};
    newLike.mid = meetup.id;
    newLike.uid = userInfo.uid;
    return this.angularFireStore.collection(this.FIRE_DATABASE_KMEETUP_LIKES).add(newLike);
  }

  deleteLike(meetup, like) {
    return this.angularFireStore.doc(this.FIRE_DATABASE_KMEETUP_LIKES + '/' + like.id).delete();
  }

  saveMeetUp(meetup: KMeetUp) {
    return this.angularFireStore.collection(this.FIRE_DATABASE_KMEETUP).add(meetup);
  }

  deleteMeetUp(meetup) {
    return this.angularFireStore.doc(this.FIRE_DATABASE_KMEETUP + '/' + meetup.id).delete();
  }

  updateMeetUp(meetup) {
    return this.angularFireStore.doc(this.FIRE_DATABASE_KMEETUP + '/' + meetup.id)
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

  getCommentAndMeetUpByMeetUpId(meetupId): Observable<any> {
    return this.angularFireStore
      .collection(this.FIRE_DATABASE_KMEETUP)
      .doc(meetupId)
      .snapshotChanges()
      .pipe(
        switchMap(result => {
          return combineLatest(
            of(result),
            this.angularFireStore
              .collection(this.FIRE_DATABASE_KMEETUP_COMMENT, ref => ref.where('mid', '==', meetupId))
              .snapshotChanges()
              .pipe(
                map(allComments => {
                  const comments = allComments.map(eachComment => {
                    const data = eachComment.payload.doc.data();
                    const id = eachComment.payload.doc.id;
                    return {id, ...(data as object)};
                  });
                  return {meetupId, comments};
                })
              )
          );
        }),
        map(([meetupResult, commentResult]) => {
          const data = meetupResult.payload.data();
          const id = meetupResult.payload.id;
          return {
            id,
            comments: commentResult.comments,
            ...(data as object)
          };
        })
      );
  }
}
