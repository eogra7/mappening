import { AfterViewInit, Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { LocationService } from '../services/location.service';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZW9ncmE3IiwiYSI6ImNrNmN5aWtlMDBwbTIza3MweGUxNjNpb2YifQ.N8QUbJPFkhYL1HDemfuDew';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  constructor(private readonly location: LocationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
    }).on('load', () => this.onMapLoad());

    (window as any)._map = this.map;
  }

  onMapLoad() {
    this.setExampleData();
    this.location.getLocation$().subscribe(location => {
      console.log(location.coords);
      const { latitude, longitude } = location.coords;
      // this.addPoint([longitude, latitude]);
      this.flyTo([longitude, latitude]);
      this.addBuildingsLayer3D();
    });
  }

  setExampleData() {
    let width = 64; // The image will be 64 pixels square
    let bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    let data = new Uint8Array(width * width * bytesPerPixel);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        let offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = (y / width) * 255; // red
        data[offset + 1] = (x / width) * 255; // green
        data[offset + 2] = 128; // blue
        data[offset + 3] = 255; // alpha
      }
    }
    this.map.addImage('gradient', { width: width, height: width, data: data });
  }

  flyTo(coords) {
    this.map.flyTo({
      center: coords,
      zoom: 15,
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
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
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
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      this.getFirstTextLayer().id
    );
  }

  getFirstTextLayer(): mapboxgl.Layer {
    const isTextLayer = l => l.layout && l.layout['text-field'];
    return this.map.getStyle().layers.find(isTextLayer);
  }
}
