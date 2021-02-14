import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea-run',
  templateUrl: './textarea-run.component.html',
  styleUrls: ['./textarea-run.component.scss']
})
export class TextareaRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public builderService: BuilderService) { }

  ngOnInit() {
    if (this.builderService.detailArray[this.index].required)
      this.runForm.addControl(this.builderService.detailArray[this.index]
          .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.builderService.detailArray[this.index]
          .formControlName, new FormControl(''));
  }

}
