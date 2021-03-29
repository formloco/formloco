import { Component, OnInit, Inject } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { ResetpasswordComponent } from '../dialogs/resetpassword/resetpassword.component'

import { AppService } from "../../service/app.service"

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {
  /** this component is used as a redirect
   * to forgotpassword dialog. sets the user to 
   * main dashboard and pops up change password
   */
  email

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private appService: AppService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email']
      localStorage.setItem('formToken', params['token'])
      this.router.navigate([''])
      const dialogConfig = new MatDialogConfig()
      dialogConfig.height = '400px'
      dialogConfig.width = '540px'
      dialogConfig.data = {email: this.email}
      const dialogRef = this.dialog.open(ResetpasswordComponent, dialogConfig)
    })
  }

}
