import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormControl, FormGroup, Validators } 
from "@angular/forms";

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  hide = true;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ResetpasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.passwordForm = this.fb.group({
        password:    ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  resetPassword() {
    const obj = this.passwordForm.value;
    obj["email"] = this.data.email;
    this.authService.resetPassword(obj).subscribe(res => {
      this.dialogRef.close();
    });  
  }

}
