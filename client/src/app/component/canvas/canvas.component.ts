import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { Observable } from 'rxjs'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import * as uuid from 'uuid'

import { SaveasComponent } from '../dialogs/saveas/saveas.component'
// import { ArchiveComponent } from '../dialogs/archive/archive.component'

// import { MessageComponent } from '../dialogs/message/message.component'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { FormService } from "../../service/form.service"
import { ErrorService } from "../../service/error.service"
import { BuilderService } from "../../service/builder.service"
import { SuccessService } from "../../service/success.service"
import { FormAdminService } from "../../service/form-admin.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { BuilderControlService } from "../../service/builder-control.service"
import { IdbPersistenceService } from "../../service-idb/idb-persistence.service"
import { TransformStructureService } from "../../service/transform-structure.service"

import { environment } from '../../../environments/environment'

import * as CryptoJS from 'crypto-js'

import { saveAs } from 'file-saver'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnChanges {

  @Input() canvasFormControl
  @Input() dropForm

  canvasForm: FormGroup
  myInnerHeight = window.innerHeight

  id
  pin
  obj
  user
  data
  form
  forms
  token
  formObj = {}

  response
  navigation
  unsavedform
  control
  currentIndex

  isEmbeddedCode = false
  panelOpenState = false
  sharingLink
  embeddedCode

  linkUrl = environment.linkUrl
  pinKeySecret = environment.pinKeySecret

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private formService: FormService,
    private errorService: ErrorService,
    public builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    private formAdminService: FormAdminService,
    private builderControlService: BuilderControlService,
    private idbPersistenceService: IdbPersistenceService,
    private transformStructureService: TransformStructureService) {
    this.canvasForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnChanges() {
    if (this.builderService.formObj) {
      this.canvasForm.patchValue({
        name: this.builderService.formObj.form.name
      })
      this.canvasFormControl = this.builderService.formObj.form
      this.dropForm[1] = this.canvasFormControl.name
      this.isEmbeddedCode = true
      this.embeddedCode = '<iframe style="border-width:0px" width="100%" height="400" src="https://form369.formloco.com/form?form_id="' + this.builderService.formObj.form_id + '&tenant_id=' + this.builderService.formObj.form_id + '></iframe>'
    }

  }

  drop(event: CdkDragDrop<string[]>) {

    this.builderService.canvasFormControls = this.canvasFormControl

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
      this.updateShadowMove(event)
    }
    else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      this.builderService.event = event
      this.builderService.currentIndex = event.currentIndex
      this.builderService.previousIndex = event.previousIndex
      this.builderControlService.updateDetail(event.container.data, event.currentIndex)
    }
  }

  updateShadowMove(event) {
    let detailArray = this.builderService.canvasFormControls.details.splice(event.previousIndex, 1)
    let detailObj = detailArray[0]
    this.builderService.canvasFormControls.details.splice(event.currentIndex, 0, detailObj)
  }

  toggleDragDisable() {
    this.builderService.isDrag = true

  }

  selectControl(index) {
    this.builderService.currentIndex = index
  }

  saveas() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '450px'
    dialogConfig.data = {
      name: this.canvasForm.get('name').value
    }
    const dialogRef = this.dialog.open(SaveasComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.builderService.currentIndex = 0
        this.canvasFormControl = this.builderService.formObj.form
        this.builderService.canvasFormControls = this.builderService.formObj.form
        this.canvasForm.patchValue({
          name: this.builderService.formObj.form.name
        })
        this.dropForm[1] = this.canvasFormControl.name
      }
    })
  }

  save(): void {
    this.user = this.authService.userSignedIn()
    let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000)

    this.pin = CryptoJS.AES.encrypt(JSON.stringify(sixdigitsrandom + 'true'), this.pinKeySecret).toString()

    this.builderService.canvasFormControls.name = this.canvasForm.controls['name'].value
    if (this.builderService.formObj === undefined)
      this.saveIdbForm()
    else {
      this.builderService.formObj 
      this.idbCrudService.read('form', this.builderService.formObj.id).subscribe(form => {
        this.form = form
        this.form["name"] = this.canvasForm.controls['name'].value
        this.form.form = this.builderService.canvasFormControls
        let obj = this.transformStructureService.generateSQLStructure('data')
        this.builderService.canvasFormControls["labels"] = obj.labels
        this.builderService.canvasFormControls["columns"] = obj.columns
        this.idbCrudService.put('form', this.form).subscribe()
        this.successService.popSnackbar('Successfully Saved')

        if (this.user !== null) {
          this.builderService.formObj["tenant_id"] = this.user.tenant_id
          this.formService.update(this.builderService.formObj).subscribe(res => { })
        }
      })
    }
  }

  savePreview(): void {
    this.builderService.canvasFormControls.name = this.canvasForm.controls['name'].value
    this.saveIdbForm()
    this.router.navigate([''])
  }

  saveIdbForm() {
    let obj = this.transformStructureService.generateSQLStructure('data')

    this.builderService.canvasFormControls["labels"] = obj.labels
    this.builderService.canvasFormControls["columns"] = obj.columns

    let userCreated = { email: 'polly@formloco.com', date_created: new Date() }
    let tenantID = null
    if (this.user != null) {
      tenantID = this.user.tenant_id
      userCreated = { email: this.user.email, date_created: new Date() }
    }

    this.builderService.canvasFormControls.pin = this.pin
    let idbForm = ({
      form: this.builderService.canvasFormControls,
      form_id: uuid.v4(),
      name: this.canvasForm.controls['name'].value,
      tenant_id: tenantID,
      date_created: new Date(),
      date_archived: undefined,
      date_last_access: new Date(),
      user_created: userCreated,
      user_archived: null,
      is_data: false,
      is_list: false,
      is_published: false,
      type: 'dynamic'
    })

    this.idbCrudService.put('form', idbForm).subscribe(id => {
      this.builderService.formObj = idbForm
      this.builderService.formObj["id"] = id
      this.builderService.detailArray = idbForm.form.details
      this.builderService.controlArray = idbForm.form.controls
    })
    this.successService.popSnackbar('Successfully Saved')

    if (this.user !== null) this.formService.create(idbForm).subscribe(res => { })

  }

  run() {
    this.appService.page = 'run'
    this.appService.pageTitle = ''
    this.appService.isAnonymous = false
    this.appService.parentPage = 'form-library'
    this.builderService.controlArray = this.canvasFormControl.controls
    this.builderService.detailArray = this.canvasFormControl.details
  }

  close() {
    this.appService.getForms()
    this.appService.page = this.appService.parentPage
  }

}
