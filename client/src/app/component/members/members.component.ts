import { Component, DoCheck, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { ShareService } from '../../service/share.service';
import { EmailService } from "../../service/email.service";
import { SuccessService } from '../../service/success.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnChanges {

  @Input() members;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  obj;
  user;
  form;
  userId;
  response;
  tenantId;

  displayedColumns: string[];
  dataSource;

  linkUrl = environment.linkUrl;

  constructor(
    public appService: AppService,
    private authService: AuthService,
    private shareService: ShareService,
    private emailService: EmailService,
    private successService: SuccessService) {
    this.displayedColumns = ['email', 'role', 'status', 'resend', 'controls'];
  }

  ngOnChanges() {
    this.setDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.sort = this.sort;
  }

  updateRole(value, element) {
    this.user = this.authService.userSignedIn();

    this.shareService.updateShare({id: element.id, role: value, tenant_id: this.user.tenant_id}).subscribe(obj => {
      this.obj = obj;
      let idx = this.user.members.findIndex(x => x.id === element.id);
      this.user.members[idx]["role"] = value;
      this.authService.refreshUser(this.user);
      this.successService.popSnackbar(this.obj.message);
    });
  }

  delete(index) {
    let shareToDelete = this.members[index];
    this.members.splice(index, 1);
    this.setDataSource();

    let user = this.authService.userSignedIn();
    user.members = this.members;
    this.authService.refreshUser(user);

    let deleteObj = {share: shareToDelete, user: user}
    this.shareService.deleteShare(deleteObj).subscribe(obj => {
      this.obj = obj;
      this.successService.popSnackbar(this.obj.message);
    });
  }

  emailLink(element, link) {
    let obj = ({ user_handle: element.user_handle, link: link + this.form.id })
    this.emailService.link(obj).subscribe(response => {
      this.response = response;
      this.successService.popSnackbar(this.response.message);
    });
  }

  emailInvite(userObj) {
    this.emailService.invite(userObj).subscribe(response => {
      this.response = response;
      this.successService.popSnackbar(this.response.message);
    });
  }

}
