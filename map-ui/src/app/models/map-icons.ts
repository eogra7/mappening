import {InjectionToken} from '@angular/core';

export type MapIcon = { name: string; url: string };
export const MapIcons = new InjectionToken<MapIcon[]>(
  'MapIcons',
);

export const mapIcons = [
  ['food', '/assets/food.png'],
  ['performance', '/assets/performance.png'],
  ['sporting', '/assets/sport.png'],
].map(([k, v]) => {
  return {
    provide: MapIcons,
    useValue: {
      name: k,
      url: v,
    },
    multi: true,
  };
});
