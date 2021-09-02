import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {KMeetUp} from '../model/KMeetUp';
import {IonInfiniteScroll} from '@ionic/angular';
import firebase from 'firebase';
import {UtilService} from '../services/util.service';
import {AuthenticationService} from '../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

	@ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
	allMeetUp: KMeetUp[] = [];
	meetUpSubscription: Subscription;
	offset = '';
	firstOfData = true;
	endOfData = false;
	showSearchBar = false;
	pageSize = 0;
	userInfo: firebase.User;

	constructor(private dataService: DataService,
							private utilService: UtilService,
							private router: Router,
							private authenticationService: AuthenticationService,
							private translateService: TranslateService) {
		this.userInfo = this.authenticationService.authStateBehaviorSubject.value;
	}

	ngOnInit(): void {
		this.getData('');
	}

	ngOnDestroy(): void {
		if (this.meetUpSubscription) {
			this.meetUpSubscription.unsubscribe();
		}
	}

	getData(event: any) {
		console.log('데이터 호출');
		if (!this.endOfData) {
			++this.pageSize;
		}

		if (this.meetUpSubscription) {
			this.meetUpSubscription.unsubscribe();
		}

		this.meetUpSubscription = this.dataService.getData(this.utilService.recordsPerPage * this.pageSize, this.offset)
			.subscribe(result => {
				this.allMeetUp = result;
				if (this.utilService.recordsPerPage * this.pageSize > result.length) {
					this.endOfData = true;
					this.infinite.disabled = true;
				} else {
					this.endOfData = false;
					this.infinite.disabled = false;
				}
			}, (error) => {
				this.utilService.showAlert(this.translateService.instant('ERROR'), error);
			});

		if (event) {
			event.target.complete();
		}
	}

	onSearch(search: string): void {
		this.allMeetUp = this.allMeetUp.filter(currentList => {
			return currentList.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});
	}

	refresh(): void {
		this.getData('');
	}

	showDetail(meetupId: string) {
		this.router.navigateByUrl('/meetup-detail', {state: {id: meetupId}});
	}

	addNewMeetUp() {
		this.router.navigateByUrl('/new-meet-up');
	}

	addLike(meetup) {
		const liked = meetup.likes.filter(like => (like.uid === this.userInfo.uid));
		if (liked.length) {
			this.dataService.deleteLike(meetup, liked[0])
				.then(result => {
				})
				.catch(error => {
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
		} else {
			this.dataService.addLike(meetup, this.userInfo)
				.then(result => {
				})
				.catch(error => {
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
		}
	}
}
