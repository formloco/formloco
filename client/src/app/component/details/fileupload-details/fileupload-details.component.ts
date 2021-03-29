import { Component, OnInit, Input } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-fileupload-details',
  templateUrl: './fileupload-details.component.html',
  styleUrls: ['./fileupload-details.component.scss']
})
export class FileuploadDetailsComponent implements OnInit {
  
  @Input() index

  constructor(
    public builderService: BuilderService) { }

  ngOnInit() {
    
  }

  deleteControl() {
    this.builderService.deleteControl(this.index)
  }

}
