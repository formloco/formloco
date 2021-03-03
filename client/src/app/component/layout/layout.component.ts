import { Component } from '@angular/core'

import { AppService } from "../../service/app.service"

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  
  constructor(
    public appService: AppService
  ) { }

}