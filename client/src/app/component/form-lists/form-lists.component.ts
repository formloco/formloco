import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { BuilderService } from "../../service/builder.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service";
import { TransformStructureService } from "../../service/transform-structure.service";

import { MessageComponent } from '../dialogs/message/message.component';

import { LookupList } from '../../model/connector';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.component.html',
  styleUrls: ['./form-lists.component.scss']
})
export class FormListsComponent implements OnInit {

  @Output() openRun = new EventEmitter<boolean>();
  @Output() openForm = new EventEmitter<any>();
  @Output() openShare = new EventEmitter<boolean>();

  isLookupOpen = false;
  fileArray = [];

  lookupList = LookupList;

  lookupListForm: FormGroup;

  pinKeySecret = environment.pinKeySecret;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService,
    private transformStructureService: TransformStructureService) {
    this.lookupListForm = this.formBuilder.group({
      lookupListName: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  createLookuplist() {
    this.lookupList.form.name = this.lookupListForm.get('lookupListName').value;
    this.builderService.canvasFormControls = this.lookupList.form;
    let obj = this.transformStructureService.generateSQLStructure('list');
    this.builderService.canvasFormControls["labels"] = obj.labels;
    this.builderService.canvasFormControls["columns"] = obj.columns;

    let userCreated = { email: 'polly@formloco.com', date_created: new Date() }

    let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);

    let pin = CryptoJS.AES.encrypt(JSON.stringify(sixdigitsrandom + 'true'), this.pinKeySecret).toString();

    let idbForm = ({
      form: this.lookupList.form,
      form_id: uuid.v4(),
      pin: pin,
      columns: obj.columns,
      date_created: new Date(),
      date_archived: undefined,
      date_last_access: new Date(),
      user_created: userCreated,
      user_archived: null,
      is_data: false,
      is_published: true
    });
    this.idbCrudService.put('form', idbForm).subscribe(id => {
      this.fileArray = [];
      this.closeOverlay();
      this.lookupListForm.reset();
      this.appService.getForms();
    });
  }

  run(formObj) {
    this.appService.isMainMenu = false;
    this.builderService.fileArray = [];
    this.appService.isData = formObj.is_data;
    this.builderService.formObj = formObj;
    this.builderService.controlArray = formObj.form.controls;
    this.builderService.detailArray = formObj.form.details;
    this.openRun.emit();
  }

  closeOverlay() {
    this.isLookupOpen = false;
  }

}
