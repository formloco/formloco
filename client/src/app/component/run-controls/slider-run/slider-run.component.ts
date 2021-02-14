import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider-run',
  templateUrl: './slider-run.component.html',
  styleUrls: ['./slider-run.component.scss']
})
export class SliderRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;
  
  constructor(
    public builderService: BuilderService) { }

  ngOnInit() {
    this.runForm.addControl(this.builderService.detailArray[this.index]
        .formControlName, new FormControl(''));
  }

}
