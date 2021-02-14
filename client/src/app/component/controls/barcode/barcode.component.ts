import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { BuilderService } from "../../../service/builder.service";

import { MessageComponent } from '../../dialogs/message/message.component';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  @Input() index;

  value;

  constructor(
    private dialog: MatDialog,
    public builderService: BuilderService) { }

  ngOnInit(): void {}

  openHelp(event, source) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = {
      title: 'Connector Information',
      message: 'Connectors have two ways they can communicate with your form, Lookup Lists and Actions.<br>Lookup Lists are used to search and find key data to put in your forms. They are attached to Select and Multi-Selct Form Controls. So when you run your form you will see your list that comes from'
    };
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
  }

}
