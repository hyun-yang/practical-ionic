import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeolocationOptions} from '@ionic-native/geolocation';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GoogleMap, GoogleMaps, GoogleMapsMapTypeId, LatLng, Marker, MarkerOptions} from '@ionic-native/google-maps/ngx';

@Component({
	selector: 'app-meetup-detail',
	templateUrl: './meetup-detail.page.html',
	styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage implements OnInit {

	@ViewChild('map') mapElement: ElementRef;
	map: GoogleMap;

	markerTitle = '모임 장소';

	geolocationOptions: GeolocationOptions = {
		enableHighAccuracy: true
	};

	constructor(private geolocation: Geolocation) {
	}

	ngOnInit() {
		this.loadMap();
	}

	loadMap() {
		this.geolocation.getCurrentPosition(this.geolocationOptions)
			.then(result => {
				const latLng: LatLng = new LatLng(result.coords.latitude, result.coords.longitude);

				const cameraPosition = {
					target: latLng
				};

				const mapOptions = {
					mapType: GoogleMapsMapTypeId.HYBRID,
					camera: cameraPosition,
					preferences: {
						zoom: {minZoom: 15, maxZoom: 20}
					}
				};

				this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
				this.addMarker(latLng, this.markerTitle);
			});
	}

	addMarker(latLng, title) {
		const markerOptions: MarkerOptions = {
			position: latLng,
			title
		};

		this.map.addMarker(markerOptions)
			.then((markerHere: Marker) => {
				markerHere.addEventListener('click', () => {
					markerHere.showInfoWindow();
				});
			});
	}
}
