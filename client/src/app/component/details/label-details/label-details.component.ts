import { Component, Input, OnInit } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms'

import { FontClasses } from "../../../model/label"

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss']
})
export class LabelDetailsComponent implements OnInit {

  @Input() index
  
  labelForm: FormGroup

  isForm: boolean = false
  fontClasses = FontClasses

  constructor(
    private fb: FormBuilder,
    public builderService: BuilderService) {
    this.labelForm = this.fb.group({
      label: [null, Validators.required],
      fontClass:  [null, Validators.required]
    })
  }

  ngOnInit() {
    if (this.builderService.canvasFormControls.details[this.index]) {
      this.isForm = true
      this.labelForm.setValue({
        label: this.builderService.canvasFormControls.details[this.index].label,
        fontClass:  this.builderService.canvasFormControls.details[this.index].fontValue
      })
    }
    else
      this.isForm = false
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.labelForm.get('label').value
  }

  setFont() {
    this.builderService.canvasFormControls.details[this.index].fontValue = this.labelForm.get('fontClass').value
  }

  deleteControl() {
    this.builderService.deleteControl(this.index)
  }

}
