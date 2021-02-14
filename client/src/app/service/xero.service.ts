import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XeroService {

  connectorUrl = environment.connectorUrl;

  constructor(
    private _http: HttpClient) { }

  assets(tenant_id) {
    return this._http.get(this.connectorUrl+'assets/', {params: {tenant_id: tenant_id }});
  }

  contacts(tenant_id) {
    return this._http.get(this.connectorUrl+'contacts/', {params: {tenant_id: tenant_id }});
  }

}