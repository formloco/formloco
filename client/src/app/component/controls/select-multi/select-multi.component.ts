import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-select-multi',
  templateUrl: './select-multi.component.html',
  styleUrls: ['./select-multi.component.scss']
})
export class SelectMultiComponent {

  @Input() index;

  constructor(public builderService: BuilderService) { }

  ngOnChanges() {
    if (this.builderService.canvasFormControls.details[this.index].list !== 'none')
      this.builderService.getList(this.index);
  }

}

