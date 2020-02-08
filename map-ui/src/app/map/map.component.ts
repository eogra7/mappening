import {Component} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `:host {
          width: 100vw;
          height: 100vh;
          background-color: lightblue;
      }

      p.placeholder-text {
          margin-left: auto;
          margin-right: auto;
      }`
  ]
})
export class MapComponent {

}
