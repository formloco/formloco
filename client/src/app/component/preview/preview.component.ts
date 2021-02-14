import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from "../../service/app.service";
import { FormService } from "../../service/form.service";
import { BuilderService } from "../../service/builder.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  isLoaded = false;
  previewObj;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private formService: FormService,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.formService.getTemplate(params['id']).subscribe(previewObj => {
        this.previewObj = previewObj;
        this.appService.isMainMenu = false;
        this.appService.isData = false;

        /** for canvas */
        this.builderService.currentIndex = 0;
        this.builderService.formObj = this.previewObj;
        this.appService.getAPIList(this.previewObj);
        this.builderService.canvasFormControls = this.previewObj.form;
        this.builderService.isPreview = true;
        this.isLoaded = true;
      });
    });
  }

}
