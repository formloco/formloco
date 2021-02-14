import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { AuthService } from "../../../service/auth.service";
import { FormService } from "../../../service/form.service";
import { IdbCrudService } from "../../../service-idb/idb-crud.service";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  user;
  form;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private idbCrudService: IdbCrudService,
    public dialogRef: MatDialogRef<ArchiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.user = this.authService.userSignedIn();
    }

  archive() {
    this.data.form["date_archived"] = new Date();
    let user = this.authService.userSignedIn();

    if (user !== null) {
      this.data.form["user_archived"] = {email: this.user.email,date_created: new Date()};
      this.formService.update(this.data.form).subscribe(res => {
        
      });
    }
    else {
      let userCreated = {email: 'polly@formloco.com',date_created: new Date()}
    }
    this.idbCrudService.put('form',this.data.form).subscribe();
    this.dialogRef.close(true);
  }

}
