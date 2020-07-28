import { Establishment, User } from './../models/user.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Environment,
  MarkerIcon,
  PolylineOptions
} from '@ionic-native/google-maps';
import { ModelGeo } from '../models/geolocatio.model';
import { UtilService } from './util.service';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public positionUser: Coordinates;
  map: GoogleMap;

  constructor(
    private geolocation: Geolocation
  ) {
}

  createInstanceMap() {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI'
    });

    this.getPositionUser().then(position => {

      const { latitude, longitude } = position.coords;
      this.positionUser = position.coords;

      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: latitude,
            lng: longitude
          },
          zoom: 13,
          tilt: 10
        },
        controls: {
          zoom: false,
        }
      };
  
      this.map = GoogleMaps.create('map_canvas', mapOptions);

    });

    
  }

  getPositionUser() {

    return this.geolocation.getCurrentPosition();

  }

  async markerDistancePointsSelected(establishment: Establishment, locationUser: Coordinates) {


    const pointEstablishment: ModelGeo = {
      lat: establishment.localizacao[0],
      lng: establishment.localizacao[1]
    };

    const pointUser: ModelGeo ={
      lat: this.positionUser.latitude,
      lng: this.positionUser.longitude
    };

    const polylineOptions: PolylineOptions = {
      points: [pointEstablishment, pointUser],
      color: '#0032e9',
      width: 8,
      geodesic: true,
    };

    this.map.addPolyline(polylineOptions).then();

    this.map.getCameraTarget();
    if (parseInt(establishment.distance, 0) < 6) {
      this.map.animateCameraZoomIn();
    } else {
      this.map.animateCameraZoomOut();
    } 

  }

  public createMarker(user: User, location: { lat: number, lng: number }, isClient = false) {

    const iconMe: MarkerIcon = {
      url: isClient ? user.foto : 'assets/icon.png',
      size: {
        width: 28,
        height: 28
      }
    };

    if (this.map)  {
      this.map.addMarkerSync({
        title: user.nome,
        icon: iconMe,
        animation: 'DROP',
        position: location
      });
    }

  }

  calculateDistancePointUser(coordsUser, coodsEstablishment) {

    if (coordsUser) {

      const RadiusEarth = 6371; // Radius of the earth in km

      const lat1 = coordsUser.latitude;
      const lon1 = coordsUser.longitude;
      const lat2 = coodsEstablishment.lat;
      const lon2 = coodsEstablishment.lng;

      const dLat = UtilService.deg2rad(lat2 - lat1);  // deg2rad below
      const dLon = UtilService.deg2rad(lon2 - lon1);

      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(UtilService.deg2rad(lat1)) * Math.cos(UtilService.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const distance = RadiusEarth * c; // Distance in km

      return distance.toFixed(2);
    } 

    return null;

  }

  populateMarkersDistance(markers: Establishment[]) {

    return markers.map(marker => {

      const position = {
        lat: Number(marker.localizacao[0]),
        lng: Number(marker.localizacao[1])
      };

      this.createMarker(marker, position, false);

      marker.distance = this.calculateDistancePointUser(this.positionUser, position);

      return marker;

    });

  }

}
