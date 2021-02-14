import { Component, HostBinding } from '@angular/core';

// import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from "../../service/app.service";
// import { AuthService } from "../../service/auth.service";
// import { FormService } from "../../service/form.service";
// import { BuilderService } from "../../service/builder.service";

import { OverlayContainer } from '@angular/cdk/overlay';

import { IdbCrudService } from "../../service-idb/idb-crud.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @HostBinding('class') className = '';

  token;
  prefs;
  formObj;

  constructor(
    public appService: AppService,
    // private route: ActivatedRoute,
    // public authService: AuthService,
    // private formService: FormService,
    // public builderService: BuilderService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }


  ngOnInit(): void {
    
    // this.route.queryParams.subscribe((params: Params) => {

    //   console.log(params)
    //   this.authService.token().subscribe(token => {
    //     this.token = token;
    //     localStorage.setItem('formToken', this.token.token);
    //     this.formService.getForm(params['form_id'], params['tenant_id']).subscribe(obj => {
    //       this.formObj = obj;
    //       this.appService.pageTitle = 'Edit Form';
    //       this.appService.page = 'design';
    //       this.appService.isMainMenu = false;
    //       this.appService.isData = this.formObj.is_data;

    //       /** for canvas */
    //       this.builderService.currentIndex = 0;
    //       this.builderService.formObj = this.formObj;
    //       this.appService.getAPIList(this.formObj);
    //       this.builderService.canvasFormControls = this.formObj.form;
    //       this.builderService.isPreview = false;
    //     });
    //   });
    // });

    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs;
      let darkClassName = '';

      if (this.prefs.length === 0) {
        darkClassName = 'darkMode';
        this.appService.isDarkMode = true;
        let obj = { id: 0, dark_mode: this.appService.isDarkMode }
        this.idbCrudService.put('prefs', obj);
      }
      else {
        if (this.prefs[0]["dark_mode"]) {
          darkClassName = 'darkMode';
          this.appService.isDarkMode = true;
        }
        else {
          darkClassName = '';
          this.appService.isDarkMode = false;
        }
      }

      this.className = 'darkMode' ? darkClassName : '';
      if ('darkMode') {
        this.overlayContainer.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(darkClassName);
      }
    });

  }

  toggleTheme(event) {

    let darkClassName = '';

    if (this.appService.isDarkMode === true)
      darkClassName = '';
    else
      darkClassName = 'darkMode';

    let obj = { id: 0, dark_mode: !this.appService.isDarkMode }
    this.idbCrudService.put('prefs', obj);

    this.className = 'darkMode' ? darkClassName : '';

    if (darkClassName === 'darkMode')
      this.overlayContainer.getContainerElement().classList.add(darkClassName);
    else
      this.overlayContainer.getContainerElement().classList.remove('darkMode');

  }

}