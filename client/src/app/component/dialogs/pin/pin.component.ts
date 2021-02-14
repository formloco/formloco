import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  pinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PinComponent>) { 
      this.pinForm = this.fb.group({
        pin: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  checkPIN() {
    if (this.data.pin == this.pinForm.controls['pin'].value)
      this.dialogRef.close();
  }

}
