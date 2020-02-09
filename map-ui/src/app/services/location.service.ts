import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

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
  lastLocation: GeolocationPosition;

  getLocation$(): Observable<GeolocationPosition> {
    if (!this.geo) {
      this.geo = navigator.geolocation;
    }

    this.geo.getCurrentPosition(location => this._location.next(location));

    return this._location.asObservable().pipe(
      tap(l => this.lastLocation = l)
    );
  }
}
