import { Component, OnInit, Inject } from '@angular/core';

import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, tap, catchError } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";
import { EmailService } from "../../../service/email.service";
import { SyncControlService } from "../../../service/sync-control.service";

import { SocialUser } from "angularx-social-login";
import { AuthService as AuthSocialService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { ErrorService } from "../../../service/error.service";
import { SuccessService } from "../../../service/success.service";
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { IdbCrudService } from "../../../service-idb/idb-crud.service";


import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  auth;
  socialUser: SocialUser;
  azureUser;
  isForgotPassword: boolean = false;

  emailSigninForm: FormGroup;
  emailSignupForm: FormGroup;
  forgotPasswordForm: FormGroup;

  redirectForgotPasswordUrl = environment.redirectForgotPasswordUrl;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService,
    private authMsalService: MsalService,
    private successService: SuccessService,
    private broadcastService: BroadcastService,
    private authSocialService: AuthSocialService,
    private syncControlService: SyncControlService,
    public dialogRef: MatDialogRef<AuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.emailSigninForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.emailSignupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit(): void {}

  login(provider) {
    let obj = {};
    if (provider === 'email') {
      obj = { email: this.emailSigninForm.value.email, password: this.emailSigninForm.value.password }
    }
    else if (provider === 'google') {
      this.socialLogin(provider);
      obj = obj = { email: this.socialUser.email, password: this.socialUser.id }
    }
    else if (provider === 'facebook') {
      this.socialLogin(provider);
      obj = obj = { email: this.socialUser.email, password: this.socialUser.id }
    }
    else if (provider === 'azure')
      obj = { user: this.azureUser, isAzure: true }

    this.authService.login(obj).subscribe(auth => {
      this.auth = auth;
      if (this.auth.message === 'Sign in sucessful.')
        this.setSession(provider);
      else
        this.errorService.popSnackbar(this.auth.message);
      
      this.dialogRef.close();
    });
  }

  signupEmail() {
    this.signup('email', this.emailSignupForm.value)
  }

  signupSocial(provider) {
    this.socialLogin(provider);
    let obj = { email: this.socialUser.email, password: this.socialUser.id }
    this.signup(provider, obj);
  }

  signup(provider, obj) {
    this.authService.signupEmail(obj).subscribe(auth => {
      this.auth = auth;
      this.emailWelcome();
      if (this.auth.message === 'Signup sucessful.')
        this.setSession(provider);
      else
        this.errorService.popSnackbar(this.auth.message);

      this.dialogRef.close();
    });
  }

  emailWelcome() {
    this.emailService.signup({ email: this.auth.user.email }).subscribe(res => {
      this.dialogRef.close();
    });
  }

  socialLogin(provider) {
    if (provider === 'facebook')
      this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    if (provider === 'google')
      this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authSocialService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }

  setPage(type) {
    if (type === 'signin') this.data.isSignin = true;
    this.isForgotPassword = false;
  }

  togglePages() {
    this.data.isSignin = !this.data.isSignin;
  }

  forgotPassword() {
    this.isForgotPassword = true;
    this.data.isSignin = false;
  }

  forgotPasswordEmail() {
    this.data.isSignin = true;
    this.isForgotPassword = false;
    let obj = this.forgotPasswordForm.value;
    obj["redirectUrl"] = this.redirectForgotPasswordUrl;
    this.emailService.forgotPassword(obj).subscribe(res => {
      let response = res;
      this.successService.popSnackbar('Email Sent.');
      this.dialogRef.close();
    });
  }

  azure() {
    this.authMsalService.loginPopup();
    this.authMsalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        return;
      }
      this.login('azure');
      this.azureUser = response;
    });
  }

  setSession(provider) {
    this.appService.authProvider = provider;
    localStorage.setItem('authProvider', provider);
    localStorage.setItem('formToken', this.auth.token);
    localStorage.setItem('formUser', JSON.stringify(this.auth.user));
    this.syncControlService.syncFormsIdb(this.auth.user);
    this.syncControlService.syncShareIdb(this.auth.user);
    this.syncControlService.syncDataCloud(this.auth.user);
    this.syncControlService.syncDataListCloud(this.auth.user);
  }

}

