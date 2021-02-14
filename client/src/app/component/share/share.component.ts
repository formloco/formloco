import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } 
from "@angular/forms";

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from "../../model/user";
import { Roles } from "../../model/roles";

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { UserService } from '../../service/user.service';
import { FormService } from '../../service/form.service';
import { ShareService } from '../../service/share.service';
import { EmailService } from "../../service/email.service";
import { ErrorService } from "../../service/error.service";
import { BuilderService } from "../../service/builder.service";
import { SuccessService } from "../../service/success.service";

import { IdbCrudService } from "../../service-idb/idb-crud.service";

import { AuthComponent } from '../dialogs/auth/auth.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  obj;
  user; 
  userNew;
  members;
  response;
  isLogin = false;
  isRefresh = false;

  userForm: FormGroup;

  filteredUsers: Observable<User[]>;
  users;
  roles = Roles;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private userService: UserService,
    private formService: FormService,
    private shareService: ShareService,
    private emailService: EmailService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService,
    private builderService: BuilderService,
    private successService: SuccessService) { 
    this.userForm = this.fb.group({
      user: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['']
    });
  }

  private filter(value: string): User[] {
    if (this.userForm.controls['user'].value !== null) {
      const filterValue = value.toLowerCase();
      return this.users.filter(user => user.email.toLowerCase().includes(filterValue)); 
    }
  }

  private filterMembers(arr, query) {
    return arr.filter(function(el) {
      return el.form_id.indexOf(query) !== -1
    })
  }

  ngOnInit() {
    this.setForm();
    this.user = this.authService.userSignedIn();
    if (this.user && this.user !== null) {
      this.isLogin = true;
      this.userService.getUsers(this.user.tenant_id).subscribe(users => {
        this.users = users;
        this.filteredUsers = this.userForm.controls['user'].valueChanges.pipe(
          startWith(""), 
          map(value => this.filter(value))
        );
      });
      // get only members for form id
      if (this.builderService.formObj !== undefined) {
        this.members = [];
        for (const member of this.user.members) {
          if(member.form_id === this.builderService.formObj.form_id)
            this.members.push(member);
        }
      }
      else this.members = this.user.members;
    }
    else this.isLogin = false;
  }

  setForm() {
    this.userForm.patchValue({user: ''});
    this.userForm.patchValue({role: 'Reporter'});
  }

  inviteLibrary() {
    let member = this.user.members.find(x => x.email === this.userForm.controls['user'].value);
    if (!member) {      
      let shareObj = {
        tenant_id: this.user.tenant_id,
        form_id: null,
        email: this.userForm.controls['user'].value,
        role: this.userForm.controls['role'].value,
        user_created: { 
          email: this.user.email,
          date_created: new Date()
        }
      };
      this.createShare(shareObj);
    }
    else this.errorService.popSnackbar(member.email + ' is already a member.');
  }

  inviteForm() { 
    let member = this.user.members.find(x => x.email === this.userForm.controls['user'].value);
    if (!member) {
      let shareObj = {
        tenant_id: this.user.tenant_id,
        form_id: this.builderService.formObj.form_id,
        email: this.userForm.controls['user'].value,
        role: this.userForm.controls['role'].value,
        user_created: { 
          email: this.user.email,
          date_created: new Date()
        }
      };
      this.createShare(shareObj);
    }
    else this.errorService.popSnackbar(member.email + ' is already a member.');
  }

  createShare(userObj) {
    this.shareService.createShare(userObj).subscribe(data => {
      this.userNew = data;
      this.user = this.authService.refreshUser(this.userNew.user);
      this.userForm.reset();
      this.setForm();
      this.members = this.user.members;
      this.emailInvite(userObj);
    });
  }

  signin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '800px';
    dialogConfig.width = '540px';
    dialogConfig.data = {
      isSignin: true
    };
    const dialogRef = this.dialog.open(AuthComponent, dialogConfig);
  }

  emailInvite(userObj) {
    this.emailService.invite(userObj).subscribe(response => {
      this.response = response;
      this.successService.popSnackbar(this.response.message);
    });
  }

}

 
