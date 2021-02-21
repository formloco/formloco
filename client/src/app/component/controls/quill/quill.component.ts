import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements OnChanges{

  @Input() index;
  @Output() toggleDragDisable = new EventEmitter<any>();

  constructor(public builderService: BuilderService) { 
    
  }

  ngOnChanges() {
    this.builderService.currentQilllIndex = this.index;
  }

  setIndex() {
    this.toggleDragDisable.emit();
  }
  
  setFocus(editor) { editor.focus(); } 

}