import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core'

import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements OnChanges{

  @Input() index

  constructor(public builderService: BuilderService) { }

  ngOnChanges() {
    this.builderService.currentQilllIndex = this.index
  }
  
  setFocus(editor) { editor.focus() } 

}