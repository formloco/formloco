import { Component, Input, OnChanges } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {

  @Input() index

  constructor(public builderService: BuilderService) { }

  ngOnChanges() {
    if (this.builderService.canvasFormControls.details[this.index].list !== 'none')
      this.builderService.getList(this.index)
  }

}
