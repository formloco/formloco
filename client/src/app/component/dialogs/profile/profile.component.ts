import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } 
from "@angular/forms";

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { UserService } from '../../../service/user.service';
import { AuthService } from "../../../service/auth.service";
import { SuccessService } from "../../../service/success.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  obj;
  user;
  isDarkMode = false;
  isWelcomeMessage = false;

  profileForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private successService: SuccessService,
    public dialogRef: MatDialogRef<ProfileComponent>) { 
    this.profileForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      isDarkMode: ['']
    });
  }

  ngOnInit(): void {
    if (this.user && this.user !== null) {
      this.user = this.authService.userSignedIn();
      this.isDarkMode = this.user.settings.isDarkMode;
      this.isWelcomeMessage = this.user.settings.isWelcomeMessage;
    }
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    let theme = 'light-theme';
    if (this.isDarkMode) theme = 'dark-theme';
  }

  save() {
    let userObj = {
      tenant_id: this.user.tenant_id,
      first_name: this.profileForm.controls['first_name'].value,
      last_name: this.profileForm.controls['last_name'].value,
      settings: {
        isDarkMode: this.isDarkMode
      },
      members: this.user.members
    };
    this.userService.updateUser(this.user).subscribe(obj => {
      this.obj = obj;
      this.successService.popSnackbar(this.obj.message);
      this.user.members = this.obj.members;
      this.user = this.authService.refreshUser(this.user);
    });
  }

  forgotPassword() {
    
  }
}
