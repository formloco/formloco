import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from "../../service/auth.service";
import { AppService } from "../../service/app.service";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnChanges {

  @Input() isDarkMode
  @Output() toggleTheme = new EventEmitter()

  myInnerHeight = window.innerHeight;

  isSignin = false;
  canvasBackground = '#000000';

  constructor(
    public appService: AppService,
    private authService: AuthService) { }

  ngOnChanges(): void {
    console.log(this.appService.isDarkMode, this.appService.authProvider)
    // this.canvasBackground = '#ffffff';
    // this.canvasBackground = '#000000';
    if (this.appService.isDarkMode) this.canvasBackground = '#3b3b3b';
    else this.canvasBackground = '#ffffff';


    console.log(this.canvasBackground)
    
    let user = this.authService.userSignedIn();
    if (user !== null)
      this.isSignin = true;
    else
      this.isSignin = false;
  }

  changeTheme(event) {
    this.toggleTheme.emit(event);
  }

}
