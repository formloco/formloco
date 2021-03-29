import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { FormService } from "../../service/form.service"
import { BuilderService } from "../../service/builder.service"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  token
  isForm = false
  formObj

  constructor( 
    public appService: AppService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formService: FormService,
    public builderService: BuilderService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {

      this.authService.token().subscribe(token => {
        this.token = token
        localStorage.setItem('formToken', this.token.token)
        this.formService.getForm(params['form_id'], params['tenant_id']).subscribe(obj => {
          this.formObj = obj
          
          this.appService.pageTitle = 'Edit Form'
          this.appService.page = 'design'
          this.appService.isMainMenu = false
          this.appService.isData = this.formObj.is_data

          /** for canvas */
          this.builderService.currentIndex = 0
          this.builderService.formObj = this.formObj
          this.appService.getAPIList(this.formObj)
          this.builderService.canvasFormControls = this.formObj.form
          this.builderService.isPreview = false
        })
      })
    })
  }

}
