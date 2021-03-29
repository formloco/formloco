import { Component, OnInit, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() index

  constructor(public builderService: BuilderService) { }

}
