import { Component, OnInit } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { Router } from '@angular/router'

import { AuthComponent } from '../dialogs/auth/auth.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.router.navigate([''])
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '800px'
    dialogConfig.width = '540px'
    dialogConfig.data = {
      isSignin: false
    }
    const dialogRef = this.dialog.open(AuthComponent, dialogConfig)
    //   dialogRef.afterClosed().subscribe(() => {
    //     this.getUser()
    //  })
  }

}