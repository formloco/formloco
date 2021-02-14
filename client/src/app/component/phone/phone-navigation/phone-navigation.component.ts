import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AppService } from "../../../service/app.service";
import { MsalService } from '@azure/msal-angular';
import { AuthService as AuthSocialService } from "angularx-social-login";

@Component({
  selector: 'app-phone-navigation',
  templateUrl: './phone-navigation.component.html',
  styleUrls: ['./phone-navigation.component.scss']
})
export class PhoneNavigationComponent implements OnInit {

  isDarkMode;
  
  constructor(
    private router: Router,
    public appService: AppService,
    private authMsalService: MsalService,
    private authSocialService: AuthSocialService) { }

  ngOnInit(): void {
    this.appService.authProvider = localStorage.getItem('authProvider');
  }

  logoutAzure() {
    this.authMsalService.logout();
  }

  logoutSocialMedia() {
    this.authSocialService.signOut();
  }

  signout() {
    localStorage.removeItem('formToken');
    localStorage.removeItem('formUser');
    localStorage.removeItem('authProvider');
    this.appService.authProvider = undefined;
    this.router.navigate(['']);
    location.reload();
  }

  changeTheme() {
    let theme = 'light-theme';
    if (!this.isDarkMode) theme = 'dark-theme';
  }

}
