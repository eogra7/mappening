import { AfterViewInit, Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZW9ncmE3IiwiYSI6ImNrNmN5aWtlMDBwbTIza3MweGUxNjNpb2YifQ.N8QUbJPFkhYL1HDemfuDew';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      :host {
        width: 100vw;
        height: 100vh;
        background-color: lightblue;
      }

      p.placeholder-text {
        margin-left: auto;
        margin-right: auto;
      }

      #map {
        height: 100vh;
        width: 100%;
      }
    `,
  ],
})
export class MapComponent implements OnInit, AfterViewInit {
  map;
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
    }).on('load', () => this.setExampleData());

  }

  setExampleData() {
    this.map.addSource('point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
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
}
