import { Component, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {

  @Input() index

  constructor(public builderService: BuilderService) { }

}
