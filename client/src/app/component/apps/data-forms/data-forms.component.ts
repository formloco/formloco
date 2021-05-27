import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core'

import { FORMS } from "../../../model/forms"

@Component({
  selector: 'app-data-forms',
  templateUrl: './data-forms.component.html',
  styleUrls: ['./data-forms.component.scss']
})
export class DataFormsComponent implements OnInit {

  forms = FORMS

  constructor() { }

  ngOnInit(): void {
    console.log(this.forms)
    // this.state.childPageLabel = 'Administration - Data Forms'
  }

  selectForm(formObj) {
    // this.state.selectedForm = formObj
    console.log(formObj)
  }

}
