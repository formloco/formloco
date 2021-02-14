import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textbox-run',
  templateUrl: './textbox-run.component.html',
  styleUrls: ['./textbox-run.component.scss']
})
export class TextboxRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public builderService: BuilderService) { }

  ngOnInit() {
    if (this.builderService.detailArray[this.index].required)
      this.runForm.addControl(this.builderService.detailArray[this.index]
          .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.builderService.detailArray[this.index].formControlName, new FormControl(''));
  }

}
