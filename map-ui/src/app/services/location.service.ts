import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

export type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  geo;
  private _location = new ReplaySubject<GeolocationPosition>(1);

  getLocation$(): Observable<GeolocationPosition> {
    if (!this.geo) {
      this.geo = navigator.geolocation;
    }

    this.geo.getCurrentPosition(location => this._location.next(location));

    return this._location.asObservable();
  }
}
