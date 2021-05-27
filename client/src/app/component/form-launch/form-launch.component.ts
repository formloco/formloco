import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { MessageComponent } from '../dialogs/message/message.component'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { FormService } from "../../service/form.service"
import { BuilderService } from "../../service/builder.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-form-launch',
  templateUrl: './form-launch.component.html',
  styleUrls: ['./form-launch.component.scss']
})
export class FormLaunchComponent implements OnInit {

  data
  user
  forms
  idbData

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private formService: FormService,
    public idbCrudService: IdbCrudService,
    public builderService: BuilderService) { }

  ngOnInit(): void {
    this.idbCrudService.readAll('form').subscribe(data => {
      this.forms = data
      this.user = this.authService.userSignedIn()
      if (this.user !== null && this.user.share.length > 0)
        this.forms = this.forms.concat(this.user.share)
    })
  }

  openForm(formObj) {
    this.appService.parentPage = 'launch-forms'
    this.appService.isMainMenu = false
    this.appService.isData = formObj.is_data
    this.builderService.formObj = formObj
    this.builderService.controlArray = formObj.form.controls
    this.builderService.detailArray = formObj.form.details
    this.appService.page = 'run'
  }
  
}
