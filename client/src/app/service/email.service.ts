import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  emailUrl = environment.emailUrl;

  constructor(private _http: HttpClient) { }

  signup(obj) {
    return this._http.post(this.emailUrl + 'signup', obj);
  }

  invite(obj) {
    return this._http.post(this.emailUrl + 'invite', obj);
  }

  link(obj) {
    return this._http.post(this.emailUrl + 'link', obj);
  }

  forgotPassword(obj) {
    return this._http.post(this.emailUrl + 'forgotpassword', obj);
  }

}