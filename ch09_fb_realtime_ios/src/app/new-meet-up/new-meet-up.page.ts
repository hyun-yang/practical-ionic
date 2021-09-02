import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {KMeetUp} from '../model/KMeetUp';
import {DataService} from '../services/data.service';
import {AuthenticationService} from '../services/authentication.service';
import firebase from 'firebase';
import {UtilService} from '../services/util.service';
import {KMeetUpMap} from '../model/KMeetUpMap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@capacitor/geolocation';
import {CapacitorGoogleMaps} from '@capacitor-community/capacitor-googlemaps-native';
import {AlertController} from '@ionic/angular';

@Component({
	selector: 'app-new-meet-up',
	templateUrl: './new-meet-up.page.html',
	styleUrls: ['./new-meet-up.page.scss'],
})
export class NewMeetUpPage implements OnInit {

	@ViewChild('map') mapElement: ElementRef;

	markerTitle = this.translateService.instant('ADDRESS');
	meetup: KMeetUp;
	meetupMap: KMeetUpMap;
	userInfo: firebase.User;
	minDate: any;
	userForm: FormGroup;

	constructor(
		private translateService: TranslateService,
		private dataService: DataService,
		private authenticationService: AuthenticationService,
		private utilService: UtilService,
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private router: Router) {

		this.userInfo = this.authenticationService.authStateBehaviorSubject.value;
		this.meetupMap = {latitude: null, longitude: null};
		this.meetup = {uid: '', name: '', title: '', description: '', date: '', orderedDate: '', phone: '', map: this.meetupMap};
		this.minDate = new Date().toISOString();

		this.userForm = this.formBuilder.group({
			name: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required])],
			title: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(30), Validators.required])],
			description: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100), Validators.required])],
			phone: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(15), Validators.required])],
			date: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(30), Validators.required])]
		});

		this.initialize();
	}

	ngOnInit() {
	}

	async initialize() {
		await CapacitorGoogleMaps.initialize({
			key: 'GOOGLE_MAP_API_KEY'
		});
	}

	async ionViewDidEnter() {
		await this.showCurrentPlace();
	}

	async ionViewDidLeave() {
		await CapacitorGoogleMaps.clear();
		await CapacitorGoogleMaps.close();
	}

	async showCurrentPlace() {
		const coordinates = await Geolocation.getCurrentPosition();
		const mTitle = this.markerTitle;
		const boundingRect = this.mapElement.nativeElement.getBoundingClientRect() as DOMRect;

		await CapacitorGoogleMaps.create({
			width: Math.round(boundingRect.width),
			height: Math.round(boundingRect.height),
			x: Math.round(boundingRect.x),
			y: Math.round(boundingRect.y),
			latitude: coordinates.coords.latitude,
			longitude: coordinates.coords.longitude,
			zoom: this.utilService.MAP_MIN_ZOOM
		});

		await CapacitorGoogleMaps.addListener('onMapReady', async () => {
			await CapacitorGoogleMaps.addMarker({
				latitude: coordinates.coords.latitude,
				longitude: coordinates.coords.longitude,
				title: mTitle,
			});

			await CapacitorGoogleMaps.setMapType({
				type: 'normal'
			});
		});

		await CapacitorGoogleMaps.addListener('didTapAt', async (value) => {
			CapacitorGoogleMaps.clear()
				.then(async (result) => {
					this.meetupMap = value.result.coordinates;
					await CapacitorGoogleMaps.addMarker(
						{
							latitude: this.meetupMap.latitude,
							longitude: this.meetupMap.longitude,
							title: mTitle
						}
					);
				})
				.catch(async (error) => {
					await this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
		});
	}

	hideGoogleMap() {
		CapacitorGoogleMaps.hide();
	}

	handleEnter($event: KeyboardEvent) {
		CapacitorGoogleMaps.show();
	}

	saveMeetUp() {
		if (this.userForm.controls.name.valid && this.userForm.controls.title.valid && this.userForm.controls.description.valid
			&& this.userForm.controls.phone.valid && this.userForm.controls.date.valid) {
			this.setMeetUpData();
			this.utilService.showLoading(this.translateService.instant('PROCESSING'));
			this.dataService.saveMeetUp(this.meetup)
				.then(result => {
					CapacitorGoogleMaps.hide();
					this.utilService.dismissLoading();
					this.utilService.showToast(this.translateService.instant('SAVE_COMPLETE_MSG'));
					this.router.navigateByUrl('/home');
				})
				.catch(error => {
					CapacitorGoogleMaps.hide();
					this.utilService.dismissLoading();
					this.utilService.showAlert(this.translateService.instant('ERROR'), error);
				});
		} else {
			CapacitorGoogleMaps
				.hide()
				.then(async (res) => {
					const alert = await this.alertController.create({
						header: this.translateService.instant('ERROR'),
						message: this.translateService.instant('REQUIRED'),
						buttons: [
							{
								text: this.translateService.instant('OK'),
								handler: () => {
									CapacitorGoogleMaps.show();
								}
							}
						]
					});
					await alert.present();
				});
		}
	}

	setMeetUpData() {
		this.meetup = this.userForm.value;
		this.meetup.orderedDate = (Number.MAX_SAFE_INTEGER - Date.now()).toString();
		this.meetup.uid = this.userInfo.uid;
		this.meetup.map = this.meetupMap;
	}

}
