import { VacancyScheduled } from './../../../services/vacancy.service';
import { Platform, ModalController, MenuController } from '@ionic/angular';
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
  MarkerIcon,
  PolygonOptions,
  PolylineOptions
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalCallPage } from '../modal-call/modal-call.page';
import { ModelGeo } from 'src/app/models/geolocatio.model';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  map: GoogleMap;
  positionUser: Coordinates;
  isLoading = true;
  establishments: Establishment[] = [];
  filteredItems: Establishment[] = [];
  isFiltered = false;
  vacancyScheduled: VacancyScheduled; 

  constructor(
    private util: UtilService,
    private auth: AuthServiceProvider,
    private establishmentService: EstablishmentService,
    private platform: Platform,
    private geolocation: Geolocation,
    private modal: ModalController,
    private vancancyService: VacancyService
  ) {

    this.getPositionUser().then(position => {
      this.positionUser = position.coords;
    });

    this.vancancyService.dispatchVacancyConfirmed.subscribe((dataVacancy: VacancyScheduled) => {

      this.markerDistancePointsSelected(dataVacancy.establishment, this.positionUser);
      this.vacancyScheduled = dataVacancy;

    });

  }

  assignCopy(){
    this.filteredItems = Object.assign([], this.establishments);
  }

  search(event) {

    const { value } = event.detail;

    if  (!value){
      this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.establishments).filter(
      item => item.nome.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.isFiltered = this.filteredItems.length > 0;

  }

  getPositionUser() {

    return this.geolocation.getCurrentPosition();

  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBcC6qdfjNWpxeaC6zvSQ4ZBnRz5IsT0AI'
    });


    this.getPositionUser().then(position => {

      const { latitude, longitude } = position.coords;

      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: latitude,
            lng: longitude
          },
          zoom: 14,
          tilt: 10
        },
        controls: {
          zoom: false
        }
      };



      this.map = GoogleMaps.create('map_canvas', mapOptions);


    });



  }

  changeStateLoading() {

    setTimeout(() => this.isLoading = !this.isLoading, 2000);

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
      this.auth.setUserLogged.next(dataUser.data);

      this.getPositionUser().then(position => {

        const { latitude, longitude } = position.coords;

        this.createMarker(dataUser.data, {
          lat: latitude,
          lng: longitude
        }, true);

      });


    });

  }

  async ngOnInit() {

    await this.platform.ready();

    await this.getProfileUser();

    await this.loadMap();

    await this.establishmentService.getItems()
    .subscribe((establishments: { success: boolean, data: Establishment[] }) => {

      this.establishments = establishments.data;
      this.assignCopy();

      this.establishments = this.establishments.map(establishment => {

        const position = {
          lat: Number(establishment.localizacao[0]),
          lng: Number(establishment.localizacao[1])
        };

        this.createMarker(establishment, position, false);

        establishment.distance = this.establishmentService.calculateDistancePointUser(this.positionUser, position);


        return establishment;

      });

      this.changeStateLoading();

    }, error => {

      this.util.showToast('Não foi possível carregar seus dados');
      this.changeStateLoading();

    });

  }

  async selectEstablishment(establishment: Establishment) {

    this.isFiltered = false;

    const modal = await this.modal.create({
      component: ModalCallPage,
      cssClass: 'modal-background',
      swipeToClose: true,
      backdropDismiss: true,
      animated: true,
      showBackdrop: true,
      componentProps: {
        data: establishment
      }
    });

    await modal.present();

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

    const zoomDefined = parseInt(establishment.distance, 0) < 2 ? 16 : 13; 

    this.map.getCameraTarget();
    this.map.setCameraZoom(zoomDefined);

  }

}
