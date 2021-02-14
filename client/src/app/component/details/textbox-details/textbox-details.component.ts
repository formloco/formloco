import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl }
from '@angular/forms';

import { Appearances, Types } from "../../../model/textbox";

import { AppService } from "../../../service/app.service";
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-textbox-details',
  templateUrl: './textbox-details.component.html',
  styleUrls: ['./textbox-details.component.scss']
})
export class TextboxDetailsComponent implements OnInit {

  @Input() index;

  canvasIndex: number;
  textboxForm: FormGroup;

  appearances = Appearances;
  types = Types;
  textboxRequired: boolean;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.textboxForm = this.fb.group({
      appearance: [null, Validators.required],
      error: [null, Validators.required],
      label: [null, Validators.required],
      placeholder: [null, Validators.required],
      required: [null, Validators.required],
      types: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.index !== undefined) {
      this.textboxForm.patchValue({
        appearance: this.builderService.canvasFormControls.details[this.index].appearance,
        error: this.builderService.canvasFormControls.details[this.index].error,
        label: this.builderService.canvasFormControls.details[this.index].label,
        placeholder: this.builderService.canvasFormControls.details[this.index].placeholder,
        required: this.builderService.canvasFormControls.details[this.index].required,
        types: this.builderService.canvasFormControls.details[this.index].types
      });
      if (this.builderService.canvasFormControls.details[this.index].required === true)
        this.textboxRequired = true;
      else
        this.textboxRequired = false;
    }
  }

  setAppearance() {
    this.builderService.canvasFormControls.details[this.index].appearance = this.textboxForm.get('appearance').value;  
  }

  setTypes() {
    this.builderService.canvasFormControls.details[this.index].types = this.textboxForm.get('types').value;
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.textboxForm.get('label').value;
  }

  setPlaceholder() {
    this.builderService.canvasFormControls.details[this.index].placeholder = this.textboxForm.get('placeholder').value;
  }

  setError() {
    this.builderService.canvasFormControls.details[this.index].error = this.textboxForm.get('error').value;
  }

  setRequired(value) {
    if (value === true)
      this.textboxRequired = true;
    else
      this.textboxRequired = false;
      
    this.builderService.canvasFormControls.details[this.index].required = this.textboxRequired;
  }

  deleteControl() {
    this.builderService.deleteControl(this.index);
  }

}
