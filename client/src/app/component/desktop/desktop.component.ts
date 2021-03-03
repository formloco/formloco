import { Component, OnChanges, Input, HostBinding } from '@angular/core';

import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

import { FormControl, Validators, FormGroup, FormBuilder  } from "@angular/forms";
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay'

import { ImportComponent } from '../dialogs/import/import.component';
import { MessageComponent } from '../dialogs/message/message.component';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { FormService } from "../../service/form.service";
import { SyncService } from "../../service/sync.service";
import { BuilderService } from "../../service/builder.service";
import { SuccessService } from "../../service/success.service";
import { TransformStructureService } from "../../service/transform-structure.service";

import { IdbCrudService } from "../../service-idb/idb-crud.service";
import { environment } from '../../../environments/environment';

import { LookupList } from '../../model/connector';


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnChanges {

  @Input() formObj;
  @Input() isDarkMode;

  @HostBinding('class') className = 'darkMode'

  user
  userName

  prefs
  isForm;
  isControls = true;
  canvasBackground = '#3b3b3b'

  pageTitle;
  menuSelect;
  
  fileArray = [];
  isError = false;
  isNotFile = true;
  isImportOpen = false;
  
  pinKeySecret = environment.pinKeySecret;
  myInnerHeight = window.innerHeight;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public appService: AppService,
    private authService: AuthService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private syncService: SyncService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService,
    private overlayContainer: OverlayContainer,
    private transformStructureService: TransformStructureService) {}

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  ngOnChanges(): void {
    this.user = this.authService.userSignedIn();
    console.log(this.user)
    if (this.user && this.user !== null) {
      if (this.user.first_name !== null && this.user.last_name !== null)
        this.userName = this.user.first_name + ' ' + this.user.last_name;
      else
        this.userName = this.user.email;

      this.appService.authProvider = localStorage.getItem('authProvider');
    }
    this.appService.getForms();
    if (this.isDarkMode) this.canvasBackground = '#3b3b3b'
    else this.canvasBackground = '#ffffff'

    this.builderService.showControls = true;
    if (this.formObj === undefined) {
      this.appService.page = 'form-library';
      this.appService.pageTitle = 'Form Library';
    }
    else this.appService.page = 'design';
  }

  setPage(page) {
    if (page === 'launch-forms') {
      this.appService.pageTitle = 'Launch Forms';
    }
    if (page === 'form-library') {
      this.appService.pageTitle = 'Form Library';
    }
    if (page === 'data-cards') {
      this.appService.pageTitle = 'Form Data';
    }
    if (page === 'share-all') {
      this.builderService.formObj = undefined;
      this.appService.pageTitle = 'Share All Published Forms';
    }
    if (page === 'template') {
      this.appService.pageTitle = 'Template Library';
    }
    if (page === 'connector') {
      this.builderService.showControls = true;
      this.appService.isMainMenu = false;
    }
    if (page === 'design') {
      this.builderService.formObj = undefined;
      this.builderService.isDetails = undefined;
      this.builderService.currentIndex = undefined;
      this.builderService.controlArray = [];
      this.builderService.detailArray = [];
      this.builderService.canvasFormControls = [];
      this.builderService.isFileUploadDisabled = false;
      this.appService.isMainMenu = false;
    }
    this.appService.page = page;
  }

  toggleTheme() {

    let darkClassName = '';

    if (this.appService.isDarkMode) darkClassName = '';
    else darkClassName = 'darkMode';

    this.setMode(darkClassName)

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj);

  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : '';

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName);
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode');
  }


  toggleMainMenu() {
    this.appService.isMainMenu = !this.appService.isMainMenu;
  }

  openLists() {
    this.builderService.isDetails = false;
    this.builderService.isLookuplist = true;
    this.builderService.isRightMenu = !this.builderService.isRightMenu;
  }
  
  openRun() {
    this.appService.page = 'run';
    this.appService.isAnonymous = false;
    this.appService.pageTitle = 'Form Launched';
  }

  openData() {
    this.appService.page = 'data-cards';
    this.appService.pageTitle = 'Form Data';
  }

  openForm(value) {
    this.appService.page = 'design';
    this.appService.pageTitle = 'Edit Form';
    
    if (value === 'new') this.appService.pageTitle = 'Create Form';
    else {
      if (this.builderService.formObj.is_data) this.builderService.showControls = false;
      if (!this.builderService.formObj.is_data) this.builderService.showControls = true;
    }
  }

  openShare() {
    this.appService.page = 'share';
    this.appService.pageTitle = 'Share Form';
  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(ImportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }

  import() {
    this.fileArray.forEach(element => {
      if (element.type === 'application/json') {
       
        let formObj = JSON.parse(atob(element.content.slice(29)))
        
        if (formObj.form.details.length === formObj.form.controls.length) {
          this.builderService.canvasFormControls = formObj.form;
  
          let obj = this.transformStructureService.generateSQLStructure('data'); 
          this.builderService.canvasFormControls["labels"] = obj.labels;
          this.builderService.canvasFormControls["columns"] = obj.columns;
  
          let userCreated = { email: 'polly@formloco.com', date_created: new Date() }
  
          let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
  
          let pin = CryptoJS.AES.encrypt(JSON.stringify(sixdigitsrandom + 'true'), this.pinKeySecret).toString();
  
          let idbForm = ({
            form: this.builderService.canvasFormControls,
            form_id: uuid.v4(),
            pin: pin,
            date_created: new Date(),
            date_archived: undefined,
            date_last_access: new Date(),
            user_created: userCreated,
            user_archived: null,
            is_data: false,
            is_published: false
          });
          
          this.idbCrudService.put('form', idbForm).subscribe(id => {
            this.fileArray = [];
            this.isImportOpen = false;
            let user = this.authService.userSignedIn();
            if (user !== null) {
              idbForm["tenant_id"] = user.tenant_id;
              idbForm["form_columns"] = formObj.form.columns;
              this.syncService.syncImport(idbForm).subscribe(res => {
                let response = res;
                if (response["message"] === 'Data synchronized.') {
                  this.successService.popSnackbar(response["message"]);
                  this.idbCrudService.clear('data').subscribe();
                }
              });
            }
            this.appService.getForms();
          });         
        }
        else this.isError = true;
      }
    });
  }

  restore(form) {
    let user = this.authService.userSignedIn();
    form["date_archived"] = null;
    form["user_archived"] = null;
    if (user !== null) this.formService.update(form).subscribe();
    this.idbCrudService.put('form', form).subscribe();
    this.appService.getForms();
  }

  close() {
    if (this.appService.parentPage === 'form-library') this.appService.pageTitle = 'Form Libary'
    if (this.appService.parentPage === 'data-cards') this.appService.pageTitle = 'Form Data'
    this.appService.page = this.appService.parentPage;
  }

  closeOverlay() {
    this.isImportOpen = false;
  }

  onSelect(event) {
    this.isNotFile = false;
    this.fileArray.push(...event.addedFiles);
    this.fileArray.forEach(element => {
      this.readFile(element).then(fileContents => {
        element.content = fileContents;
      });
    });
  }

  onFilesRejected(files: File[]) {
    this.snackBar.open('Your file is too big, must be 20k or less.', "Error:",
      { duration: 5000 })
  }

  onRemove(event) {
    this.builderService.fileArray.splice(this.builderService.fileArray.indexOf(event), 1);
  }

}
