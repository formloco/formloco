import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {

  @Input() index;

  control;
  
  constructor(public builderService: BuilderService) { }

}
