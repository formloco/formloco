import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  MsalModule, MsalInterceptor, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { Configuration } from 'msal';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '6d11c090-0684-4430-b545-0c0755f05b51',
      authority: "https://login.microsoftonline.com/common/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: false,
    consentScopes: [
      "user.read",
      "openid",
      "profile"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [],
  imports: [MsalModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ],
})
export class AzureModule { }
