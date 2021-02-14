import { Injectable } from '@angular/core';

import { BuilderService } from "../service/builder.service";

@Injectable({
  providedIn: 'root'
})
export class TransformRunService {

  columnArray = [];

  constructor(public builderService: BuilderService) { }

  // prepare data array - orginal service for cloud
  public parseDataCloud(formValues, form, user_created) {
    
    let formArray = Object.entries(formValues);
    
    if (formArray.length > 0) {
      let data = [];
      formArray.forEach(element => {
        if (Array.isArray(element[1])) {
          let multiSelect = JSON.stringify(element[1])
          multiSelect = multiSelect.substr(1);
          multiSelect = multiSelect.slice(0, -1);
          multiSelect = '{'+multiSelect+'}'
          data.push(multiSelect)
        }
        else
          data.push(element[1]);
      });
      data.unshift(new Date());
      // this is needed for running the form via a link, 
      // as there is no use logged in
      if (user_created["email"] === undefined)
        data.unshift('polly');
      else
        data.unshift(user_created["email"]);
      return data;
    }
  }

  // prepare columns string
  public parseColumns() {
    this.columnArray = [];
    let columnObj = {
      columns: null
    }

    this.builderService.detailArray.forEach(element => {
      
      if (element.type === "Textbox" || element.type === "Textarea" || element.type === "Radio" 
        || element.type === "Select" || element.type === "SelectMulti" || element.type === "Slider" || element.type === "List") {
        this.columnArray.push(element.formControlName);
      }

      if (element.type === "GPS") {
        this.columnArray.push(element.lat.formControlName);
        this.columnArray.push(element.long.formControlName);
      }

      if (element.type === "Checkbox") {
        element.checkboxArray.forEach(element => {
          this.columnArray.push(element.formControlName);
        });
      }

      if (element.type === "Toggle") {
        element.toggleArray.forEach(element => {
          this.columnArray.push(element.formControlName);
        });
      }
    });
    columnObj.columns = JSON.stringify(this.columnArray);
    
    columnObj.columns = columnObj.columns.substr(2);
    columnObj.columns = columnObj.columns.slice(0, -2);
    columnObj.columns = columnObj.columns.replace(/['"]+/g, '');
    columnObj.columns = 'date_created, ' + columnObj.columns;
    columnObj.columns = 'user_created, ' + columnObj.columns;

    let comma = columnObj.columns.slice(-2);

    if (comma === ', ') {
      columnObj.columns = columnObj.columns.substring(0, columnObj.columns.length - 2);
      columnObj.columns = columnObj.columns + ' ';
    }
    
    return columnObj.columns;
  }

}
