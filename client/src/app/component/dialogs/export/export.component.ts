import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormControl, FormGroup, Validators } 
from "@angular/forms";

import { saveAs } from 'file-saver';

import { SuccessService } from "../../../service/success.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {

  obj;
  exportForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ExportComponent>,
    private fb: FormBuilder,
    private successService: SuccessService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.exportForm = this.fb.group({
        name: [this.data.form.form.name, Validators.required]
      });
    }

  export() {
    const formValue = this.exportForm.value;
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.data.data[0]);
    let csv = this.data.data.map(row => 
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, formValue.name);
    this.dialogRef.close();
  }

}
