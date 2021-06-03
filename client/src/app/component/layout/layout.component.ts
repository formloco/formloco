import { Component, OnInit, HostBinding } from '@angular/core'

import { AppService } from "../../service/app.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { OverlayContainer } from '@angular/cdk/overlay'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @HostBinding('class') className = 'darkMode'

  constructor(
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    let darkClassName = ''

    if (this.appService.isDarkMode) darkClassName = ''
    else darkClassName = 'darkMode'

    this.setMode(darkClassName)

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj)
  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
  }

}
