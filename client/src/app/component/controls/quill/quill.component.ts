import { Component, Input } from '@angular/core';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent {

  @Input() index;

  constructor(public builderService: BuilderService) { }

  setFocus(editor) { editor.focus(); }

}