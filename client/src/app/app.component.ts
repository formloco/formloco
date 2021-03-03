import { Component, OnInit } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AppService } from "./service/app.service";
import { IdbCrudService } from "./service-idb/idb-crud.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  prefs

  constructor(
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.appService.isPhone = this.deviceService.isMobile()
    this.appService.isTablet = this.deviceService.isTablet()
    this.appService.isDesktop = this.deviceService.isDesktop()
    
    /**
     * left here for dev purposes
     */
    // this.appService.isPhone = true;
    // this.appService.isDesktop = false;

    // this.appService.isPhone = false;
    // this.appService.isDesktop = true;

  }

}
