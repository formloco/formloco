import { Component, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

  @Input() index

  constructor(public builderService: BuilderService) { }

}
