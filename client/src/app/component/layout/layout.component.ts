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

  @HostBinding('class') className = ''

  token
  prefs
  formObj

  constructor(
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer
  ) { }


  ngOnInit(): void {

    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      let darkClassName = ''

      if (this.prefs.length === 0) {
        this.appService.isDarkMode = true
        this.pushClass('darkMode')
      }
      else {
        this.appService.isDarkMode = false
        this.pushClass('')
      }

    });

  }

  pushClass(mode) {
    this.className = mode
    this.overlayContainer.getContainerElement().classList.add(mode)
  }

  toggleTheme() {
    
    console.log(this.appService.isDarkMode)
    let darkClassName = '';

    if (this.appService.isDarkMode === true)
      darkClassName = '';
    else
      darkClassName = 'darkMode';

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    // this.idbCrudService.put('prefs', obj);

    this.className = 'darkMode' ? darkClassName : '';

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName);
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode');

  }

}