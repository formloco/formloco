import { Component, OnInit, Input } from '@angular/core';

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";
import { DataService } from "../../../service/data.service";
import { BuilderService } from "../../../service/builder.service";
import { IdbCrudService } from "../../../service-idb/idb-crud.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-run',
  templateUrl: './select-run.component.html',
  styleUrls: ['./select-run.component.scss']
})
export class SelectRunComponent implements OnInit {

  multi: boolean;
  data;
  lists;

  @Input() index;
  @Input() runForm;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private idbCrudService: IdbCrudService,
    public builderService: BuilderService) { }

  ngOnInit() {
    if (this.builderService.detailArray[this.index].list !== undefined) {
      // let user = this.authService.userSignedIn();
      // if (user !== null)
      //   this.getListsCloud();
      // else
        this.getListsIdb();
    }

    this.multi = this.builderService.detailArray[this.index].multiple;
    if (this.builderService.detailArray[this.index].required)
      this.runForm.addControl(this.builderService.detailArray[this.index]
        .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.builderService.detailArray[this.index]
        .formControlName, new FormControl(''));
  }

  getListsCloud() {
    let obj = ({
      form_id: this.builderService.detailArray[this.index].list.form_id,
      tenant_id: this.builderService.detailArray[this.index].list.tenant_id
    })
    this.dataService.getData(obj).subscribe(data => {
      this.data = data;
      if (this.data.length === 0) this.builderService.detailArray[this.index].selectArray = [];
      this.builderService.detailArray[this.index].selectArray = this.data;
    });
  }

  getListsIdb() {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.lists = data;
      if (this.lists.length > 0) {
        let list = this.lists.filter(
          data => data.form_id === this.builderService.detailArray[this.index]["list"]["form_id"]
        );
        this.builderService.detailArray[this.index].selectArray = list[0]["data"]
      }
    });
  }

}

