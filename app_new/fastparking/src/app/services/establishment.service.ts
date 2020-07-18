import { PayloadLogin } from 'src/app/models/errors.model';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(
    private http: HttpClient
  ) {}

  getItems(establishment ?: string) {

    const query = establishment ? `/establishments/${establishment}` : '/establishments';

    return this.http.get(`${environment.baseApi}${query}`);

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

}
