import { Component, OnInit, Inject } from '@angular/core';

import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, tap, catchError } from 'rxjs/operators';

import { FormBuilder, FormControl, FormGroup, Validators }
  from "@angular/forms";

import { Router } from '@angular/router';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { EmailService } from "../../service/email.service";
import { SocialUser } from "angularx-social-login";
import { AuthService as AuthSocialService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { BroadcastService, MsalService } from '@azure/msal-angular';

import { ErrorService } from "../../service/error.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tenant-auth',
  templateUrl: './tenant-auth.component.html',
  styleUrls: ['./tenant-auth.component.scss']
})
export class TenantAuthComponent implements OnInit {

  auth;
  socialUser: SocialUser;
  azureUser;

  // nav/component boolean controls
  isSignin: boolean = true;
  isSignup: boolean = false;
  isForgotPassword: boolean = false;

  emailSigninForm: FormGroup;
  emailSignupForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService) {
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

  ngOnInit(): void {
  }

  signupEmail() {
    this.authService.signupEmail(this.emailSignupForm.value).subscribe(auth => {
      this.auth = auth;
      this.setSession('email');
    });
  }

  setPage(type) {
    this.isForgotPassword = false;
  }

  togglePages() {
    this.isSignin = !this.isSignin;
  }

  forgotPassword() {
    this.isForgotPassword = true;
  }

  forgotPasswordEmail() {
    this.isSignin = true;
    this.isForgotPassword = false;
    let obj = {
      email: this.forgotPasswordForm['email'].value
    }
    this.emailService.forgotPassword(obj).subscribe(res => {

    });
  }

  login(provider) {
    let obj = {
      email: this.emailSigninForm.value.email,
      password: this.emailSigninForm.value.password
    }
    this.authService.login(obj).subscribe(auth => {
      this.auth = auth;

      if (this.auth.message === 'Sign in sucessful.') {
        this.setSession(provider);
        this.router.navigate(['/home']);
      }
      else
        this.errorService.popSnackbar(this.auth.message);
    });
  }

  setSession(provider) {
    this.appService.authProvider = provider;
    localStorage.setItem('authProvider', provider);
    localStorage.setItem('formToken', this.auth.token);
    localStorage.setItem('formUser', JSON.stringify(this.auth.user));
  }

}
