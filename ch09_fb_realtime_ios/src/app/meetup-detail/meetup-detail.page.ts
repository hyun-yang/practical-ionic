import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../services/data.service';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import firebase from 'firebase';
import {Subscription} from 'rxjs';
import {KMeetUp} from '../model/KMeetUp';
import {CapacitorGoogleMaps} from '@capacitor-community/capacitor-googlemaps-native';
import {CallNumber} from '@ionic-native/call-number/ngx';

@Component({
	selector: 'app-meetup-detail',
	templateUrl: './meetup-detail.page.html',
	styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage implements OnInit, OnDestroy {

	@ViewChild('map') mapElement: ElementRef;

	markerTitle = this.translateService.instant('ADDRESS');
	meetup: KMeetUp;
	likes: any;
	userComment = '';
	userInfo: firebase.User;
	meetUpDetailSubscription: Subscription;

	constructor(
		private translateService: TranslateService,
		private dataService: DataService,
		private authenticationService: AuthenticationService,
		private utilService: UtilService,
		private router: Router,
		private alertController: AlertController,
		private callNumber: CallNumber
	) {
		this.userInfo = this.authenticationService.authStateBehaviorSubject.value;
		if (this.meetUpDetailSubscription) {
			this.meetUpDetailSubscription.unsubscribe();
		}
		this.meetUpDetailSubscription = this.dataService.getCommentAndMeetUpByMeetUpId(this.router.getCurrentNavigation().extras.state.id)
			.subscribe(result => {
				this.meetup = result;
			});
		this.initialize();
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if (this.meetUpDetailSubscription) {
			this.meetUpDetailSubscription.unsubscribe();
		}
	}

	async initialize() {
		await CapacitorGoogleMaps.initialize({
			key: 'GOOGLE_MAP_API_KEY'
		});
	}

	async ionViewDidEnter() {
		await this.showMeetUpPlace(this.meetup.map);
	}

	async ionViewDidLeave() {
		await CapacitorGoogleMaps.clear();
		await CapacitorGoogleMaps.close();
	}

	async showMeetUpPlace(meetUpMapData) {
		const mTitle = this.markerTitle;
		const boundingRect = this.mapElement.nativeElement.getBoundingClientRect() as DOMRect;

		await CapacitorGoogleMaps.create({
			width: Math.round(boundingRect.width),
			height: Math.round(boundingRect.height),
			x: Math.round(boundingRect.x),
			y: Math.round(boundingRect.y),
			latitude: meetUpMapData.latitude,
			longitude: meetUpMapData.longitude,
			zoom: this.utilService.MAP_MIN_ZOOM
		});

		await CapacitorGoogleMaps.addListener('onMapReady', async () => {
			await CapacitorGoogleMaps.addMarker({
				latitude: meetUpMapData.latitude,
				longitude: meetUpMapData.longitude,
				title: mTitle,
			});

			await CapacitorGoogleMaps.setMapType({
				type: 'normal'
			});
		});

	}

  handleEnter($event: KeyboardEvent) {
    CapacitorGoogleMaps.show();
  }

	hideGoogleMap() {
		CapacitorGoogleMaps.hide();
	}

	addComment() {
		this.dataService.addComment(this.meetup, this.userComment, this.userInfo)
			.then(result => {
				this.userComment = '';
				this.utilService.showToast(this.translateService.instant('SAVE_COMPLETE_MSG'));
				CapacitorGoogleMaps.show();
			})
			.catch(error => {
				this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				CapacitorGoogleMaps.show();
			});
	}

	async deleteComment(userComment) {
		CapacitorGoogleMaps
			.hide()
			.then(async (res) => {
				const alert = await this.alertController.create({
					header: this.translateService.instant('DELETE'),
					message: this.translateService.instant('DELETE_CONFIRM_MSG'),
					buttons: [
						{
							text: this.translateService.instant('DELETE'),
							handler: () => {
								this.dataService.deleteComment(this.meetup, userComment)
									.then(result => {
										this.utilService.showToast(this.translateService.instant('DELETE_COMPLETE_MSG'));
										CapacitorGoogleMaps.show();
									})
									.catch(error => {
										this.utilService.showAlert(this.translateService.instant('ERROR'), error);
										CapacitorGoogleMaps.show();
									});
							}
						},
						{
							text: this.translateService.instant('CANCEL'),
							handler: () => {
								CapacitorGoogleMaps.show();
							}
						}
					]
				});
				await alert.present();
			});
	}

	updateMeetUp() {
		this.dataService.updateMeetUp(this.meetup)
			.then(result => {
				this.utilService.showToast(this.translateService.instant('SAVE_COMPLETE_MSG'));
				this.router.navigateByUrl('/home');
			})
			.catch(error => {
				this.utilService.showAlert(this.translateService.instant('ERROR'), error);
			});
	}

	async deleteMeetUp() {
		CapacitorGoogleMaps
			.hide()
			.then(async (res) => {
				const alert = await this.alertController.create({
					header: this.translateService.instant('DELETE'),
					message: this.translateService.instant('DELETE_CONFIRM_MSG'),
					buttons: [
						{
							text: this.translateService.instant('DELETE'),
							handler: () => {
								this.utilService.showLoading(this.translateService.instant('PROCESSING'));
								this.dataService.deleteMeetUp(this.meetup)
									.then(result => {
										this.utilService.dismissLoading();
										this.meetUpDetailSubscription.unsubscribe();
										this.router.navigateByUrl('/home');
										this.utilService.showToast(this.translateService.instant('DELETE_COMPLETE_MSG'));
									})
									.catch(error => {
										this.utilService.dismissLoading();
										this.meetUpDetailSubscription.unsubscribe();
										this.utilService.showAlert(this.translateService.instant('ERROR'), error);
									});
							}
						},
						{
							text: this.translateService.instant('CANCEL'),
							handler: () => {
								CapacitorGoogleMaps.show();
							}
						}
					]
				});
				await alert.present();
			});
	}

	call(phoneNumber) {
		this.callNumber.callNumber(phoneNumber, true)
			.then(result => console.log('call'))
			.catch(error => this.utilService.showAlert(this.translateService.instant('ERROR'), error));
	}
}
