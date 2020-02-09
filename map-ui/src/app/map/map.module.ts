import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map.component';
import {NearbyEventsComponent} from './components/nearby-events/nearby-events.component';
import {CommonModule} from '@angular/common';
import {AddEventCardComponent} from './components/add-event-card/add-event-card.component';
import {mapIcons} from '../models/map-icons';
import {MomentModule} from 'ngx-moment';
import {AddEventFormComponent} from './components/add-event-form/add-event-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [MapComponent, NearbyEventsComponent, AddEventCardComponent, AddEventFormComponent, SearchBarComponent],
  imports: [
    RouterModule.forChild([{path: '', component: MapComponent}]),
    CommonModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [...mapIcons],
})
export class MapModule {
  constructor() {}
}
