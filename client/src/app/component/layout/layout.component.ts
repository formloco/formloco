import { Component, HostBinding } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { AppService } from "../../service/app.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // @HostBinding('class') className = 'darkMode'

  token
  prefs
  formObj
  
  constructor(
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer
  ) { }


  ngOnInit(): void {

    // this.idbCrudService.readAll('prefs').subscribe(prefs => {
    //   this.prefs = prefs

    //   let darkClassName = '';

    //   if (this.prefs.length === 0) {
    //     darkClassName = 'darkMode';
    //   }
    //   else {
    //     this.appService.isDarkMode = this.prefs[0]["dark_mode"];
    //     if (this.appService.isDarkMode) darkClassName = 'darkMode';
    //     else darkClassName = '';
    //   }

    //   this.setMode(darkClassName)
     
    // });

  }

  toggleTheme() {

    let darkClassName = '';

    if (this.appService.isDarkMode) darkClassName = '';
    else darkClassName = 'darkMode';

    this.setMode(darkClassName)

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj);

  }

  setMode(darkClassName) {
    // this.className = 'darkMode' ? darkClassName : '';

    // if (darkClassName === 'darkMode')
    //   this.overlayContainer.getContainerElement().classList.add(darkClassName);
    // else
    //   this.overlayContainer.getContainerElement().classList.remove('darkMode');
  }

}