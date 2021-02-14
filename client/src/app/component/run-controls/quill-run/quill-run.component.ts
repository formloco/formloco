import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-quill-run',
  templateUrl: './quill-run.component.html',
  styleUrls: ['./quill-run.component.scss']
})
export class QuillRunComponent {

  @Input() index;
  
  content;
  quillConfig = {
    toolbar: false,
    theme: 'bubble'
  };

  constructor(public builderService: BuilderService) { }

}
