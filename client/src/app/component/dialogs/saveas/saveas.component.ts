import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormControl, FormGroup, Validators }
  from "@angular/forms";

import * as uuid from 'uuid';

import { AuthService } from "../../../service/auth.service";
import { FormService } from "../../../service/form.service";
import { BuilderService } from "../../../service/builder.service";
import { SuccessService } from "../../../service/success.service";
import { IdbCrudService } from "../../../service-idb/idb-crud.service";
import { TransformStructureService } from "../../../service/transform-structure.service";

@Component({
  selector: 'app-saveas',
  templateUrl: './saveas.component.html',
  styleUrls: ['./saveas.component.scss']
})
export class SaveasComponent {

  obj;
  msg;
  token;
  saveasForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SaveasComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private formService: FormService,
    public builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    private transformStructureService: TransformStructureService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.saveasForm = this.fb.group({
      name: [this.data.name, Validators.required]
    });
  }

  save() {
    let user = this.authService.userSignedIn();
    let obj = this.transformStructureService.generateSQLStructure('data');

    this.builderService.canvasFormControls["labels"] = obj.labels;
    this.builderService.canvasFormControls["columns"] = obj.columns;
    
    this.builderService.canvasFormControls["name"] = this.saveasForm.controls['name'].value;
    let idbForm = ({
      form: this.builderService.canvasFormControls,
      form_id: uuid.v4(),
      date_created: new Date(),
      date_archived: undefined,
      date_last_access: new Date(),
      user_created: 1,
      user_archived: null,
      is_data: false,
      is_published: false
    });
    this.idbCrudService.put('form', idbForm).subscribe(id => {
      this.builderService.controlArray = idbForm.form.controls;
      this.builderService.detailArray = idbForm.form.details;
      this.builderService.formObj = idbForm;
    });
    this.dialogRef.close(true);
  }

}

