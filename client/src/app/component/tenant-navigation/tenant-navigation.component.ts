import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';

import { Router } from '@angular/router';

import { OverlayContainer } from '@angular/cdk/overlay';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { AuthComponent } from '../dialogs/auth/auth.component';
import { ProfileComponent } from '../dialogs/profile/profile.component';

import { AppService } from "../../service/app.service";
import { MsalService } from '@azure/msal-angular';
import { AuthService } from "../../service/auth.service";
import { BuilderService } from "../../service/builder.service";
import { SuccessService } from "../../service/success.service";

import { AuthService as AuthSocialService } from "angularx-social-login";
import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { environment } from '../../../environments/environment';
import { MessageComponent } from '../dialogs/message/message.component';
import { WelcomeComponent } from '../dialogs/welcome/welcome.component';

@Component({
  selector: 'app-tenant-navigation',
  templateUrl: './tenant-navigation.component.html',
  styleUrls: ['./tenant-navigation.component.scss']
})
export class TenantNavigationComponent implements OnInit {

 
  @Output() toggleTheme = new EventEmitter();
  @HostBinding('class') className = '';

  user;
  token;
  tenant;
  response;
  navigation;
  unsavedform;
  authProvider;
  userName;

  isSelected = false;

  swaggerUrl = environment.swaggerUrl;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(

    private router: Router,
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.userSignedIn();
    if (this.user && this.user !== null) {
      if (this.user.first_name !== null && this.user.last_name !== null)
        this.userName = this.user.first_name + ' ' + this.user.last_name;
      else
        this.userName = this.user.email;

      this.appService.authProvider = localStorage.getItem('authProvider');
    }
  }

  signin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '600px'; //800 for other logins
    dialogConfig.width = '500px';
    dialogConfig.data = {
      isSignin: true
    };
    const dialogRef = this.dialog.open(AuthComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(function () { location.reload() }, 3000);
      this.getUser();
    });
  }

  signout() {
    localStorage.removeItem('formToken');
    localStorage.removeItem('formUser');
    localStorage.removeItem('authProvider');
    this.appService.authProvider = undefined;
    this.router.navigate(['']);
  }

  openProfile() {
    this.isSelected = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    const dialogRef = this.dialog.open(ProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.isSelected = false;
    });
  }

  copyToken() {
    let token = localStorage.getItem('formToken');
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = token;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.successService.popSnackbar('Token copied to clipboard.');
  }

  api() {
    if (this.user !== null)
      window.open(this.swaggerUrl + localStorage.getItem('formToken') + '/' + this.user.tenant_id + '/', '_blank');
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.data = {
        title: 'API',
        message: 'Please sign in to access API Library.'
      };
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig);
    }
  }

  changeTheme(event) {
    this.toggleTheme.emit();
    let obj = [this.appService.isDarkMode]
  }

}