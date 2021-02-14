import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = environment.userUrl;

  constructor(
    private _http: HttpClient
  ) { }

  createUser(obj) {
    return this._http.post(this.userUrl+'user/create', obj);
  }

  getUsers(tenant_id) {
    return this._http.get(this.userUrl+'users/'+tenant_id);
  }

  updateUser(obj) {
    return this._http.put(this.userUrl+'user', obj);
  }

  deleteUser(obj) {
    return this._http.delete(this.userUrl+'user', obj);
  }
  
}
