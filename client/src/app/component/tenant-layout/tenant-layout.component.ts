import { Component, OnInit, HostBinding } from '@angular/core';

import { AppService } from "../../service/app.service";

import { OverlayContainer } from '@angular/cdk/overlay';

import { IdbCrudService } from "../../service-idb/idb-crud.service";

@Component({
  selector: 'app-tenant-layout',
  templateUrl: './tenant-layout.component.html',
  styleUrls: ['./tenant-layout.component.scss']
})
export class TenantLayoutComponent implements OnInit {

 
  @HostBinding('class') className = '';

  prefs;

  constructor(
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }


  ngOnInit(): void {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs;
      let darkClassName = '';

      if (this.prefs.length === 0) {
        darkClassName = 'darkMode';
        this.appService.isDarkMode = true;
        let obj = {id: 0, dark_mode:this.appService.isDarkMode}
        this.idbCrudService.put('prefs', obj);
      } 
      else {
        if (this.prefs[0]["dark_mode"]) {
          darkClassName = 'darkMode';
          this.appService.isDarkMode = true;
        }
        else {
          darkClassName = '';
          this.appService.isDarkMode = false;
        }
      }

      this.className = 'darkMode' ? darkClassName : '';
      if ('darkMode') {
        this.overlayContainer.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(darkClassName);
      }
    });

  }

  toggleTheme(event) {

    let darkClassName = '';

    if (this.appService.isDarkMode === true)
      darkClassName = '';
    else
      darkClassName = 'darkMode';

    let obj = {id: 0, dark_mode:!this.appService.isDarkMode}
    this.idbCrudService.put('prefs', obj);

    this.className = 'darkMode' ? darkClassName : '';

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName);
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode');

  }

}
