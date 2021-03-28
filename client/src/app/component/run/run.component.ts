import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import * as uuid from 'uuid';
import { isEmpty } from "lodash"

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AppService } from "../../service/app.service";
import { DataService } from "../../service/data.service";
import { AuthService } from "../../service/auth.service";
import { SyncService } from "../../service/sync.service";
import { BuilderService } from "../../service/builder.service";
import { SuccessService } from "../../service/success.service";
import { TransformRunService } from "../../service/transform-run.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  id;
  newform;
  user;
  data;
  forms;
  lists;
  formObj;
  fileArray;
  user_created;

  linkUrl = environment.linkUrl;

  runForm: FormGroup;

  constructor(
    media: MediaMatcher,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private syncService: SyncService,
    public builderService: BuilderService,
    public idbCrudService: IdbCrudService,
    private successService: SuccessService,
    private transformRunService: TransformRunService) {

    this.runForm = this.fb.group({});
  }

  ngOnInit() {
    this.lists = [];
    this.fileArray = [];
    
    this.user_created = 'polly@formloco.com'
    let tenantID = null;

    this.user = this.authService.userSignedIn();
    if (this.user != null) {
      tenantID = this.user.tenant_id
      this.user_created = this.user.email
    }
  }

  updateFileArray() {
    this.builderService.fileArray.forEach(element => {
      let obj = {
        name: element.name,
        content: JSON.stringify(element.content),
        type: element.type
      }
      this.fileArray.push(obj);
    })
  }

  save() {
    let data = this.runForm.value;

    data["user_created"] = this.user_created;
    data["date_archived"] = undefined;
    data["date_created"] = new Date();
    data["form_id"] = this.builderService.formObj.form_id;
    data["tenant_id"] = this.builderService.formObj.tenant_id;
    data["form_columns"] = this.builderService.formObj.form.columns;
    
    data["is_file"] = true;

    this.updateFileArray();
    
    // file array is attached to data obj for sync'ing upon login
    data["file_array"] = this.fileArray
    
    this.idbCrudService.put('data', data);

    this.builderService.formObj["is_data"] = true;

    this.idbCrudService.put('form', this.builderService.formObj);

    this.runForm.reset();
    this.builderService.isFileUploadRunning = false;
    this.successService.popSnackbar('Successfully Saved.');
  }

  saveCloud() {
    let data = {}
    this.builderService.isFileUploadRunning = true;
   
    data = this.transformRunService.parseDataCloud(this.runForm.value, this.builderService.formObj, this.user_created);

    let columns = this.transformRunService.parseColumns();

    this.updateFileArray();

    if (this.fileArray.length > 0) {
      let fileObj = {
        tenant_id: this.user.tenant_id,
        form_id: this.builderService.formObj.form_id,
        user_created: this.user_created,
        file_array: this.fileArray
      }
      this.dataService.saveFile(fileObj).subscribe(res => {
        this.fileArray = [];
      });
    }

    let obj = {
      data: data,
      columns: columns,
      user: this.user,
      is_file: true,
      formObj: this.builderService.formObj
    };
    console.log(obj)
    this.dataService.save(obj).subscribe(response => {
      this.newform = response;

      let store = 'form';
      // if is_share is undefined then form must be in share store
      if (this.builderService.formObj.is_share !== undefined) store = 'share';
      
      this.idbCrudService.readAll(store).subscribe(forms => {
        this.forms = forms;
        this.forms.forEach(form => {
          if (form.form_id === this.builderService.formObj.form_id) {
            form["is_data"] = true;
            form["is_file"] = true;
            form["tenant_id"] = this.newform["user"]["tenant_id"];
            this.idbCrudService.put(store, form);
          }
        });
      });
      this.successService.popSnackbar('Successfully Saved.');
      this.builderService.isFileUploadRunning = false;
      this.builderService.fileArray = [];
    });
  }

  delete() {
    this.idbCrudService.delete('form', this.builderService.formObj.id);
    if (this.user !== null) {
      this.syncService.syncListDeleteCloud(this.builderService.formObj).subscribe(res => {
        this.fileArray = [];
      });
    }
  }

  close() {
    if (this.appService.parentPage === undefined)
      window.location.href = this.linkUrl;
    else
      this.appService.page = this.appService.parentPage;
  }

}


