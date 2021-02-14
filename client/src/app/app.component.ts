import { Component,  OnDestroy, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AppService } from "./service/app.service";
import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themeSubscription: Subscription;

  token;
  loggedIn = false;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.appService.isPhone = this.deviceService.isMobile();
    this.appService.isTablet = this.deviceService.isTablet();
    this.appService.isDesktop = this.deviceService.isDesktop();
   
    /**
     * left here for dev purposes
     */
    // this.appService.isPhone = true;
    // this.appService.isDesktop = false;

    // this.appService.isPhone = false;
    // this.appService.isDesktop = true;

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
