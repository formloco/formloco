import { Component, OnInit, Input } from '@angular/core'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { DataService } from "../../../service/data.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { saveAs } from 'file-saver'

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  @Input() formObj

  app
  forms
  data

  isData = false

  constructor(
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    public idbCrudService: IdbCrudService) { }

  ngOnInit() {
    this.getCloud()
  }

  getCloud() {
    // let obj = {
    //   form_id: "form_id",
    //   tenant_id: this.app.tenant["tenant_id"]
    // }

    // this.dataService.getData(obj).subscribe(data => {
    //   this.data = data
    //   if (this.data.length > 1) this.isData = true
    // })
  }

  exportData() {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.data[0]);
    let csv = this.data.map(row =>
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, this.app.id);
  }

}
