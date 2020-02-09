import { Component, OnInit } from '@angular/core';
import {MapboxService} from '../../../services/mapbox-service';

@Component({
  selector: 'app-add-event-card',
  templateUrl: './add-event-card.component.html',
  styleUrls: ['../nearby-events/nearby-events.component.scss', './add-event-card.component.scss']
})
export class AddEventCardComponent implements OnInit {
  modalOpen = false;
  constructor(private readonly mapbox: MapboxService) { }

  ngOnInit(): void {
  }

  handleSelectFromMap() {
    this.mapbox.selectingOnMap = true;
  }
}
