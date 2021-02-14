import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { IdbCrudService } from "../service-idb/idb-crud.service";
import { AppService } from "../service/app.service";
import { AuthService } from "../service/auth.service";

import { ExportComponent } from '../component/dialogs/export/export.component';
import { MessageComponent } from '../component/dialogs/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  idbData;

  public formId; //current form id saving, opening
  public formObj; // form controls and details
  public isDetails = false;
  public isListOpen = false;
  public isRightMenu = false;
  public isLookuplist = false;
  /** 
   * showControls - designer control menu is hidden when is_data = true
   * delete buttons on form controls are removed
  */
  public showControls = true; // 
  public isPreview = false;

  // drag'n drop
  public controls
  public event; //captures drag'n drop event
  public currentIndex: number; //current index for details and drag n drop
  public previousIndex: number;
  public canvasFormControls; //current form controls
  public isExpandDetails: boolean;

  public isFileUploadDisabled = false;
  public isFileUploadRunning = false;

  // run form
  public detailArray = [];
  public controlArray = [];
  public fileArray = []; //used to hold file content for attach files

  // integration
  public apiControlArray;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService) { }

  selectDetails(index) {
    this.currentIndex = index;
    this.isRightMenu = true;
    this.isDetails = true;
    this.isLookuplist = false;
    this.isExpandDetails = false;
  }

  selectControlDetails(index) {
    this.currentIndex = index;
    this.isRightMenu = true;
    this.isDetails = true;
    this.isLookuplist = false;
    this.isExpandDetails = false;
    if (this.canvasFormControls.details[index].list !== 'none') this.getList(index)
  }

  getList(index) {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.idbData = data;
      if (this.idbData.length > 0) {
        let list = this.idbData.filter(
          data => data.form_id === this.canvasFormControls.details[index].list.form_id
        );
        this.canvasFormControls.details[index].selectArray = list[0].data;
      }
    });
  }

  selectDetailsExpanded(index) {
    this.currentIndex = index;
    this.isRightMenu = true;
    this.isDetails = true;
    this.isLookuplist = false;
    this.isExpandDetails = true;
  }

  toggleDetails(index) {
    this.currentIndex = index;
    this.isDetails = !this.isDetails;
  }

  deleteDetails() {
    this.deleteControl(this.currentIndex)
  }

  updateDetail(control, index) {
    this.canvasFormControls.controls[index] = control;
  }

  deleteControl(idx) {

    if (this.canvasFormControls.controls[idx].type !== 'Connector') {
      let controlIdx = this.controls.findIndex(control => control.type === this.canvasFormControls.controls[idx].type);
      this.controls[controlIdx]["disabled"] = false;
    }
    else {
      let controlIdx = this.controls.findIndex(control => control.label === this.canvasFormControls.controls[idx].label);
      this.controls[controlIdx]["disabled"] = false;
    }
    
    this.canvasFormControls.controls.splice(idx, 1);
    this.canvasFormControls.details.splice(idx, 1);

    if (this.canvasFormControls.length === 0)
      this.currentIndex = undefined;
    else
      this.currentIndex = 0;

    this.isDetails = false;
    this.isExpandDetails = false;

    if (this.formId)
      this.idbCrudService.read('form', this.formId).subscribe(form => {
        this.formObj = form;
        this.formObj.form = this.canvasFormControls;
        this.formObj.date_last_access = new Date();
        this.idbCrudService.delete('form', this.formObj).subscribe();
      });
      
    // used for array on details for select and multi select
    this.appService.apiLists = [];
    this.canvasFormControls.details.forEach(detail => {
      if (detail.type === 'Connector') {
        detail.lists.forEach(listItem => {
          if (listItem.selected) {
            listItem["src"] = detail.src;
            this.appService.apiLists.push(listItem);
          }
        });
      }
    });

  }

  exportData(formObj) {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.idbData = data;
      if (this.idbData.length > 0) {
        this.idbData = this.idbData.filter(
          data => data.form_id === this.formId
        );
        if (this.idbData.length > 0) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '450px';
          dialogConfig.data = {
            form: formObj,
            data: this.idbData
          };
          const dialogRef = this.dialog.open(ExportComponent, dialogConfig);
        }
        else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '450px';
          dialogConfig.data = {
            title: 'No Data to Export',
            message: 'No data to export for this form.'
          };
          const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            return;
          });
        }
      }
    });
  }


}
