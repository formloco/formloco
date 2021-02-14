import { OnChanges, Component, ChangeDetectorRef, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';

import { AppService } from "../../service/app.service";
import { BuilderService } from "../../service/builder.service";

import { Controls } from "../../model/controls"

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnChanges {

  @Input() formObj;

  iotToggle = false;
  appToggle = false;
  apiToggle = false;
  formToggle = false;

  detailsArray;
  // showControls;
  integrationArray;

  mobileQuery: MediaQueryList;

  canvasFormControls = [
    {
      name: '',
      controls: [],
      details: []
    }
  ];

  dropForm = ['formList', ...this.canvasFormControls.map(_ => _.name)];

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    private appService: AppService,
    changeDetectorRef: ChangeDetectorRef,
    public builderService: BuilderService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.builderService.controls = Controls;
  }

  ngOnChanges(): void {}

  hideIndicator(idx) {
    this.builderService.controls[idx]["disabled"] = true;
  }

  subMenuToggle(type) {
    // console.log(this.builderService.controls)
    // if (type === 'FORM') this.formToggle = !this.formToggle;
    // if (type === 'IOT') this.iotToggle = !this.iotToggle;
    // if (type === 'APP') this.appToggle = !this.appToggle;
    // if (type === 'API') this.apiToggle = !this.apiToggle;
    // console.log(this.builderService.controls)
  }

  close() {
    this.appService.isMainMenu = true;
    this.appService.page = 'form-library';
  }

}
