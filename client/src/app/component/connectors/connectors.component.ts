import { Component, OnInit } from '@angular/core';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";
import { BuilderService } from "../../service/builder.service";
import { SuccessService } from "../../service/success.service";
import { ConnectorSettingsService } from '../../service/connector-settings.service';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})
export class ConnectorsComponent implements OnInit {

  connectorList= [
    {
      name: "Freshbooks",
      type: "oauth2"
    }, 
    {
      name: "Quickbooks",
      type: "oauth2"
    }, 
    {
      name: "Microsoft Business Central",
      type: "oauth2"
    }, {
      name: "Wave",
      type: "wave"
    }, 
    {
      name: "Xero",
      type: "oauth2"
    }, {
      name: "Google Maps",
      type: "googlemaps"
    }
  ]

  connector;
  connectors;
  currentIndex;
  connectorName;
  connectorType;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    public builderService: BuilderService,
    private successService: SuccessService,
    private connectorSettingsService: ConnectorSettingsService) {
    }

  ngOnInit() {
    
    let user = this.authService.userSignedIn();
    
    if (user !== null) {
      this.connectorSettingsService.read(user.tenant_id).subscribe(connectors => {
        this.connectors = connectors;
      });
    }
  }

  open(index, connector) {
    this.connectorName = connector.name;
    this.connectorType = connector.type;

    this.connector = {};
    this.connectors.forEach(element => {
      if (element.settings.name === connector.name) this.connector = element;
    });
  }

  close() {
    this.appService.isMainMenu = true;
    this.appService.page = 'form-library';
  }

}

