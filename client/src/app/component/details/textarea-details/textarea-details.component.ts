import { Component, Input, OnChanges } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { Appearances, Types } from "../../../model/textbox";

import { AppService } from "../../../service/app.service";
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-textarea-details',
  templateUrl: './textarea-details.component.html',
  styleUrls: ['./textarea-details.component.scss']
})
export class TextareaDetailsComponent implements OnChanges {

  @Input() index;

  textareaForm: FormGroup;

  appearances = Appearances;
  types = Types;
  textareaRequired: boolean;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.textareaForm = this.fb.group({
      appearance:   [null, Validators.required],
      error:        [null, Validators.required],
      label:        [null, Validators.required],
      placeholder:  [null, Validators.required],
      required:     [null, Validators.required],
      types:        [null, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.index !== undefined) {
      this.textareaForm.patchValue({
        appearance: this.builderService.canvasFormControls.details[this.index].appearance,
        error: this.builderService.canvasFormControls.details[this.index].error,
        label: this.builderService.canvasFormControls.details[this.index].label,
        placeholder: this.builderService.canvasFormControls.details[this.index].placeholder,
        required: this.builderService.canvasFormControls.details[this.index].required,
        types: this.builderService.canvasFormControls.details[this.index].types
      });
      if (this.builderService.canvasFormControls.details[this.index].required === "true")
        this.textareaRequired = true;
      else
        this.textareaRequired = false;
    }
  }

  setAppearance() {
    this.builderService.canvasFormControls.details[this.index].appearance 
        = this.textareaForm.get('appearance').value;
  }

  setTypes() {
    this.builderService.canvasFormControls.details[this.index].types 
        = this.textareaForm.get('types').value;
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label 
        = this.textareaForm.get('label').value;
  }

  setPlaceholder() {
    this.builderService.canvasFormControls.details[this.index].placeholder 
        = this.textareaForm.get('placeholder').value;
  }

  setError() {
    this.builderService.canvasFormControls.details[this.index].error 
        = this.textareaForm.get('error').value;
  }

  setRequired(value) {
    if (value === true)
      this.textareaRequired = true;
    else
      this.textareaRequired = false;
      this.builderService.canvasFormControls.details[this.index].required = this.textareaRequired;
  }

  deleteControl() {
    this.builderService.deleteControl(this.index);
  }

}