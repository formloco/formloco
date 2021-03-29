import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formUrl = environment.formUrl
  templateUrl = environment.templateUrl

  constructor(
    private _http: HttpClient
  ) { }

  create(obj) {
    return this._http.post(this.formUrl+'form', obj)
  }

  getForm(form_id, tenant_id) {
    return this._http.get(this.formUrl+form_id+'/'+tenant_id)
  }

  getForms(tenant_id) {
    return this._http.get(this.formUrl+'form/' + tenant_id)
  }

  update(obj) {
    return this._http.put(this.formUrl+'form', obj)
  }

  delete(obj) {
    return this._http.post(this.formUrl+'form/delete', obj)
  }

  getArchives(tenant_id) {
    return this._http.get(this.formUrl+'form/archives', {params: {tenant_id: tenant_id}})
  }

  getTemplate(id) {
    return this._http.get(this.templateUrl+id)
  }

}