import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

  @Input() index;

  control;

  constructor(public builderService: BuilderService) { }

}
