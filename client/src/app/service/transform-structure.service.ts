import { Injectable } from '@angular/core';

import { BuilderService } from "../service/builder.service";

@Injectable({
  providedIn: 'root'
})
export class TransformStructureService {

  type;
  labelArray = [];
  structureArray = [];

  constructor(public builderService: BuilderService) { }

  //*** parse controls array to create database structure for form data **/
  public generateSQLStructure(type) {
    
    this.type = type
    this.labelArray = [];
    this.structureArray = [];
    
    let structureObj = {
      columns: null
    }

    let idSeqColumn = "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass)";

    this.builderService.canvasFormControls.details.forEach(element => {
      if (element.type === "Textbox" || element.type === "Textarea") {
        this.labelArray.push(element.label);
        this.structureArray.push(element.formControlName + ' varchar');
      }

      if (element.type === "Checkbox") {
        element.checkboxArray.forEach(element => {
          this.labelArray.push(element.label);
          this.structureArray.push(element.formControlName + ' boolean');
        });
      }

      if (element.type === "Radio") {
        this.labelArray.push(element.label);
        this.structureArray.push(element.formControlName + ' varchar');
      }

      if (element.type === "Select") {
        this.labelArray.push(element.label);
        this.structureArray.push(element.formControlName + ' varchar');
      }

      if (element.type === "SelectMulti") {
        this.labelArray.push(element.label);
        this.structureArray.push(element.formControlName + ' text []');
      }
      
      if (element.type === "Slider") {
        this.labelArray.push(element.label);
        this.structureArray.push(element.formControlName + ' smallint');
      }

      if (element.type === "Toggle") {
        this.labelArray.push(element.label);
        element.toggleArray.forEach(element => {
          this.structureArray.push(element.formControlName + ' boolean');
        });
      }

      if (element.type === "GPS") {
        this.labelArray.push(element.lat.label);
        this.labelArray.push(element.long.label);
        this.structureArray.push(element.lat.formControlName + ' varchar');
        this.structureArray.push(element.long.formControlName + ' varchar');
      }

    });
   
    this.structureArray.push('PRIMARY KEY(id)');
    structureObj.columns = JSON.stringify(this.structureArray);

    structureObj.columns = structureObj.columns.substr(2);
    structureObj.columns = structureObj.columns.slice(0, -2);
    structureObj.columns = structureObj.columns.replace(/['"]+/g, '');
    structureObj.columns = ', date_created timestamp, ' + structureObj.columns;
    structureObj.columns = ', date_archived timestamp ' + structureObj.columns;
    structureObj.columns = ', date_updated timestamp ' + structureObj.columns;
    structureObj.columns = ', user_archived jsonb ' + structureObj.columns;
    structureObj.columns = ', user_created varchar ' + structureObj.columns;
    structureObj.columns = ', user_updated varchar ' + structureObj.columns;

    if (this.type === 'list') {
      structureObj.columns = ', form_id uuid ' + structureObj.columns;
      structureObj.columns = ', tenant_id uuid ' + structureObj.columns;
      structureObj.columns = ', columns varchar ' + structureObj.columns;
      structureObj.columns = ', data jsonb ' + structureObj.columns;
    }

    structureObj.columns = idSeqColumn + structureObj.columns; 
    
    let obj = {
      labels: JSON.stringify(this.labelArray),
      columns: structureObj.columns
    }
    return obj
  }
}
