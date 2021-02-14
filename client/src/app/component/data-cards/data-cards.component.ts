import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { MessageComponent } from '../dialogs/message/message.component';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { BuilderService } from "../../service/builder.service";

import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-data-cards',
  templateUrl: './data-cards.component.html',
  styleUrls: ['./data-cards.component.scss']
})
export class DataCardsComponent implements OnInit {

  swaggerUrl = environment.swaggerUrl;

  constructor(
    public appService: AppService,
    public builderService: BuilderService,
    private dialog: MatDialog,
    private authService: AuthService,
    private dataService: DataService,
    private idbCrudService: IdbCrudService) { 
      this.appService.parentPage = 'data-cards';
    }

  ngOnInit(): void {
    this.appService.getForms();
  }

  openData(formObj) {
    if (formObj.is_data === false) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.data = {
        title: 'Data',
        message: 'There is no data for this form yet.'
      };
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
    }
    else {
      let user = this.authService.userSignedIn();
      if (formObj.is_data === true)
        if (user !== null) {
          this.appService.pageTitle = formObj.form.name;
          this.builderService.formObj = formObj;
          this.appService.page = 'data';
        }
        else
          this.dataService.openIdbData(formObj);
    }
  }

  exportData(formObj) {
    let user = this.authService.userSignedIn();
    if (user !== null) 
      this.builderService.exportData(formObj);
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.data = {
        title: 'Share Form',
        message: 'Please sign in to export data.'
      };
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
    }
  }

  importData(formObj) {
    let user = this.authService.userSignedIn()
    if (user !== null) 
      this.builderService.formObj = formObj;
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.data = {
        title: 'Import Data',
        message: 'Please sign in to import data.'
      };
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
    }
  }

  api(formObj) {
    let user = this.authService.userSignedIn()
    if (user !== null) 
      window.open(this.swaggerUrl+localStorage.getItem('formToken')+'/'+user.tenant_id+'/', '_blank');
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.data = {
        title: 'API',
        message: 'Please sign in to access API.'
      };
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
    }
  }

}
