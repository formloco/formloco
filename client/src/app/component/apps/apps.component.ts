import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { MessageComponent } from '../dialogs/message/message.component'

import { AppService } from "../../service/app.service"
import { BuilderService } from "../../service/builder.service"

import { APPS } from "../../model/apps"

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  apps = APPS

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public builderService: BuilderService) { }

  ngOnInit(): void {
    console.log(this.apps)
  }

  publish(app, event) {
    console.log(app)
    // this.appService.publish(formObj, event)
  }

  settings(app) {
    console.log('settings')
  }

  data(app) {
    this.appService.pageTitle = 'Apps -> Form Data'
    this.appService.page = 'app-data-forms'
  }

  users() {
    console.log('users')
  }


}
