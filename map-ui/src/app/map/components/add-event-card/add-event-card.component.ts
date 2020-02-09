import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event-card',
  templateUrl: './add-event-card.component.html',
  styleUrls: ['../nearby-events/nearby-events.component.scss']
})
export class AddEventCardComponent implements OnInit {
  modalOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
}
