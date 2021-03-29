import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AuthService } from "../../../service/auth.service"
import { SuccessService } from "../../../service/success.service"
import { ConnectorSettingsService } from '../../../service/connector-settings.service'

import { ActionGroupFreshbooks, ActionGroupQuickbooks, ActionGroupXero, ActionGroupMicrosoftBusinessCentral, ActionGroupWave } from '../../../model/connector'

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnChanges {

  @Input() connectorName
  @Input() connector

  isLogin = false
  oAuth2Form: FormGroup

  actionGroup
  actionGroupFreshbooks = ActionGroupFreshbooks
  actionGroupQuickbooks = ActionGroupQuickbooks
  actionGroupMicrosoftBusinessCentral = ActionGroupMicrosoftBusinessCentral
  actionGroupXero = ActionGroupXero
  actionGroupWave = ActionGroupWave

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private successService: SuccessService,
    private connectorSettingsService: ConnectorSettingsService
  ) {
    this.oAuth2Form = this.fb.group({
      client_id: ['', Validators.required],
      client_secret: ['', Validators.required],
      redirect_uri: ['', Validators.required],
      actions: ['', Validators.required]
    })
  }

  ngOnChanges() {
    this.oAuth2Form.reset()
    let user = this.authService.userSignedIn()

    if (this.connectorName === 'Freshbooks') this.actionGroup = this.actionGroupFreshbooks
    if (this.connectorName === 'Quickbooks') this.actionGroup = this.actionGroupQuickbooks
    if (this.connectorName === 'Xero') this.actionGroup = this.actionGroupXero
    if (this.connectorName === 'Microsoft Business Central') this.actionGroup = this.actionGroupMicrosoftBusinessCentral
    if (this.connectorName === 'Wave') this.actionGroup = this.actionGroupWave

    if (user !== null) {
      this.isLogin = true

      if (this.connector.id !== undefined) {
        this.oAuth2Form.patchValue({
          client_id: this.connector.settings.client_id,
          client_secret: this.connector.settings.client_secret,
          redirect_uri: this.connector.settings.redirect_uri,
          actions: this.connector.settings.actions
        })
      }
    }
  }

  save() {
    let user = this.authService.userSignedIn()
    const formValue = this.oAuth2Form.value
    let settings = {
      name: this.connectorName,
      client_id: formValue.client_id,
      client_secret: formValue.client_secret,
      redirect_uri: formValue.redirect_uri,
      actions: formValue.actions
    }
    let obj = {
      tenant_id: user.tenant_id,
      user_created: {email: user.email, date: new Date()},
      user_updated: {email: user.email, date: new Date()},
      settings: settings
    }
    if (this.connector.id !== undefined) {
      obj["id"] = this.connector.id
      this.connectorSettingsService.update(obj).subscribe(msg => {
        this.successService.popSnackbar(msg)
      })
    }
    else {
      this.connectorSettingsService.create(obj).subscribe(msg => {
        this.successService.popSnackbar(msg)
      })
    }
  }

}
