import { Component, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent {

  @Input() index

  lat
  long

  constructor(public builderService: BuilderService) {
  }

}
