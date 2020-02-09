import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { LocationService } from '../services/location.service';
import { MapboxService } from '../services/mapbox-service';
import { MapIcon, MapIcons } from '../models/map-icons';
import { IActivity } from '../models/activity';
import { Categories } from '../models/category';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZW9ncmE3IiwiYSI6ImNrNmN5aWtlMDBwbTIza3MweGUxNjNpb2YifQ.N8QUbJPFkhYL1HDemfuDew';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapboxService],
})
export class MapComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  constructor(
    private readonly location: LocationService,
    private readonly mapbox: MapboxService,
    @Inject(MapIcons) private readonly icons: MapIcon[],
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
    }).on('load', () => this.onMapLoad());

    (window as any)._map = this.map;
  }

  onMapLoad() {
    this.mapbox.setMap(this.map);
    this.location.getLocation$().subscribe(location => {
      console.log(location.coords);
      const { latitude, longitude } = location.coords;
      // this.addPoint([longitude, latitude]);
      this.flyTo([longitude, latitude]);
      this.addBuildingsLayer3D();
    });

    Object.keys(Categories).forEach(c => {
      this.map.addSource(`source_category_${c}`, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      this.map.addLayer({
        id: `layer_category_${c}`,
        type: 'symbol',
        source: `source_category_${c}`,
        layout: {
          'icon-image': c,
          'icon-size': 0.5,
        },
      });
    });

    this.mapbox.updateActivityData(this.map);
  }

  flyTo(coords) {
    this.map.flyTo({
      center: coords,
      zoom: 14,
      speed: 1
    });
  }

  addPoint(coords) {
    this.map.addSource('point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coords,
            },
          },
        ],
      },
    } as any);
    this.map.addLayer({
      id: 'points',
      type: 'symbol',
      source: 'point',
      layout: {
        'icon-image': 'gradient',
      },
    });
  }

  addBuildingsLayer3D() {
    this.map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      },
      this.getFirstTextLayer().id,
    );
  }

  getFirstTextLayer(): mapboxgl.Layer {
    const isTextLayer = l => l.layout && l.layout['text-field'];
    return this.map.getStyle().layers.find(isTextLayer);
  }

  setActivitiesData(activities: IActivity[]): void {
    const makeFeature = (a: IActivity) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: a.coords,
      },
      properties: {},
    });
    let source = this.map.getSource('activities');

    const data = {
      type: 'FeatureCollection',
      features: activities.map(makeFeature),
    } as const;
    if (source && source.type === 'geojson') {
      source.setData(data);
    } else {
      this.map.addSource('activities', {
        type: 'geojson',
        data,
      });
    }
  }
}
