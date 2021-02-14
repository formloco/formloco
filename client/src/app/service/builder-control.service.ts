import { Injectable } from '@angular/core';

import { BuilderService } from "./builder.service";

import { ActionGroupFreshbooks, ActionGroupQuickbooks, ActionGroupXero, ActionGroupMicrosoftBusinessCentral, ActionGroupWave } from '../model/connector';

@Injectable({
  providedIn: 'root'
})
export class BuilderControlService {

  actionGroup;
  actionGroupXero = ActionGroupXero;
  actionGroupWave = ActionGroupWave;
  actionGroupFreshbooks = ActionGroupFreshbooks;
  actionGroupQuickbooks = ActionGroupQuickbooks;
  actionGroupMicrosoftBusinessCentral = ActionGroupMicrosoftBusinessCentral;

  constructor(public builderService: BuilderService) { }

  updateDetail(control, index) {

    let obj = {};
    let type = control[index].type;
    let length = this.builderService.canvasFormControls.details.length;

    if (type == 'Textbox') {
      obj = {
        type: "Textbox",
        placeholder: "Textbox",
        formControlName: type + length,
        label: "Textbox",
        appearance: "outline",
        required: false,
        types: "text",
        error: "Required Field"
      }
    }
    else if (type == 'GPS') {
      obj = {
        type: "GPS",
        lat: {
          type: "Textbox",
          placeholder: "Latitude",
          formControlName: 'Latitude',
          label: "Latitude",
          appearance: "outline",
          required: false,
          types: "text"
        },
        long: {
          type: "Textbox",
          placeholder: "Longitude",
          formControlName: 'Longitude',
          label: "Longitude",
          appearance: "outline",
          required: false,
          types: "text"
        }
      }
    }
    else if (type == 'Checkbox') {
      obj = {
        type: "Checkbox",
        label: "Checkboxes",
        checkboxArray: [
          {
            label: "Checkbox 1",
            labelPosition: "after",
            formControlName: type + length + 1,
            required: false,
            value: false,
            error: "Field is required"
          },
          {
            label: "Checkbox 2",
            labelPosition: "after",
            formControlName: type + length + 2,
            required: false,
            value: false,
            error: "Field is required"
          }
        ]
      };
    }
    else if (type == 'Select') {
      obj = {
        type: "Select",
        label: "Select",
        formControlName: type + length,
        list: 'none',
        appearance: "outline",
        required: true,
        multiple: false,
        error: "Field is required",
        selectArray: [
          {
            label: "Option 1",
            value: "1"
          },
          {
            label: "Option 2",
            value: "2"
          }
        ]
      };
    }
    else if (type == 'SelectMulti') {
      obj = {
        type: "Select",
        label: "Multi Select",
        formControlName: type + length,
        list: 'none',
        appearance: "outline",
        required: true,
        multiple: true,
        error: "Field is required",
        selectArray: [
          {
            label: "Option 1",
            value: "1"
          },
          {
            label: "Option 2",
            value: "2"
          }
        ]
      };
    }
    else if (type == 'File Upload') {
      obj = [];
    }
    else if (type == 'BarCode') {
      obj = {};
    }
    else if (type == 'QRCode') {
      obj = {
        qrcode: '',
        redireectURL: '',
        tagArray: []
      };
    }
    else if (type == 'BarCodeScanner') {
      obj = {
        formControlName: type + length,
        label: "Barcode Numbers",
        appearance: "outline"
      }
    }
    else if (type == 'QRCodeScanner') {
      obj = {
        files: []
      };
    }
    else if (type == 'Label') {
      obj = {
        type: "Label",
        label: "Label",
        fontValue: "mat-display-1"
      };
    }
    else if (type == 'Radio') {
      obj = {
        type: "Radio",
        label: "Radio Buttons",
        formControlName: type + length + 1,
        required: false,
        error: "Field is required",
        radioArray: [
          {
            label: "Option 1",
            value: "1",
            labelPosition: "after"
          },
          {
            label: "Option 2",
            value: "2",
            labelPosition: "after"
          }
        ]
      };
    }
    else if (type == 'Slider') {
      obj = {
        type: "Slider",
        label: "Slider",
        formControlName: type + length + 1,
        invert: false,
        max: 100,
        min: 0,
        interval: 10,
        step: 10,
        thumbLabel: true,
        value: 0,
      };
    }
    else if (type == 'Textarea') {
      obj = {
        type: "Textarea",
        label: "Text Area",
        formControlName: type + length + 1,
        placeholder: "Text Area",
        appearance: "outline",
        required: false,
        types: "text",
        error: "Required Field"
      };
    }
    else if (type == 'Toggle') {
      obj = {
        type: "Toggle",
        label: "Toggles",
        toggleArray: [
          {
            label: "Toggle 1",
            formControlName: type + length + 1,
            required: false,
            value: false,
            labelPosition: "after",
            error: "Toggle is required"
          },
          {
            label: "Toggle 2",
            formControlName: type + length + 2,
            required: false,
            value: false,
            labelPosition: "after",
            error: "Toggle is required"
          }
        ]
      };
    }
    else if (type == 'Editor') {
      obj = {
        type: "Editor",
        html: ''
      };
    }
    else if (type == 'Connector') {
      let src
      if (control[index].label === 'Freshbooks') {
        src = 'assets/logo/freshbooks-shield.png';
        this.actionGroup = this.actionGroupFreshbooks;
      }
      if (control[index].label === 'Quickbooks') {
        src = 'assets/logo/quickbooks-button.png';
        this.actionGroup = this.actionGroupQuickbooks;
      }
      if (control[index].label === 'Xero') {
        src = 'assets/logo/xero-logo.png';
        this.actionGroup = this.actionGroupXero;
      }
      if (control[index].label === 'Microsoft Business Central') {
        src = 'assets/logo/microsoft-business-central-shield.png';
        this.actionGroup = this.actionGroupMicrosoftBusinessCentral;
      }
      if (control[index].label === 'Wave') {
        src = 'assets/logo/wave-shield.png';
        this.actionGroup = this.actionGroupWave;
      }

      obj = {
        label: control[index].label,
        type: "Connector",
        lists: this.actionGroup[0].action,
        actions: this.actionGroup[1].action,
        src: src
      };

    }
    else if (type == 'MicroApp') {
      obj = {
        label: control[index].label,
        type: "MicroApp",
        link: control[index].link,
        settings: []
      };
    }

    if (this.builderService.previousIndex === index) {
      if (index === 0)
        this.builderService.canvasFormControls.details.unshift(obj);
      else
        this.builderService.canvasFormControls.details.push(obj);
      this.builderService.previousIndex = this.builderService.canvasFormControls.details.length;
    }
    else {
      this.builderService.canvasFormControls.details.splice(index, 0, obj)
    }

  }

}
