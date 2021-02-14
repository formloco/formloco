import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { AppService } from "../../../service/app.service";
import { BuilderService } from "../../../service/builder.service";

import { MessageComponent } from '../../dialogs/message/message.component';

@Component({
  selector: 'app-micro-app',
  templateUrl: './micro-app.component.html',
  styleUrls: ['./micro-app.component.scss']
})
export class MicroAppComponent implements OnInit {

  @Input() index;
  @Input() microAppLabel;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public builderService: BuilderService) { }

  ngOnInit(): void {
    this.builderService.canvasFormControls["details"][0]["link"] = 'https://template.formloco.com';
  }

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

