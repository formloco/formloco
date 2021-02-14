import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  isSignin = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let user = this.authService.userSignedIn();
    if (user !== null)
      this.isSignin = true;
    else
      this.isSignin = false;
  }

}
