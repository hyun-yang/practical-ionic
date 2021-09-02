import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CapacitorGoogleMaps} from '@capacitor-community/capacitor-googlemaps-native';
import {Geolocation} from '@capacitor/geolocation';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.page.html',
  styleUrls: ['./meetup-detail.page.scss'],
})
export class MeetupDetailPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;

  markerTitle = '모임 장소';

  constructor(private utilService: UtilService) {
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
    await CapacitorGoogleMaps.initialize({
      key: 'AIzaSyCkbkM7mdvFerqMwCIOlFfg_l-1wA8LIs0'
    });
  }

  async ionViewDidEnter() {
    await this.loadMap();
  }

  async ionViewDidLeave() {
    await CapacitorGoogleMaps.clear();
    await CapacitorGoogleMaps.close();
  }

  async loadMap() {
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
      zoom: 15
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
  }
}
