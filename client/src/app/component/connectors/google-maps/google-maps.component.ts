import { Component, OnInit } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } 
from "@angular/forms"

import { AuthService } from "../../../service/auth.service"
import { SuccessService } from "../../../service/success.service"
import { ConnectorSettingsService } from '../../../service/connector-settings.service'

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  obj
  isLogin = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private successService: SuccessService,
    private connectorSettingsService: ConnectorSettingsService) { 
    
  }

  ngOnInit() {
    let user = this.authService.userSignedIn()
    if (user !== null) {
      this.isLogin = true
      this.getConnector()
    }
  }

  getConnector() {
  
  }

  save() {

  }

}
