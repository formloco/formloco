import { Component, OnInit, Input } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

// import { ActionGroupFreshbooks, ActionGroupQuickbooks, ActionGroupXero, ActionGroupMicrosoftBusinessCentral, ActionGroupWave } from '../../../model/connector'
import { AppService } from "../../../service/app.service"
import { BuilderService } from "../../../service/builder.service"

import { MessageComponent } from '../../dialogs/message/message.component'

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent implements OnInit {

  @Input() index
  @Input() connectorLabel

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public builderService: BuilderService) { }

  ngOnInit(): void { }

  selectList(idx,item) {
    this.builderService.canvasFormControls.details[this.index].lists[idx].selected = !this.builderService.canvasFormControls.details[this.index].lists[idx].selected
    
    if (this.builderService.canvasFormControls.details[this.index].lists[idx].selected)
      this.appService.apiLists.push({id: this.builderService.canvasFormControls.details[this.index].lists[idx].value+this.builderService.canvasFormControls.details[this.index].label,name: this.builderService.canvasFormControls.details[this.index].lists[idx].value, src: this.builderService.canvasFormControls.details[this.index].src})
    else {
      let listIndex = this.appService.apiLists.findIndex(list => list.id === this.builderService.canvasFormControls.details[this.index].lists[idx].id)
      this.appService.apiLists.splice(listIndex,1)
    }
  }

  selectAction(idx) {
    this.builderService.canvasFormControls.details[this.index].actions[idx].selected = !this.builderService.canvasFormControls.details[this.index].actions[idx].selected
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
