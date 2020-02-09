import { Injectable } from '@angular/core';
import mapboxgl, { GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { ActivityService } from './activity.service';
import { IActivity } from '../models/activity';
import { ReplaySubject } from 'rxjs';
import * as turf from '@turf/turf';
import { LocationService } from './location.service';
import { ModalService } from './modal.service';

@Injectable()
export class MapboxService {
  map: mapboxgl.Map;
  loadedIcons = new Set<string>();
  sources = new Set<string>();
  _current = new ReplaySubject(1);
  current$ = this._current.asObservable();
  selectingOnMap = false;

  constructor(
    private readonly activities: ActivityService,
    private readonly location: LocationService,
    private readonly modals: ModalService,
  ) {}
  setMap(map: mapboxgl.Map) {
    this.map = map;
    this.map.on('mousemove', e => this.handleMouseMove(e));
    this.map.on('mousedown', e => this.handleMouseDown(e));
    this.map.on('contextmenu', () => false);
  }

  updateActivityData(map: mapboxgl.Map) {
    this.activities
      .getEvents$()
      .pipe()
      .subscribe(activities => {
        const byCategory = activities.reduce((acc, value) => {
          const { category } = value;
          if (Array.isArray(acc[category])) {
            acc[category].push(value);
          } else {
            acc[category] = [value];
          }
          return acc;
        }, {});

        for (const category in byCategory) {
          const loweredCategory = category.replace(' ', '_').toLowerCase();
          this.loadIcon(loweredCategory);
          this.createSource(loweredCategory, byCategory[category]);
          this.createLayer(loweredCategory);
        }
      });
  }

  loadIcon(name: string, url?: string) {
    if (this.loadedIcons.has(name)) {
      return;
    }
    this.loadedIcons.add(name);
    this.map.loadImage(url || `/assets/${name}.png`, (error, image) => {
      if (error) {
        console.log(error);
        this.loadedIcons.delete(name);
        this.loadIcon(name, '/assets/generic.png');
      } else {
        this.map.addImage(name, image);
      }
    });
  }

  createSource(name: string, activities: IActivity[]) {
    let id = `source_${name}`;
    let existing = this.map.getSource(id);
    if (existing) {
    }

    const data = {
      type: 'FeatureCollection',
      features: [],
    };
    const features = [];
    for (const activity of activities) {
      const feature: any = {
        type: 'Feature' as const,
        geometry: {
          type: 'Point',
          coordinates: activity.coords,
        },
        properties: {
          coords: activity.coords,
          _app_id: activity.eventId,
        },
      };
      data.features.push(feature);
    }
    const source: GeoJSONSourceRaw = {
      type: 'geojson',
      data: data as any,
    };
    if (existing) {
      (existing as GeoJSONSource).setData(data as any);
    } else {
      this.map.addSource(id, source);
      this.sources.add(id);
      console.log(
        `added source ${id} with ${
          (source.data as any).features.length
        } features`,
      );
    }
  }

  getSource(name: string) {
    return this.map.getSource(this.getId('source', name));
  }

  getLayer(name: string) {
    return this.map.getLayer(this.getId('layer', name));
  }

  getId(type: 'source' | 'layer', name: string) {
    switch (type) {
      case 'layer':
        return `layer_${name}`;
      case 'source':
        return `source_${name}`;
      default:
        throw `unknown type '${type}'. given name '${name}'`;
    }
  }

  private createLayer(name: string) {
    const id = `layer_${name}`;
    const existing = this.map.getLayer(id);
    if (existing) {
      this.map.removeLayer(id);
    }

    const layer = {
      id,
      type: 'symbol',
      source: `source_${name}`,
      layout: {
        'icon-image': name,
        'icon-size': 1,
      },
    };

    this.map.addLayer(layer as any);
  }

  _flyToHistory;

  flyTo(coords: [number, number]) {
    if (!this.map) {
      return;
    }
    if (!this._flyToHistory) {
      this._flyToHistory = this.map.getCenter();
    }
    this.map.flyTo({ center: coords, zoom: 17, pitch: 45 });
  }

  unfly() {
    return;

    if (!this.map) {
      return;
    }
    if (this._flyToHistory) {
      this.map.flyTo({ center: this._flyToHistory, zoom: 14, pitch: 0 });
      // this._flyToHistory = null;
    }
  }

  handleMouseMove(e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    const features = this.map
      .queryRenderedFeatures(e.point)
      .filter(f => this.sources.has(f.source));

    if (features.length) {
      this.activities.hoveredActivity = +features[0].properties._app_id;
    } else {
      this.activities.hoveredActivity = null;
    }
    // console.log(features);
  }

  getNearest(features: mapboxgl.MapboxGeoJSONFeature[]) {
    const {
      coords: { latitude, longitude },
    } = this.location.lastLocation;
    const sortedFeatures = features
      .map(f => {
        const from =
          f.properties && JSON.parse(f.properties.coords).map(x => +x);
        const to = [+longitude, +latitude];
        const distance =
          from && to
            ? turf.distance(from, to, {
                units: 'meters',
              })
            : null;
        return {
          distance,
          feature: f,
        };
      })
      .filter(x => x.distance !== null)
      .sort((a, b) => a.distance - b.distance);

    return sortedFeatures.length
      ? sortedFeatures[0].feature.properties._app_id
      : null;
  }

  getEventById(id) {
    this.activities;
  }

  private handleMouseDown(e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    if (e.originalEvent.button === 0) {
    }
    switch (e.originalEvent.button) {
      case 0: {
        this.handleLeftClick(e);
        return;
      }
      case 2:
      default:
        return;
    }
  }

  private handleLeftClick(e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    if (this.selectingOnMap) {
      this.modals.showNewEvent(e.lngLat.toArray().reverse());
      this.selectingOnMap = false;
    } else {
      this.activities.currentActivity = this.activities.hoveredActivity;
    }
  }
}
