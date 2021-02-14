import { Component, OnChanges, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";
import { DataService } from "../../../service/data.service";
import { SyncService } from "../../../service/sync.service";
import { SuccessService } from "../../../service/success.service";
import { TransformRunService } from "../../../service/transform-run.service";

import { IdbCrudService } from "../../../service-idb/idb-crud.service";

@Component({
  selector: 'app-list-run',
  templateUrl: './list-run.component.html',
  styleUrls: ['./list-run.component.scss']
})
export class ListRunComponent implements OnChanges {

  @Input() index;
  @Input() runForm;

  id = new FormControl('');

  user;
  data;
  allData;
  selectedIdx;
  isSync = false;

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id'];

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private dataService: DataService,
    private syncService: SyncService,
    public builderService: BuilderService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService,
    private transformRunService: TransformRunService) { }

  ngOnChanges() {
    this.getIdb();

    if (this.builderService.detailArray[this.index].required)
      this.runForm.addControl(this.builderService.detailArray[this.index]
        .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.builderService.detailArray[this.index].formControlName, new FormControl(''));
  }

  edit(idx, element) {
    this.selectedIdx = idx;
    this.id.setValue(element.value);
  }

  saveIdb() {
    let data = this.runForm.value;

    let list = this.allData.filter(
      data => data.form_id === this.builderService.formObj.form_id
    );

    if (list.length === 0) {
      let dataArray = []
      dataArray.push(data)
      data["user_created"] = { email: 'polly@formloco.com', date_created: new Date() }
      data["date_archived"] = undefined;
      data["date_created"] = new Date();
      let obj = {
        form_id: this.builderService.formObj.form_id,
        tenant_id: this.builderService.formObj.tenant_id,
        columns: this.builderService.formObj.form.columns,
        data: dataArray
      }
      this.idbCrudService.put('list_data', obj);
    }
    else {
      list[0].data.push(data);
      this.idbCrudService.delete('list_data', list[0].id);
      this.idbCrudService.put('list_data', list[0]);
    }

    this.builderService.formObj["is_data"] = true;

    this.idbCrudService.put('form', this.builderService.formObj);

    this.successService.popSnackbar('Successfully Saved.');

    this.runForm.reset();
    this.isSync = true;
    this.getIdb();
  }

  updateIdb() {
    let list = this.allData.filter(
      data => data.form_id === this.builderService.formObj.form_id
    );
    list[0].data[this.selectedIdx].value = this.id.value;
    this.idbCrudService.put('list_data', list[0]);
    this.id.reset();
    this.selectedIdx = undefined;
    this.isSync = true;
    this.getIdb();
  }

  deleteIdb(idx) {
    let list = this.allData.filter(
      data => data.form_id === this.builderService.formObj.form_id
    );
    list[0].data[this.selectedIdx].value = this.id.value;

    list[0].data.splice(idx, 1)
    
    this.idbCrudService.put('list_data', list[0]);
    this.dataSource.data.splice(idx, 1)
    this.dataSource._updateChangeSubscription();
    this.id.reset();
    this.selectedIdx = undefined;
    this.isSync = true;
    this.getIdb();
  }

  getIdb() {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.allData = data;
      if (this.allData.length > 0) {
        let list = this.allData.filter(
          data => data.form_id === this.builderService.formObj.form_id
        );
        this.dataSource.data = list[0].data;

        if (this.isSync) {
          let user = this.authService.userSignedIn();
          if (user !== null) {
            let obj = {
              form_id: this.builderService.formObj.form_id,
              tenant_id: user.tenant_id,
              data: list,
              share: []
            }
            
            this.syncService.syncDataListCloud(obj).subscribe(res => {
              this.isSync = false;
            });
          }
        }
      }
    });
  }

}

