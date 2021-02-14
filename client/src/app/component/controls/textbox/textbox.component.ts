import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {

  @Input() index;

  constructor(public builderService: BuilderService) {}

}
