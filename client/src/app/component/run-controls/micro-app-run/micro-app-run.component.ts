import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-micro-app-run',
  templateUrl: './micro-app-run.component.html',
  styleUrls: ['./micro-app-run.component.scss']
})
export class MicroAppRunComponent implements OnInit {

  @Input() index;

  link;
  isLoaded = false;

  constructor(
    private sanitizer: DomSanitizer,
    public builderService: BuilderService) { }

  ngOnInit(): void {
    this.isLoaded = true;
    
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.builderService.detailArray[this.index]["link"]);
  
  }

}
