import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  shareUrl = environment.shareUrl;

  constructor(
    private _http: HttpClient
  ) { }

  createShare(obj) {
    return this._http.post(this.shareUrl, obj);
  }

  updateShare(obj) {
    return this._http.put(this.shareUrl, obj);
  }

  publishShare(obj) {
    return this._http.post(this.shareUrl+'publish/', obj);
  }

  deleteShare(obj) {
    return this._http.post(this.shareUrl+'delete/', obj);
  }
}
