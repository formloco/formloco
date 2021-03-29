import { Component, Input } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormControl }
from '@angular/forms'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-barcode-details',
  templateUrl: './barcode-details.component.html',
  styleUrls: ['./barcode-details.component.scss']
})
export class BarcodeDetailsComponent {

  @Input() index

  barcodeForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public builderService: BuilderService) {
    this.barcodeForm = this.fb.group({
      value: ''
    })
  }

  ngOnInit() {
    if (this.builderService.formObj !== undefined) {
      this.barcodeForm.patchValue({
        value: this.builderService.formObj.form.details[0].value
      })
    }
  }

  setValue() {
    this.builderService.canvasFormControls.details[this.index].value = this.barcodeForm.get('value').value  
  }

}