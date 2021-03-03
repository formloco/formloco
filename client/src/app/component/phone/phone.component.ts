import { Component, OnChanges, Input, Output, EventEmitter, HostBinding } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { AuthService } from "../../service/auth.service"
import { AppService } from "../../service/app.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnChanges {

  @Input() isDarkMode
  // @Output() toggleTheme = new EventEmitter()

  @HostBinding('class') className = 'darkMode'

  myInnerHeight = window.innerHeight;

  isSignin = false
  canvasBackground = '#000000'

  constructor(
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  ngOnChanges(): void {
    if (this.appService.isDarkMode) this.canvasBackground = '#3b3b3b'
    else this.canvasBackground = '#ffffff'
    
    let user = this.authService.userSignedIn()
    if (user !== null)
      this.isSignin = true
    else
      this.isSignin = false
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

  // themeToggle() {
  //   this.toggleTheme.emit();
  // }

  signout() {
    this.isSignin = false;
    localStorage.removeItem('formToken');
    localStorage.removeItem('formUser');
    localStorage.removeItem('authProvider');
    this.appService.authProvider = undefined;
    location.reload();
  }


}
