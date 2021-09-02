import {Injectable} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase, QueryFn} from '@angular/fire/database';
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

	constructor(private angularFireDatabase: AngularFireDatabase) {
	}

	getData(pageSize, offset?): Observable<any> {
		let queryFn: QueryFn;
		queryFn = ref => ref.orderByChild('orderedDate').startAt(offset).limitToFirst(pageSize);

		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP, queryFn)
			.snapshotChanges()
			.pipe(
				switchMap(allMeetUps => {
					const allMeetUpKeys = allMeetUps.map(meetUp => meetUp.key);
					return combineLatest(
						of(allMeetUps),
						combineLatest(
							allMeetUpKeys.map(eachMeetUpKey =>
								this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + eachMeetUpKey)
									.snapshotChanges()
									.pipe(
										map(allComments => {
											const comments = allComments.map(eachComment => {
												const data = eachComment.payload.val();
												const id = eachComment.payload.key;
												return {id, ...(data as object)};
											});
											return {eachMeetUpKey, comments};
										})
									)
							),
						),
						combineLatest(
							allMeetUpKeys.map(eachMeetUpKey =>
								this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_LIKES + '/' + eachMeetUpKey)
									.snapshotChanges()
									.pipe(
										map(allLikes => {
											const likes = allLikes.map(eachLike => {
												const data = eachLike.payload.val();
												const id = eachLike.payload.key;
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
						const data = eachMeetUp.payload.val();
						const id = eachMeetUp.payload.key;
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
		const newComment: KMeetUpComment =  {id: null, uid: null, comment: null};
		newComment.uid = userInfo.uid;
		if (userInfo?.displayName) {
			newComment.comment = userInfo.displayName.substring(0, 5) + ' : ' + comment;
		} else {
			newComment.comment = comment;
		}
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + meetup.id).push(newComment);
	}

	deleteComment(meetup, comment) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + meetup.id + '/' + comment.id).remove();
	}

	addLike(meetup, userInfo) {
		const newLike: KMeetUpLike = {uid: userInfo.uid};
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_LIKES + '/' + meetup.id).push(newLike);
	}

	deleteLike(meetup, like) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP_LIKES + '/' + meetup.id + '/' + like.id).remove();
	}

	saveMeetUp(meetup: KMeetUp) {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP).push(meetup);
	}

	deleteMeetUp(meetup) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP + '/' + meetup.id).remove();
	}

	updateMeetUp(meetup) {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP + '/' + meetup.id)
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
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP + '/' + meetupId)
			.snapshotChanges()
			.pipe(
				switchMap(meetup => {
					return combineLatest(
						of(meetup),
						this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + meetupId)
							.snapshotChanges()
							.pipe(
								map(allComments => {
									const comments = allComments.map(eachComment => {
										const data = eachComment.payload.val();
										const id = eachComment.payload.key;
										return {id, ...(data as object)};
									});
									return comments;
								})
							)
					);
				}),
				map(([meetupResult, commentResult]) => {
					const data = meetupResult.payload.val();
					const id = meetupResult.payload.key;
					return {
						id,
						comments: commentResult,
						...(data as object)
					};
				})
			);
	}

	getList(): Observable<any> {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP)
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

	getPaginatedDataBasic(numberItems, startAtKey?): Observable<any> {
		let queryFn: QueryFn;
		queryFn = ref => ref.orderByChild('date').startAt(startAtKey).limitToFirst(numberItems);

		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP, queryFn)
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

	getMeetUpByMeetUpId(meetupId): Observable<any> {
		return this.angularFireDatabase.object(this.FIRE_DATABASE_KMEETUP + '/' + meetupId)
			.snapshotChanges()
			.pipe(
				map(result => {
					const data = result.payload.val();
					const id = result.payload.key;
					return {id, ...(data as object)};
				})
			);
	}

	getCommentsByMeetUpId(meetup): Observable<any> {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_COMMENT + '/' + meetup.id)
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

	getLikesByMeetUpId(meetup): Observable<any> {
		return this.angularFireDatabase.list(this.FIRE_DATABASE_KMEETUP_LIKES + '/' + meetup.id)
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
