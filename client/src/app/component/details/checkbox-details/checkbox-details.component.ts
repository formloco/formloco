import { Component, Input, OnChanges } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormArray } 
from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-checkbox-details',
  templateUrl: './checkbox-details.component.html',
  styleUrls: ['./checkbox-details.component.scss']
})
export class CheckboxDetailsComponent implements OnChanges {

  @Input() index

  count: number
  control
  checkboxRequired = []
  checkboxForm: FormGroup
  isDetail: boolean = false

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.checkboxForm = this.fb.group({
      label: ['', Validators.required],
      checkboxArray: this.fb.array([])
    })
  }

  ngOnChanges() {
    if (this.index !== undefined) {
      this.checkboxForm.patchValue({
        label: this.builderService.canvasFormControls.details[this.index].label,
        checkboxArray: []
      })
      this.getDetailForm()
    }
  }

  getDetailForm() {
    this.control = <FormArray>this.checkboxForm.controls.checkboxArray
    this.control.clear()
    this.builderService.canvasFormControls.details[this.index].checkboxArray.forEach(element => {
      this.control.push(this.fb.group({ 
        label: element.label, 
        labelPosition: element.labelPosition,
        required: element.required,
        error: element.error
      }))
      if (element.required === true)
        this.checkboxRequired.push(true)
      else
        this.checkboxRequired.push(false)
    })
    this.isDetail = true
  }

  add() {
    if (this.builderService.canvasFormControls.details[this.index].checkboxArray) {
      this.count = this.builderService.canvasFormControls.details[this.index].checkboxArray.length
      this.count = this.count + 1
    }
    else this.count = 1
      this.builderService.canvasFormControls.details[this.index].checkboxArray.push({
        label: "Checkbox " + this.count,
        labelPosition: "after",
        formControlName: "checkbox" + this.index + this.count,
        required: false
      })
    this.getDetailForm()
  }

  delete(index) {
    this.builderService.canvasFormControls.details[this.index].checkboxArray.splice(index,1)
    this.getDetailForm()
  }

  deleteControl() {
    this.builderService.deleteControl(this.index)
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label 
        = this.checkboxForm.get('label').value
  }

  setCheckboxLabel(index) {
    this.builderService.canvasFormControls.details[this.index].checkboxArray[index].label
        = this.checkboxForm['controls'].checkboxArray['controls'][index]
        .get('label').value
  }

  setLabelPosition(index) {
    this.builderService.canvasFormControls.details[this.index].checkboxArray[index].labelPosition
        = this.checkboxForm['controls'].checkboxArray['controls'][index]
        .get('labelPosition').value
  }

  setError(index) {
    this.builderService.canvasFormControls.details[this.index].checkboxArray[index].error
        = this.checkboxForm['controls'].checkboxArray['controls'][index]
        .get('error').value
  }

  setRequired(value,index) {
    if (value === true)
      this.checkboxRequired[index] = true
    else
      this.checkboxRequired[index] = false
      this.builderService.canvasFormControls.details[this.index].checkboxArray[index].required
          = this.checkboxForm['controls'].checkboxArray['controls'][index]
          .get('required').value
  }

}

