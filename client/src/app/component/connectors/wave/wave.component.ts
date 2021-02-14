import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../../service/auth.service";
import { SuccessService } from "../../../service/success.service";
import { ConnectorSettingsService } from '../../../service/connector-settings.service';

import { ActionGroupWave } from '../../../model/connector';

@Component({
  selector: 'app-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.scss']
})
export class WaveComponent implements OnChanges {

  @Input() connectorName;
  @Input() connector;

  isLogin = false;
  waveForm: FormGroup;

  actionGroup = ActionGroupWave;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private successService: SuccessService,
    private connectorSettingsService: ConnectorSettingsService
  ) {
    this.waveForm = this.fb.group({
      client_id: ['', Validators.required],
      client_secret: ['', Validators.required],
      full_access_token: ['', Validators.required],
      actions: ['', Validators.required]
    });
  }

  ngOnChanges() {
    this.waveForm.reset();
    let user = this.authService.userSignedIn();

    if (user !== null) {
      this.isLogin = true;

      if (this.connector.id !== undefined) {
        this.waveForm.patchValue({
          client_id: this.connector.settings.client_id,
          client_secret: this.connector.settings.client_secret,
          full_access_token: this.connector.settings.full_access_token,
          actions: this.connector.settings.actions
        });
      }
    }
  }

  save() {
    let user = this.authService.userSignedIn();
    const formValue = this.waveForm.value;
    let settings = {
      name: this.connectorName,
      client_id: formValue.client_id,
      client_secret: formValue.client_secret,
      full_access_token: formValue.full_access_token,
      actions: formValue.actions
    }
    let obj = {
      tenant_id: user.tenant_id,
      user_created: {email: user.email, date: new Date()},
      user_updated: {email: user.email, date: new Date()},
      settings: settings
    };
    if (this.connector.id !== undefined) {
      obj["id"] = this.connector.id;
      this.connectorSettingsService.update(obj).subscribe(msg => {
        this.successService.popSnackbar(msg);
      });
    }
    else {
      this.connectorSettingsService.create(obj).subscribe(msg => {
        this.successService.popSnackbar(msg);
      });
    }
  }

}

