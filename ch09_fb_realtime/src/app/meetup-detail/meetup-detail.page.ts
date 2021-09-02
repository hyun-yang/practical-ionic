import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GeolocationOptions} from '@ionic-native/geolocation';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GoogleMap, GoogleMaps, GoogleMapsEvent, GoogleMapsMapTypeId, LatLng, Marker, MarkerOptions} from '@ionic-native/google-maps/ngx';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../services/data.service';
import {AuthenticationService} from '../services/authentication.service';
import {UtilService} from '../services/util.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {CallNumber} from '@ionic-native/call-number/ngx';
import firebase from 'firebase';
import {Subscription} from 'rxjs';
import {KMeetUp} from '../model/KMeetUp';

@Component({
	selector: 'app-meetup-detail',
	templateUrl: './meetup-detail.page.html',
	styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage implements OnInit, OnDestroy {

	@ViewChild('map') mapElement: ElementRef;

	map: GoogleMap;
	marker: any;
	markerTitle = this.translateService.instant('ADDRESS');
	geolocationOptions: GeolocationOptions = {
		enableHighAccuracy: true
	};
	meetup: KMeetUp;
	likes: any;
	userComment = '';

	userInfo: firebase.User;
	meetUpDetailSubscription: Subscription;

	constructor(private geolocation: Geolocation,
							private translateService: TranslateService,
							private dataService: DataService,
							private authenticationService: AuthenticationService,
							private utilService: UtilService,
							private router: Router,
							private alertController: AlertController,
							private callNumber: CallNumber) {
		this.userInfo = this.authenticationService.authStateBehaviorSubject.value;
		if (this.meetUpDetailSubscription) {
			this.meetUpDetailSubscription.unsubscribe();
		}
		this.meetUpDetailSubscription = this.dataService.getCommentAndMeetUpByMeetUpId(this.router.getCurrentNavigation().extras.state.id)
			.subscribe(result => {
				this.meetup = result;
			});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if (this.meetUpDetailSubscription) {
			this.meetUpDetailSubscription.unsubscribe();
		}
	}

	ionViewDidEnter() {
		this.showMeetUpPlace(this.meetup.map);
	}

	showMeetUpPlace(meetUpMapData) {
		const latLng: LatLng = new LatLng((meetUpMapData.latitude), (meetUpMapData.longitude));
		const cameraPosition = {
			target: latLng
		};

		const mapOptions = {
			mapType: GoogleMapsMapTypeId.NORMAL,
			camera: cameraPosition,
			preferences: {
				zoom: {minZoom: this.utilService.MAP_MIN_ZOOM, maxZoom: this.utilService.MAP_MAX_ZOOM}
			}
		};

		this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);

		if (this.meetup?.uid === this.userInfo.uid) {
			this.geolocation.getCurrentPosition(this.geolocationOptions)
				.then(result => {
					this.addMarker(latLng, this.markerTitle);
					this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((mapResult: any[]) => {
						const location: LatLng = mapResult[0];
						this.meetup.map.latitude = location.lat;
						this.meetup.map.longitude = location.lng;
						this.addMarker(location, this.markerTitle);
					});
				});
		} else {
			this.addMarker(latLng, this.markerTitle);
		}
	}

	addMarker(latLng, title) {
		if (this.marker) {
			this.marker.remove();
		}
		const markerOptions: MarkerOptions = {
			position: latLng,
			title
		};

		this.map.addMarker(markerOptions)
			.then((markerHere: Marker) => {
				this.map.animateCamera({target: latLng, zoom: this.utilService.MAP_MIN_ZOOM, duration: 500});
				this.marker = markerHere;
				this.marker.addEventListener('click', () => {
					this.marker.showInfoWindow();
				});
			});
	}

	addComment() {
		this.dataService.addComment(this.meetup, this.userComment, this.userInfo)
			.then(result => {
				this.userComment = '';
				this.utilService.showToast(this.translateService.instant('SAVE_COMPLETE_MSG'));
			})
			.catch(error => {
				this.utilService.showAlert(this.translateService.instant('ERROR'), error);
			});
	}

	async deleteComment(userComment) {
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
							})
							.catch(error => {
								this.utilService.showAlert(this.translateService.instant('ERROR'), error);
							});
					}
				},
				{
					text: this.translateService.instant('CANCEL'),
					handler: () => {
					}
				}
			]
		});
		await alert.present();
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
					}
				}
			]
		});
		await alert.present();
	}

	call(phoneNumber) {
		this.callNumber.callNumber(phoneNumber, true);
	}
}
