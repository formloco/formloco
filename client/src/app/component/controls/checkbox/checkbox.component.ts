import { Component, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() index

  constructor(
    public builderService: BuilderService) { }

}
