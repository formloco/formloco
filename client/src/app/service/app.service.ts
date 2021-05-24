import { Injectable } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { FormService } from "../service/form.service"
import { AuthService } from "../service/auth.service"
import { ShareService } from "../service/share.service"
import { SuccessService } from "../service/success.service"
import { IdbCrudService } from "../service-idb/idb-crud.service"

import { SyncService } from "../service/sync.service"
import { MessageComponent } from '../component/dialogs/message/message.component'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  idbData
  shares

  public canvasBackground = '#ffffff'
  public isDarkMode = true
  public isPhone
  public isTablet
  public isDesktop
  public isLookupList = false
  public page
  public parentPage
  public pageTitle
  public isMainMenu = true

  public forms
  public refresh
  public libraryList
  public apiLists = []
  public lookupLists
  public archives = []
  public isWelcomeMessage: boolean

  public isData: boolean //if data exists for certain form, 

  public isAnonymous: boolean //used to delete anonymous form token

  public tenant
  public members
  public authProvider
  public forgotPasswordEmail: String

  constructor(
    private dialog: MatDialog,
    private syncService: SyncService,
    private formService: FormService,
    private authService: AuthService,
    private shareService: ShareService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) { }

  getForms() {
    this.apiLists = []
    this.archives = []
    this.lookupLists = []
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.forms = forms
      this.idbCrudService.readAll('share').subscribe(shares => {
        this.forms = this.forms.concat(shares)
        this.forms.forEach((formObj, index) => {
          if (formObj.date_archived !== undefined && formObj.date_archived !== null) {
            this.archives.push(formObj)
            this.forms.splice(index, 1)
          }

          if (formObj.form.is_list) {
            let tenant_id = null
            if (formObj.tenant_id !== undefined) tenant_id = formObj.tenant_id

            this.apiLists.push({
              src: 'assets/logo/parrot.png',
              type: 'formloco',
              tenant_id: tenant_id,
              form_id: formObj.form_id,
              name: formObj.form.name
            })
            this.lookupLists.push(formObj)
          }
        })
        this.forms.unshift('New Form')
        
      })
    })
  }

  getAPIList(formObj) {
    formObj.form.details.forEach(element => {
      if (element.type === 'APIAction')
        element.lists.forEach(listItem => {
          if (listItem.selected) {
            listItem["src"] = element.src
            this.apiLists.push(listItem)
          }
        })
    })
  }

  publish(formObj, event) {
    let user = this.authService.userSignedIn()
    if (user !== null) {
      formObj["tenant_id"] = user.tenant_id
      formObj["is_published"] = event.checked
      formObj["user_updated"] = { email: user.email, first_name: user.first_name, last_name: user.last_name }
      this.idbCrudService.put('form', formObj)
      this.shareService.publishShare(formObj).subscribe(msg => {
        this.successService.popSnackbar(msg)
      })
    }
    else {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'Publish',
        message: 'Please sign in to publish or un-publish your form.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(data => {
        this.getForms()
      })
    }
  }

}
