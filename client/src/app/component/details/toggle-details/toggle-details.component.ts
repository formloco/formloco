import { Component, Input, OnChanges } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl, FormArray } 
from '@angular/forms';

import { AppService } from "../../../service/app.service";
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-toggle-details',
  templateUrl: './toggle-details.component.html',
  styleUrls: ['./toggle-details.component.scss']
})
export class ToggleDetailsComponent implements OnChanges {

  @Input() index;

  count: number;
  control;
  isDetail: boolean = false;
  toggleRequired = [];

  toggleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.toggleForm = this.fb.group({
      label: [null, Validators.required],
      toggleArray: this.fb.array([])
    });
  }

  ngOnChanges() {
    if (this.index !== undefined) {
      this.toggleForm.patchValue({
        label: this.builderService.canvasFormControls.details[this.index].label,
        toggleArray: []
      });
      this.getDetailForm();
    }
  }

  getDetailForm() {
    this.control = <FormArray>this.toggleForm.controls.toggleArray;
    this.control.clear();
    this.builderService.canvasFormControls.details[this.index].toggleArray
        .forEach(element => {
      this.control.push(this.fb.group({ 
        label: element.label, 
        required: element.required,
        labelPosition: element.labelPosition,
        error: element.error
      }));
      if (element.required === true)
        this.toggleRequired.push(true);
      else
        this.toggleRequired.push(false);
    });
    this.isDetail = true;
  }

  add() {
    if (this.builderService.canvasFormControls.details[this.index].toggleArray) {
      this.count = this.builderService.canvasFormControls.details[this.index].toggleArray.length;
      this.count = this.count + 1;
    }
    else this.count = 1;
      this.builderService.canvasFormControls.details[this.index].toggleArray.push({
        label: "Toggle " + this.count,
        required: true,
        labelPosition: "after"
      });
    this.getDetailForm();
  }

  delete(index) {
    this.builderService.canvasFormControls.details[this.index].toggleArray.splice(index,1);
    this.getDetailForm();
  }

  deleteControl() {
    this.builderService.deleteControl(this.index);
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.toggleForm.get('label').value;
  }

  setToggleLabel(index) {
    this.builderService.canvasFormControls.details[this.index].toggleArray[index].label
        = this.toggleForm['controls'].toggles['controls'][index].get('label').value;
  }

  setRequired(value,index) {
    if (value === true)
      this.toggleRequired[index] = true;
    else
      this.toggleRequired[index] = false;
      this.builderService.canvasFormControls.details[this.index].toggleArray[index].required
          = this.toggleForm['controls'].toggles['controls'][index].get('required').value;
  }

  setLabelPosition(index) {
    this.builderService.canvasFormControls.details[this.index].labelPosition
        = this.toggleForm['controls'].toggles['controls'][index].get('labelPosition').value;
  }

}


