import { Platform } from '@ionic/angular';
import { Establishment, User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { EstablishmentService } from 'src/app/services/establishment.service';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MarkerIcon
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  map: GoogleMap;

  isLoading = true;
  searchValue = '';
  establishments: Establishment[] = [];

  constructor(
    private util: UtilService,
    private auth: AuthServiceProvider,
    private establishmentService: EstablishmentService,
    private platform: Platform
  ) {}


  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);


  }

  changeStateLoading() {

    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 2000);

  }

  private createMarker(user: User, location: { lat: number, lng: number }, isClient = false) {

    const iconMe: MarkerIcon = {
      url: isClient ? user.foto : 'assets/icon.png',
      size: {
        width: 35,
        height: 35
      }
    };

    this.map.addMarkerSync({
      title: user.nome,
      icon: iconMe,
      animation: 'DROP',
      position: location
    });

  }

  getProfileUser() {

    this.auth.getMeProfile()
    .subscribe((dataUser: { success: boolean, data: User }) => {

      this.auth.userLogged = dataUser.data;

      this.createMarker(dataUser.data, null, true);

    });

  }

  async ngOnInit() {

    await this.platform.ready();

    await this.getProfileUser();

    await this.loadMap();

    this.establishmentService.getItems()
    .subscribe((establishments: { success: boolean, data: Establishment[] }) => {

      this.establishments = establishments.data;

      this.establishments.forEach(establishment => {

        const position = {
          lat: Number(establishment.localizacao[0]),
          lng: Number(establishment.localizacao[1])
        };

        this.createMarker(establishment, position, false);

      }); 

      this.changeStateLoading();

    }, error => {

      this.util.showToast('Não foi possível carregar seus dados');
      this.changeStateLoading();

    });

  }

}
