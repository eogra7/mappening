import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { ActivityService } from '../services/activity.service';
import { Categories } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private readonly activities: ActivityService) {}
  updateActivityData(map: mapboxgl.Map) {
    this.activities.getEvents$().subscribe(activities => {
      Object.keys(Categories).forEach(c => {
        const source = map.getSource(`source_category_${c}`);
        if (source && source.type === 'geojson') {
          source.setData({
            type: 'FeatureCollection',
            features: activities
              .filter(a => a.category === c)
              .map(a => {
                return {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: a.coords,
                  },
                  properties: {},
                };
              }),
          });
        } else {
          throw 'no source';
        }
      });
    });
  }
}
