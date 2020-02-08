import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';
import {NearbyEventsComponent} from './components/nearby-events/nearby-events.component';
import {CommonModule} from '@angular/common';
import { AddEventCardComponent } from './components/add-event-card/add-event-card.component';

@NgModule({
  declarations: [
    MapComponent,
    NearbyEventsComponent,
    AddEventCardComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: MapComponent}
    ]),
    CommonModule
  ]
})
export class MapModule {
  constructor() {

  }
}
