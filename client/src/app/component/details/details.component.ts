import { Component, Input, OnChanges } from '@angular/core';

import { AppService } from "../../service/app.service";
import { BuilderService } from "../../service/builder.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnChanges {

  @Input() index;
  
  type: '';

  constructor(
    public appService: AppService,
    public builderService: BuilderService) { }

  ngOnChanges() {
    this.type = this.builderService.canvasFormControls.controls[this.index].type;
  }

}
