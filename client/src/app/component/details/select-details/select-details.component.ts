import { Component, Input, OnChanges } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormArray, FormControl } 
from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

import { AppService } from "../../../service/app.service";
import { BuilderService } from "../../../service/builder.service";

import { IdbCrudService } from "../../../service-idb/idb-crud.service";

import { Appearances } from "../../../model/textbox";

@Component({
  selector: 'app-select-details',
  templateUrl: './select-details.component.html',
  styleUrls: ['./select-details.component.scss']
})
export class SelectDetailsComponent implements OnChanges {

  @Input() index;
  
  list;
  allData;
  count: number;
  selectRequired: boolean;
  isList: boolean;
  arrayControl;

  appearances = Appearances;

  selectedList = new FormControl();
  selectForm: FormGroup;

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id'];

  defautSelectArray = [
    {
      label: "Option 1",
      value: "1"
    },
    {
      label: "Option 2",
      value: "2"
    }
  ]

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public builderService: BuilderService,
    private idbCrudService: IdbCrudService) {
    this.selectForm = this.fb.group({
      appearance: [null, Validators.required],
      required:   [null, Validators.required],
      label:      [null, Validators.required],
      error:      [null, Validators.required],
      list:       [null],
      selectArray: this.fb.array([])
    });
  }

  ngOnChanges() {
    console.log(this.appService.apiLists, this.builderService.canvasFormControls.details[this.index])
    if (this.index !== undefined) {
      if (this.builderService.canvasFormControls.details[this.index].list === 'none') {
        this.list = 'none'
        this.isList = false;
      }
      else {
        this.isList = true;
        this.list = this.builderService.canvasFormControls.details[this.index].list.name;
        this.getList();
      }
       
      this.selectForm.patchValue({
        appearance: this.builderService.canvasFormControls.details[this.index].appearance,
        required: this.builderService.canvasFormControls.details[this.index].required,
        label: this.builderService.canvasFormControls.details[this.index].label,
        error: this.builderService.canvasFormControls.details[this.index].error,
        list: this.list,
        selectArray: []
      });
      if (this.builderService.canvasFormControls.details[this.index].required === true)
        this.selectRequired = true;
      else
        this.selectRequired = false;
      
      this.getDetailForm();
    }
  }

  getList() {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.allData = data;
      if (this.allData.length > 0) {
        let list = this.allData.filter(
          data => data.form_id === this.builderService.canvasFormControls.details[this.index].list.form_id
        );
        this.dataSource.data = list[0].data;
        this.builderService.canvasFormControls.details[this.index].selectArray = list[0].data;
      }
    });
  }

  getDetailForm() {
    let control = <FormArray>this.selectForm.controls.selectArray;
    control.clear();
    this.builderService.canvasFormControls.details[this.index].selectArray.forEach(element => {
      control.push(this.fb.group({ 
        value: element.value })
      );
    });
  }

  add() {
    if (this.builderService.canvasFormControls.details[this.index].selectArray) {
      this.count = this.builderService.canvasFormControls.details[this.index].selectArray.length;
      this.count = this.count + 1;
    }
    else this.count = 1;
      this.builderService.canvasFormControls.details[this.index].selectArray.push({
        value: "Option " + this.count
      });
    this.getDetailForm();
  }

  delete(index) {
    this.builderService.canvasFormControls.details[this.index].selectArray.splice(index,1);
    this.getDetailForm();
  }

  deleteControl() {
    this.builderService.deleteControl(this.index);
  }

  setRequired(value) {
    if (value === true)
      this.selectRequired = true;
    else
      this.selectRequired = false;
    this.builderService.canvasFormControls.details[this.index].required = this.selectRequired;
  }

  setLabel() {
    this.builderService.canvasFormControls.details[this.index].label = this.selectForm.get('label').value;    
  }

  setList() {
    if (this.selectForm.get('list').value === 'none') {
      this.isList = false;
      this.builderService.canvasFormControls.details[this.index].list = 'none'; 
      this.builderService.canvasFormControls.details[this.index].selectArray = this.defautSelectArray;
    }
    else {
      this.isList = true;
      this.builderService.canvasFormControls.details[this.index].list = this.appService.apiLists.find(element => element.name === this.selectForm.get('list').value)
      this.getList();
    }
  }

  setError() {
    this.builderService.canvasFormControls.details[this.index].error = this.selectForm.get('error').value;    
  }

  setAppearance() {
    this.builderService.canvasFormControls.details[this.index].appearance = this.selectForm.get('appearance').value;
  }

  setValue(index) {
    this.builderService.canvasFormControls.details[this.index].selectArray[index].value
        = this.selectForm['controls'].selectArray['controls'][index].get('value').value;
  }

}
