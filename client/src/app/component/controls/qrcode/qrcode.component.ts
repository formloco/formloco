import { Component, AfterViewInit, OnInit, Input } from '@angular/core'

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'

import * as _moment from 'moment'

import { FormControl } from '@angular/forms'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { BuilderService } from "../../../service/builder.service"

import { MessageComponent } from '../../dialogs/message/message.component'

export interface Fruit {
  name: string
}

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements AfterViewInit, OnInit{

  @Input() index

  begin = ""
  end = ""
  event = ""

  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  value

  linkURL = new FormControl()

  constructor(
    private dialog: MatDialog,
    public builderService: BuilderService) { 
      
    }


  ngOnInit(): void {
    this.value = 'after the fact'
  }

  ngAfterViewInit(): void {
    this.begin = _moment().format('YYYYMMDD[T]HHmmss')
    this.end = _moment().format('YYYYMMDD[T]HHmmss')
    this.generateCodeData()
  }
  

  generateCodeData(): void {
    
  }

  openHelp(event, source) {
    event.stopPropagation()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '450px'
    dialogConfig.data = {
      title: 'Connector Information',
      message: 'Connectors have two ways they can communicate with your form, Lookup Lists and Actions.<br>Lookup Lists are used to search and find key data to put in your forms. They are attached to Select and Multi-Selct Form Controls. So when you run your form you will see your list that comes from'
    }
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
  }

}
