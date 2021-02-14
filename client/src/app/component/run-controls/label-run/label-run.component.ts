import { Component, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-label-run',
  templateUrl: './label-run.component.html',
  styleUrls: ['./label-run.component.scss']
})
export class LabelRunComponent {

  @Input() index;

  constructor(public builderService: BuilderService) { }

}
