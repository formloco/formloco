import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectorSettingsService {

  connectorUrl = environment.connectorUrl;

  constructor(private _http: HttpClient) { }
  
  read(tenant_id) {
    return this._http.get(this.connectorUrl + tenant_id);
  }
  
  create(obj) {
    return this._http.post(this.connectorUrl, (obj));
  }
  
  update(obj) {
    return this._http.put(this.connectorUrl, (obj));
  }

}
