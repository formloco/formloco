import { Component, Input, OnChanges } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormArray, FormControl } 
from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-radio-details',
  templateUrl: './radio-details.component.html',
  styleUrls: ['./radio-details.component.scss']
})
export class RadioDetailsComponent implements OnChanges {

  @Input() index

  count: number
  radioRequired: boolean
  isDetail: boolean = false

  radioForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.radioForm = this.fb.group({
      label:      [null, Validators.required],
      required:   [null, Validators.required],
      error:      [null, Validators.required],
      radioArray: this.fb.array([])
    })
  }

  ngOnChanges() {
    if (this.index !== undefined) {
      this.radioForm.patchValue({
        label: this.builderService.canvasFormControls.details[this.index].label,
        error: this.builderService.canvasFormControls.details[this.index].error,
        required: this.builderService.canvasFormControls.details[this.index].required,
        radioArray: []
      })
      if (this.builderService.canvasFormControls.details[this.index].required === true)
        this.radioRequired = true
      else
        this.radioRequired = false
      this.getDetailForm()
    }
  }

  getDetailForm() {
    let control = <FormArray>this.radioForm.controls.radioArray
    control.clear()
    this.builderService.canvasFormControls.details[this.index].radioArray.forEach(element => {
      control.push(this.fb.group({ 
        label: element.label, 
        value: element.value,
        labelPosition: element.labelPosition 
      }))
    })
    this.isDetail = true
  }

  add() {
    if (this.builderService.canvasFormControls.details[this.index].radioArray) {
      this.count = this.builderService.canvasFormControls.details[this.index].radioArray.length
      this.count = this.count + 1
    }
    else this.count = 1
      this.builderService.canvasFormControls.details[this.index].radioArray.push({
        label: "Option " + this.count,
        value: this.count,
        labelPosition: "after"
      })
    this.getDetailForm()
  }

  delete(index) {
    this.builderService.canvasFormControls.details[this.index].radioArray.splice(index,1)
    this.getDetailForm()
  }

  deleteControl() {
    this.builderService.deleteControl(this.index)
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.radioForm.get('label').value
  }

  setRequired(value) {
    if (value === true)
      this.radioRequired = true
    else
      this.radioRequired = false
      this.builderService.canvasFormControls.details[this.index].required = this.radioRequired
  }

  setRadioLabel(index) {
    this.builderService.canvasFormControls.details[this.index].radioArray[index].label
        = this.radioForm['controls'].radioArray['controls'][index].get('label').value
  }

  setValue(index) {
    this.builderService.canvasFormControls.details[this.index].radioArray[index].value
        = this.radioForm['controls'].radioArray['controls'][index].get('value').value
  }

  setLabelPosition(index) {
    this.builderService.canvasFormControls.details[this.index].radioArray[index].labelPosition
        = this.radioForm['controls'].radioArray['controls'][index]
        .get('labelPosition').value
  }

}

