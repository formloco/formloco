import { Injectable } from '@angular/core'
import { IdbCrudService } from "../service-idb/idb-crud.service"

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  shares
  public forms
  public apiLists = []
  public lookupLists

  constructor(private idbCrudService: IdbCrudService) { }

  getForms() {
    this.forms = []
    this.shares = []
    this.apiLists = []
    this.lookupLists = []
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.forms = forms
      this.idbCrudService.readAll('share').subscribe(shares => {
        this.shares = shares
        this.forms = this.forms.concat(this.shares)
        this.forms.forEach((formObj, index) => {
          if (formObj.date_archived !== undefined && formObj.date_archived !== null) {
            this.forms.splice(index, 1)
          }

          if (formObj.form.is_list) {
            let tenant_id = null;
            if (formObj.tenant_id !== undefined) tenant_id = formObj.tenant_id
              
            this.apiLists.push({
              src: 'assets/logo/parrot.png',
              type: 'formloco',
              tenant_id: tenant_id, 
              form_id: formObj.form_id, 
              name: formObj.form.name
            });
            this.lookupLists.push(formObj)
          }
        })
      })
    })
  }
}
