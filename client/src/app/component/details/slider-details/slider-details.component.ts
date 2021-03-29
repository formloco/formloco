import { Component, Input, OnChanges } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-slider-details',
  templateUrl: './slider-details.component.html',
  styleUrls: ['./slider-details.component.scss']
})
export class SliderDetailsComponent implements OnChanges {

  @Input() index

  sliderForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService) {
    this.sliderForm = this.fb.group({
      label:      [null, Validators.required],
      value:      [null, Validators.required],
      min:        [null, Validators.required],
      max:        [null, Validators.required],
      step:       [null, Validators.required],
      interval:   [null, Validators.required],
      thumbLabel: [null],
      invert:     [null]
    })
  }

  ngOnChanges() {
    if (this.index !== undefined) {
      this.sliderForm.patchValue({
        label: this.builderService.canvasFormControls.details[this.index].label,
        value: this.builderService.canvasFormControls.details[this.index].value,
        min: this.builderService.canvasFormControls.details[this.index].min,
        max: this.builderService.canvasFormControls.details[this.index].max,
        step: this.builderService.canvasFormControls.details[this.index].step,
        interval: this.builderService.canvasFormControls.details[this.index].interval,
        thumbLabel: this.builderService.canvasFormControls.details[this.index].thumbLabel,
        invert: this.builderService.canvasFormControls.details[this.index].invert
      })
    }
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.sliderForm.get('label').value
  }

  setValue() {
    this.builderService.canvasFormControls.details[this.index].value = this.sliderForm.get('value').value    
  }

  setMin() {
    this.builderService.canvasFormControls.details[this.index].min = this.sliderForm.get('min').value    
  }

  setMax() {
    this.builderService.canvasFormControls.details[this.index].max = this.sliderForm.get('max').value    
  }

  setStep() {
    this.builderService.canvasFormControls.details[this.index].step = this.sliderForm.get('step').value    
  }

  setInterval() {
    this.builderService.canvasFormControls.details[this.index].interval = this.sliderForm.get('interval').value    
  }

  setThumb() {
    this.builderService.canvasFormControls.details[this.index].label = this.sliderForm.get('label').value    
  }

  setInvert() {
    this.builderService.canvasFormControls.details[this.index].invert = this.sliderForm.get('invert').value    
  }

  deleteControl() {
    this.builderService.deleteControl(this.index)
  }

}
