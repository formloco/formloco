import { Component, OnChanges, Input, Output, EventEmitter, ɵɵqueryRefresh } from '@angular/core'

import { Router } from '@angular/router'

import { OverlayContainer } from '@angular/cdk/overlay'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { AuthComponent } from '../dialogs/auth/auth.component'
import { ProfileComponent } from '../dialogs/profile/profile.component'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { BuilderService } from "../../service/builder.service"
import { SuccessService } from "../../service/success.service"

//** social media libaries */
// import { MsalService } from '@azure/msal-angular'
// import { AuthService as AuthSocialService } from "angularx-social-login"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { environment } from '../../../environments/environment'
import { MessageComponent } from '../dialogs/message/message.component'
import { WelcomeComponent } from '../dialogs/welcome/welcome.component'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnChanges {

  @Input() userName
  @Output() toggleTheme = new EventEmitter()

  user
  token
  tenant
  response
  navigation
  unsavedform
  authProvider
  
  isSelected = false

  swaggerUrl = environment.swaggerUrl

  mobileQuery: MediaQueryList

  private _mobileQueryListener: () => void

  constructor(

    private router: Router,
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer,

    //** social media libaries */
    // private authMsalService: MsalService,
    // private authSocialService: AuthSocialService
  ) { }

  ngOnChanges() {
    
  }

  // logoutAzure() {
  //   this.authMsalService.logout()
  // }

  // logoutSocialMedia() {
  //   this.authSocialService.signOut()
  // }

  getUser() {
    this.user = this.authService.userSignedIn()
    if (this.user && this.user !== null) {
      if (this.user.first_name !== null && this.user.last_name !== null)
        this.userName = this.user.first_name + ' ' + this.user.last_name
      else
        this.userName = this.user.email

      this.appService.authProvider = localStorage.getItem('authProvider')
    }
  }

  signin() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '600px' //800 for other logins
    dialogConfig.width = '500px'
    dialogConfig.data = {
      isSignin: true
    }
    const dialogRef = this.dialog.open(AuthComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(() => {
      this.getUser()
      this.appService.getForms()
    })
  }

  signout() {
    localStorage.removeItem('formToken')
    localStorage.removeItem('formUser')
    localStorage.removeItem('authProvider')
    this.appService.authProvider = undefined
    this.userName = undefined
    this.appService.getForms()
  }

  openProfile() {
    this.isSelected = true
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '450px'
    const dialogRef = this.dialog.open(ProfileComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      this.isSelected = false
    })
  }

  copyToken() {
    let token = localStorage.getItem('formToken')
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = token
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    this.successService.popSnackbar('Token copied to clipboard.')
  }

  api() {
    this.user = this.authService.userSignedIn()
    if (this.user !== null)
      window.open(this.swaggerUrl + localStorage.getItem('formToken') + '/' + this.user.tenant_id + '/', '_blank')
    else {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '450px'
      dialogConfig.data = {
        title: 'API',
        message: 'Please sign in to access API Library.'
      }
      const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
    }
  }

  welcome() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '450px'
    const dialogRef = this.dialog.open(WelcomeComponent, dialogConfig)
  }

  changeTheme(event) {
    this.toggleTheme.emit()
  }

}