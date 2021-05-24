/** sync control handles the workflow for sync'ing
 * form structures and data and list data
*/

import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core'

import { AppService } from "../service/app.service"
import { SyncService } from "../service/sync.service"
import { FormService } from "../service/form.service"
import { IdbCrudService } from "../service-idb/idb-crud.service"

@Injectable({
  providedIn: 'root'
})
export class SyncControlService {

  lists
  forms
  listForms
  shareForms
  tenantForms
  idbData
  listData

  constructor(
    public appService: AppService,
    private syncService: SyncService,
    private formService: FormService,
    private idbCrudService: IdbCrudService) { }

  syncTenant(user) {
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.forms = forms

      if (this.forms.length > 0 && this.forms[0].tenant_id === user.tenant_id) {
        this.forms.forEach(element => {
          element["user_created"] = { email: user.email, date_created: new Date() }
          element["tenant_id"] = user.tenant_id
        })

        let obj = { user: user, forms: this.forms }

        // sync forms owned by tenant
        this.syncService.syncForm(obj).subscribe(res => {
          this.appService.forms = res
          this.appService.forms.unshift('New Form')
          this.syncShareIdb(user)
        })
      }
      else {
        this.formService.getForms(user.tenant_id).subscribe(res => {
          this.appService.forms = res
          this.idbCrudService.clear('form').subscribe(res => {
            this.appService.forms.forEach(formObj => {
              this.idbCrudService.put('form', formObj).subscribe()
            })
            this.appService.forms.unshift('New Form')
            this.syncShareIdb(user)
          })
        })
      }
    })
  }

  syncShareIdb(user) {
    if (user.share_roles != null) {
      this.idbCrudService.clear('share').subscribe()
      user.share_roles.forEach((element, index) => {
        if (element === 'Admin') {
          let userCreated = {
            email: user.share[index].user_created.email,
            date_created: user.share[index].date_created
          }
          let idbForm = ({
            form: user.share[index].form,
            form_id: user.share[index].form_id,
            date_created: user.share[index].date_created,
            tenant_id: user.share[index].tenant_id,
            date_archived: undefined,
            date_last_access: user.share[index].date_last_access,
            user_created: userCreated,
            user_archived: undefined,
            is_data: user.share[index].is_data,
            is_published: user.share[index].is_published,
            is_share: true
          })
          this.idbCrudService.put('share', idbForm).subscribe()
        }
      })
      this.syncDataCloud(user)
    }
  }

  syncDataCloud(user) {
    this.idbData = []
    this.idbCrudService.readAll('data').subscribe(data => {
      this.idbData = data

      if (this.idbData.length > 0) {
        this.idbData.forEach((element, index) => {
          if (element["user_created"] === undefined)
            element["user_created"] = {
              email: user.email,
              date_created: new Date(),
            }
          element["tenant_id"] = user.tenant_id
        })

        this.syncService.syncDataCloud(this.idbData).subscribe(res => {
          let response = res
          if (response["message"] === 'Data synchronized.') {
            this.idbCrudService.clear('data').subscribe()
          }
        })
      }
      this.syncDataListCloud(user)
    })
  }

  syncDataListCloud(user) {
    let obj = {}
    this.idbData = []
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.idbData = data

      if (this.idbData.length > 0) {
        this.idbData.forEach((element, index) => {
          if (element["user_created"] === undefined)
            element["user_created"] = {
              email: user.email,
              date_created: new Date(),
            }
          if (element["tenant_id"] === undefined)
            element["tenant_id"] = user.tenant_id
        })

        let obj = {
          tenant_id: user.tenant_id,
          data: this.idbData
        }
        this.syncListData(obj)
      }
    })
  }

  syncListData(obj) {
    this.syncService.syncDataListCloud(obj).subscribe(listData => {
      this.idbData = listData
      this.idbCrudService.clear('list_data').subscribe()
      this.idbData.forEach(list => {
        this.idbCrudService.put('list_data', list).subscribe()
      })
    })
  }

}