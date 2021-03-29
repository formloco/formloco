import { Component, OnInit } from '@angular/core'

import { TooltipPosition } from '@angular/material/tooltip'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { BuilderService } from "../../../service/builder.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

@Component({
  selector: 'app-phone-workspace',
  templateUrl: './phone-workspace.component.html',
  styleUrls: ['./phone-workspace.component.scss']
})
export class PhoneWorkspaceComponent implements OnInit {

  data
  isForm
  pageTitle

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) { }

  ngOnInit(): void {
    this.appService.page = 'launch-forms'
    this.appService.pageTitle = 'Launch Forms'
  }

  setPage(page) {
    if (page === 'launch-forms') {
      this.appService.pageTitle = 'Launch Forms'
    }
    if (page === 'template') {
      this.appService.pageTitle = 'Template Library'
    }
    this.appService.page = page
  }

  openHome() {
    this.appService.page = 'home'
    this.appService.pageTitle = 'Form Library'
  }

  openRun() {
    this.appService.page = 'run'
    this.appService.pageTitle = 'Preview'
  }

  openData() {
    this.appService.page = 'data-cards'
    this.appService.pageTitle = 'Form Data'
  }

  openForm(value) {
    this.appService.page = 'design'
    if (value === 'new')
      this.appService.pageTitle = 'Create Form'
    else
      this.appService.pageTitle = 'Edit Form'
  }

  openShare() {
    this.appService.page = 'share'
    this.appService.pageTitle = 'Share'
  }

  close() {
    if (this.appService.parentPage === 'form-library') this.appService.pageTitle = 'Form Libary'
    if (this.appService.parentPage === 'data-cards') this.appService.pageTitle = 'Form Data'
    this.appService.page = this.appService.parentPage
  }

}

