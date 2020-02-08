import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: MapComponent}
    ])
  ]
})
export class MapModule {
  constructor() {

  }
}
