import { Component, OnInit, Output, HostBinding } from '@angular/core';

import { Router } from '@angular/router';

import { AppService } from "../../../service/app.service";
import { OverlayContainer } from '@angular/cdk/overlay';

import { IdbCrudService } from "../../../service-idb/idb-crud.service";
// import { MsalService } from '@azure/msal-angular';
// import { AuthService as AuthSocialService } from "angularx-social-login";



@Component({
  selector: 'app-phone-navigation',
  templateUrl: './phone-navigation.component.html',
  styleUrls: ['./phone-navigation.component.scss']
})
export class PhoneNavigationComponent implements OnInit {

  // @Output() toggleTheme = new EventEmitter();

  @HostBinding('class') className = '';

  isDarkMode;
  
  constructor(
    private router: Router,
    public appService: AppService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer
    
    // private authMsalService: MsalService,
    // private authSocialService: AuthSocialService
  ) { }

  ngOnInit(): void {
    this.appService.authProvider = localStorage.getItem('authProvider');
  }

  // logoutAzure() {
  //   this.authMsalService.logout();
  // }

  // logoutSocialMedia() {
  //   this.authSocialService.signOut();
  // }

  signout() {
    localStorage.removeItem('formToken');
    localStorage.removeItem('formUser');
    localStorage.removeItem('authProvider');
    this.appService.authProvider = undefined;
    this.router.navigate(['']);
    location.reload();
  }

  toggleTheme(event) {
    console.log(this.appService.isDarkMode)
    let darkClassName = '';

    if (this.appService.isDarkMode === true)
      darkClassName = '';
    else
      darkClassName = 'darkMode';

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj);

    this.className = 'darkMode' ? darkClassName : '';

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName);
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode');

  }

}
