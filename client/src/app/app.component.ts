import { Component, OnInit } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'
import { DeviceDetectorService } from 'ngx-device-detector'

import { AppService } from "./service/app.service"
import { IdbCrudService } from "./service-idb/idb-crud.service"

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
    private overlayContainer: OverlayContainer,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    /**
   * left here for dev purposes
   */
    // this.appService.isPhone = true
    // this.appService.isDesktop = false

    // this.appService.isPhone = false
    // this.appService.isDesktop = true

    this.appService.isPhone = this.deviceService.isMobile()
    this.appService.isTablet = this.deviceService.isTablet()
    this.appService.isDesktop = this.deviceService.isDesktop()

    // this.idbCrudService.readAll('prefs').subscribe(prefs => {
    //   this.prefs = prefs

    //   // state: not identified, uses default state from state.service
    //   if (this.prefs.length === 0) {
    //     let obj = { id: 0, dark_mode: true, user: {} }
    //     this.idbCrudService.put('prefs', obj)
    //   }
    // })
  }

}

