import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * there are two use cases for deployment
 * 1. saas based - uses layout component
 * 2. tenant based - uses tenant auth & layout component
 */

// import { TenantAuthComponent as Layout } from './component/tenant-auth/tenant-auth.component';
// import { TenantLayoutComponent } from './component/tenant-layout/tenant-layout.component';

import { RunComponent } from './component/run/run.component';
import { LinkComponent } from './component/link/link.component';
import { FormComponent } from './component/form/form.component';
import { PhoneComponent } from './component/phone/phone.component';
import { SignupComponent } from './component/signup/signup.component';
import { PreviewComponent } from './component/preview/preview.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'run',
    component: RunComponent
  }, {
    path: 'link',
    component: LinkComponent
  }, {
    path: 'form',
    component: FormComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'phone',
    component: PhoneComponent
  }, {
    path: 'preview',
    component: PreviewComponent
  }, {
    path: 'O451fd2702f54a00b1007f6e80b32e45',
    component: PasswordresetComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }