import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { AppService } from "../../../service/app.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<WelcomeComponent>) {}

  ngOnInit(): void {
  }

  saveWelcomeSetting() {
    this.appService.isWelcomeMessage = true;
  }
}
