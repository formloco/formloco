import { Component, OnChanges, ChangeDetectorRef, Output, Input, EventEmitter } from '@angular/core'

import * as CryptoJS from 'crypto-js'

import { MediaMatcher } from '@angular/cdk/layout'

import { MatSidenav } from '@angular/material/sidenav'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { MessageComponent } from '../dialogs/message/message.component'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { FormService } from "../../service/form.service"
import { UserService } from "../../service/user.service"
import { ShareService } from "../../service/share.service"
import { SuccessService } from "../../service/success.service"
import { BuilderService } from "../../service/builder.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { getLocaleDateFormat } from '@angular/common'

@Component({
  selector: 'app-form-library',
  templateUrl: './form-library.component.html',
  styleUrls: ['./form-library.component.scss']
})
export class FormLibraryComponent implements OnChanges {

  @Output() openRun = new EventEmitter<boolean>()
  @Output() openForm = new EventEmitter<any>()
  @Output() openShare = new EventEmitter<boolean>()

  obj
  user
  form
  forms
  token
  build
  idbData
  formObj
  tenant
  navigation
  isLinkSelect = false
  selectedIndex
  yAxis = 12
  xAxis = -46

  libraryList

  linkUrl = environment.linkUrl

  pin
  isPin
  pinKeySecret = environment.pinKeySecret

  mobileQuery: MediaQueryList

  private _mobileQueryListener: () => void

  constructor(
    media: MediaMatcher,
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private userService: UserService,
    private formService: FormService,
    private shareService: ShareService,
    public builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
    this.appService.parentPage = 'form-library'
  }

  ngOnChanges() {
    this.user = this.authService.userSignedIn()
    console.log(this.appService.forms)
  }

  newForm() {
    this.appService.isData = false
    this.appService.isMainMenu = false

    this.builderService.showControls = true
    this.builderService.formObj = undefined
    this.builderService.isDetails = undefined
    this.builderService.currentIndex = undefined
    this.builderService.isFileUploadDisabled = false
    this.builderService.fileArray = []
    this.builderService.detailArray = []
    this.builderService.canvasFormControls = []
    this.openForm.emit('new')
  }

  share(form) {
    let user = this.authService.userSignedIn()
    if (user !== null && form.is_published) {
      this.builderService.formObj = form
      this.openShare.emit()
    }
    else if (user !== null && !form.is_published) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'Share Form',
        message: 'Please publish your form first.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
    }
    else {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'Share Form',
        message: 'Please sign in to share your form.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
    }
  }

  publish(formObj, event) {
    this.appService.publish(formObj, event)
  }

  edit(formObj) {
    this.appService.isMainMenu = false
    this.appService.isData = formObj.is_data

    /** for canvas */
    this.builderService.currentIndex = 0
    this.builderService.formObj = formObj
    this.appService.getAPIList(formObj)
    this.builderService.canvasFormControls = formObj.form
    this.builderService.isPreview = false
    this.openForm.emit('edit') // runs on workspace component
  }

  run(formObj) {
    this.appService.isMainMenu = false
    this.builderService.fileArray = []
    this.appService.isData = formObj.is_data
    this.builderService.formObj = formObj
    this.builderService.controlArray = formObj.form.controls
    this.builderService.detailArray = formObj.form.details
    this.openRun.emit()
  }

  openData(formObj) {
    if (!formObj.is_data) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'Data',
        message: 'There is no data for this form yet.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(data => {
        this.appService.getForms()
      })
    }
    else {
      this.appService.pageTitle = formObj.form.name
      this.builderService.formObj = formObj
      this.appService.page = 'data'
    }
  }

  openLinkOverlay(formObj, index) {
    if (formObj.is_published === true) {
      this.selectedIndex = index
      const bytes = CryptoJS.AES.decrypt(formObj.form["pin"], this.pinKeySecret)
    
      if (bytes.toString()) {
        let pinAndUse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        this.pin = pinAndUse.substring(0,6)
        let pinStatus = pinAndUse.substring(6).trim()

        if (pinStatus === 'true') this.isPin = true
        else this.isPin = false
      }
      this.isLinkSelect = !this.isLinkSelect
    }
    else {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'Copy Link',
        message: 'The form must be published to use the link.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(data => {
        this.appService.getForms()
      })
    }
  }
  
  usePIN(formObj) {
    let pinStr
    if (this.isPin) pinStr =  this.pin + false 
    else pinStr =  this.pin + true

    formObj.form["pin"] = CryptoJS.AES.encrypt(JSON.stringify(pinStr), this.pinKeySecret).toString()
  
    if (formObj.is_share)
      this.idbCrudService.put('share', formObj)
    else
      this.idbCrudService.put('form', formObj)
      
    let user = this.authService.userSignedIn()
    if (user !== null) {
      formObj["user_updated"] = { email: user.email, first_name: user.first_name, last_name: user.last_name }
      this.formService.update(formObj).subscribe(form => {
        this.appService.getForms()
      })
    }
  }

  copyUrl(formObj: string) {
    let link = this.linkUrl+'link?form_id='+formObj["form_id"]+'&tenant_id='+formObj["tenant_id"]
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = link
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    this.successService.popSnackbar('URL copied to clipboard.')
  }

  closeOverlay() {
    this.isLinkSelect = false
  }

}
