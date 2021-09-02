import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeolocationOptions} from '@ionic-native/geolocation';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GoogleMap, GoogleMaps, GoogleMapsEvent, GoogleMapsMapTypeId, LatLng, Marker, MarkerOptions} from '@ionic-native/google-maps/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {KMeetUp} from '../model/KMeetUp';
import {DataService} from '../services/data.service';
import {AuthenticationService} from '../services/authentication.service';
import firebase from 'firebase';
import {UtilService} from '../services/util.service';
import {KMeetUpMap} from '../model/KMeetUpMap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-meet-up',
  templateUrl: './new-meet-up.page.html',
  styleUrls: ['./new-meet-up.page.scss'],
})
export class NewMeetUpPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;

  map: GoogleMap;
  marker: any;
  markerTitle = this.translateService.instant('ADDRESS');

  geolocationOptions: GeolocationOptions = {
    enableHighAccuracy: true
  };

  meetup: KMeetUp;
  meetupMap: KMeetUpMap;
  userInfo: firebase.User;
  minDate: any;
  userForm: FormGroup;

  constructor(private geolocation: Geolocation,
              private translateService: TranslateService,
              private dataService: DataService,
              private authenticationService: AuthenticationService,
              private utilService: UtilService,
              private formBuilder: FormBuilder,
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
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.showCurrentPlace();
  }

  showCurrentPlace() {
    this.geolocation.getCurrentPosition(this.geolocationOptions)
      .then(result => {
        const latLng: LatLng = new LatLng(result.coords.latitude, result.coords.longitude);
        const cameraPosition = {
          target: latLng
        };

        const mapOptions = {
          mapType: GoogleMapsMapTypeId.SATELLITE,
          camera: cameraPosition,
          preferences: {
            zoom: {minZoom: this.utilService.MAP_MIN_ZOOM, maxZoom: this.utilService.MAP_MAX_ZOOM}
          }
        };

        this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
        this.meetupMap.latitude = latLng.lat;
        this.meetupMap.longitude = latLng.lng;

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((mapResult: any[]) => {
          const location: LatLng = mapResult[0];
          this.meetupMap.latitude = location.lat;
          this.meetupMap.longitude = location.lng;
          this.addMarker(location, this.markerTitle);
        });

      }, (error: PositionError) => {
        this.utilService.showAlert(this.translateService.instant('ERROR'), error);
      });
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

  saveMeetUp() {
    if (this.userForm.controls.name.valid && this.userForm.controls.title.valid && this.userForm.controls.description.valid
      && this.userForm.controls.phone.valid && this.userForm.controls.date.valid) {
      this.setMeetUpData();
      this.utilService.showLoading(this.translateService.instant('PROCESSING'));
      this.dataService.saveMeetUp(this.meetup)
        .then(result => {
          this.utilService.dismissLoading();
          this.utilService.showToast(this.translateService.instant('SAVE_COMPLETE_MSG'));
          this.router.navigateByUrl('/home');
        })
        .catch(error => {
          this.utilService.dismissLoading();
          this.utilService.showAlert(this.translateService.instant('ERROR'), error);
        });
    } else {
      this.utilService.showAlert(this.translateService.instant('ERROR'), this.translateService.instant('REQUIRED'));
    }
  }

  setMeetUpData() {
    this.meetup = this.userForm.value;
    this.meetup.orderedDate = (Number.MAX_SAFE_INTEGER - Date.now()).toString();
    this.meetup.uid = this.userInfo.uid;
    this.meetup.map = this.meetupMap;
  }
}
