import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfig} from './interceptor/httpconfig.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { SocialMediaAuthModule } from './social-media-auth.module';

import { ComponentModule } from './component/component.module';

import { AuthService } from './service/auth.service';
import { FormService } from './service/form.service';
import { DataService } from './service/data.service';
import { UserService } from './service/user.service';
import { EmailService } from './service/email.service';
import { BuilderService } from './service/builder.service';
import { TransformRunService } from './service/transform-run.service';
import { TransformStructureService } from './service/transform-structure.service';

//indexDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service';

import { environment } from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentModule,
    MsalModule.forRoot({
      auth: {
        clientId: '6d11c090-0684-4430-b545-0c0755f05b51',
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri: 'https://form369.formloco.com',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['Enter_the_Graph_Endpoint_Herev1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    }),
    SocialMediaAuthModule,
  ],
  providers: [
    AuthService,
    FormService,
    DataService,
    UserService,
    EmailService,
    BuilderService,
    TransformRunService,
    TransformStructureService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfig, 
      multi: true 
    },
    { provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
