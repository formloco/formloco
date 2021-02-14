import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  syncUrl = environment.syncUrl;

  forms;
  idbData;

  constructor(
    private _http: HttpClient
  ) { }

  syncForm(obj) {
    return this._http.post(this.syncUrl+'sync/form', obj);
  }

  syncImport(obj) {
    return this._http.post(this.syncUrl+'sync/import', obj);
  }

  syncDataCloud(data) {
    return this._http.post(this.syncUrl+'sync/data', data);
  }

  syncDataListCloud(data) {
    return this._http.post(this.syncUrl+'sync/list/tenant', data);
  }

  syncListDeleteCloud(data) {
    return this._http.post(this.syncUrl+'sync/list/delete', data);
  }

  syncDataListForm(data) {
    return this._http.post(this.syncUrl+'sync/list/form', data);    
  }

}
