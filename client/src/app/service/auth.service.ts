import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { tap, concatMap } from 'rxjs/operators'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.authUrl
  userUrl = environment.userUrl
  emailUrl = environment.emailUrl

  constructor(
    private _http: HttpClient
  ) { }

  userSignedIn() {
    return JSON.parse(localStorage.getItem('formUser'))
  }

  isOnline() {
    return window.navigator.onLine
  }

  login(obj) {
    return this._http.post(this.authUrl, obj)
  }

  loginProvider(obj) {
    return this._http.post(this.authUrl+'provider', obj)
  }

  signupEmail(obj) {
    return this._http.post(this.authUrl+'email', obj)
  }

  resetPassword(obj) {
    return this._http.put(this.userUrl+'user/resetpassword', obj)
  }

  token() {
    return this._http.get(this.authUrl+'token')
  }

  refreshToken() {
    let obj = ({id: localStorage.getItem('formUserId')})
    return this._http.post(this.authUrl+'token/refresh', (obj))
  }

  refreshUser(user) {
    localStorage.setItem('formUser', JSON.stringify(user))
    return JSON.parse(localStorage.getItem('formUser'))
  }

}
