import { Component, OnInit, Input } from '@angular/core'

import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { BuilderService } from "../../../service/builder.service"

@Component({
  selector: 'app-scanner-qrcode',
  templateUrl: './scanner-qrcode.component.html',
  styleUrls: ['./scanner-qrcode.component.scss']
})
export class ScannerQrcodeComponent implements OnInit {

  @Input() index

  constructor(public builderService: BuilderService) { }

  ngOnInit(): void {
  }

}
