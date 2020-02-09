import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { NearbyEventsComponent } from './components/nearby-events/nearby-events.component';
import { CommonModule } from '@angular/common';
import { AddEventCardComponent } from './components/add-event-card/add-event-card.component';
import { mapIcons } from '../models/map-icons';

@NgModule({
  declarations: [MapComponent, NearbyEventsComponent, AddEventCardComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MapComponent }]),
    CommonModule,
  ],
  providers: [...mapIcons],
})
export class MapModule {
  constructor() {}
}
