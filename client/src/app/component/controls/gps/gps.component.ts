import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent {

  @Input() index;

  lat;
  long;

  constructor(public builderService: BuilderService) {
    // navigator.geolocation.getCurrentPosition(position => {
    //   let lat = position.coords.latitude;
    //   let long = position.coords.longitude;
    // });
  }

}
