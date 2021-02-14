import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectorApiService {

  connectorUrl = environment.connectorUrl;

  constructor(private _http: HttpClient) { }

  connect(tenant_id, id, type) {
    return this._http.get(this.connectorUrl+'/connect' + tenant_id + `/` + id + `/`+ type + `/`);
  }

  read(tenant_id, id, type) {
    return this._http.get(this.connectorUrl + tenant_id + `/` + id + `/` + type + `/`);
  }

  create(obj) {
    return this._http.post(this.connectorUrl, obj);
  }

  update(obj) {
    return this._http.get(this.connectorUrl, obj);
  }

  disconnect(obj) {
    return this._http.post(this.connectorUrl+'disconnect/', obj);
  }
  
}
