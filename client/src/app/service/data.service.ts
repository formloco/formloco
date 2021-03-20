import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppService } from "../service/app.service";
import { BuilderService } from "../service/builder.service";
import { IdbCrudService } from "../service-idb/idb-crud.service";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idbData;

  apiUrl = environment.apiUrl;
  fileUrl = environment.fileUrl;

  constructor(
    private _http: HttpClient,
    public appService: AppService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) { }

  save(obj) {
    return this._http.post(this.apiUrl, obj);
  }

  getData(obj) {
    return this._http.get(this.apiUrl  + obj.tenant_id + '/' + obj.form_id);
  }

  getFiles(tenant_id, form_id) {
    return this._http.get(this.fileUrl + tenant_id + '/' + form_id);
  }

  saveFile(obj) {
    return this._http.post(this.fileUrl, obj);
  }

  updateFile(obj) {
    return this._http.put(this.fileUrl, obj);
  }

  deleteFile(id) {
    return this._http.put(this.fileUrl, id);
  }

  openIdbData(formObj) {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.idbData = data;
      this.idbData = this.idbData.filter(
        data => data.form_id === formObj.form_id
      );
      this.appService.pageTitle = formObj.form.name;
      this.builderService.formObj = formObj;
      this.appService.page = 'data';
    });
  }

}
