import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { FormService } from "../../service/form.service";
import { DataService } from "../../service/data.service";
import { SyncService } from "../../service/sync.service";
import { BuilderService } from "../../service/builder.service";
import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { PinComponent } from '../dialogs/pin/pin.component';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  params: Params;
  id;
  pin;
  data;
  token;
  tenant_id;
  formObj;

  isRun = false;

  pinKeySecret = environment.pinKeySecret;

  constructor(
    // private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService,
    private formService: FormService,
    private syncService: SyncService,
    private dataService: DataService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.authService.token().subscribe(token => {
        this.token = token;
        localStorage.setItem('formToken', this.token.token);
        this.run(params['form_id'], params['tenant_id'])
      });
    });
  }

  run(form_id, tenant_id) {
    this.formService.getForm(form_id, tenant_id).subscribe(obj => {
      this.formObj = obj;
      this.appService.isAnonymous = true;
      this.builderService.formObj = this.formObj;
      this.builderService.detailArray = this.formObj.form.details;
      this.builderService.controlArray = this.formObj.form.controls;
console.log(this.formObj)
      const bytes = CryptoJS.AES.decrypt(this.formObj["pin"], this.pinKeySecret);
      if (bytes.toString()) {
        let pinAndUse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log(pinAndUse)
        this.pin = pinAndUse.substring(0, 6);
        let isPin = pinAndUse.substring(6).trim();

        if (isPin === 'true') this.popPINDialog();
        else this.isRun = true;
      }

      let lists = [];
      this.builderService.detailArray.forEach(element => {
        if (element.type === 'Select') {
          if (element.list !== 'none') {
            lists.push({
              form_id: element.list["form_id"],
              tenant_id: element.list["tenant_id"]
            });
          }
        }
      });
      if (lists.length > 0)
        this.syncService.syncDataListForm(lists).subscribe(data => {
          this.data = data;
        });
    });
  }

  popPINDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minHeight = window.innerHeight;
    dialogConfig.minWidth = window.innerWidth;
    dialogConfig.data = {
      pin: this.pin
    };
    const dialogRef = this.dialog.open(PinComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.isRun = true;
    });
  }

}