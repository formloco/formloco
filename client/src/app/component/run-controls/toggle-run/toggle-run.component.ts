import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-toggle-run',
  templateUrl: './toggle-run.component.html',
  styleUrls: ['./toggle-run.component.scss']
})
export class ToggleRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public builderService: BuilderService) { }

  ngOnInit() {
    this.builderService.detailArray[this.index].toggleArray.forEach(element => {
      if (element.required)
        this.runForm.addControl(element.formControlName, 
            new FormControl(false, Validators.required));
      else
        this.runForm.addControl(element.formControlName, new FormControl(false));
    });
  }

}
