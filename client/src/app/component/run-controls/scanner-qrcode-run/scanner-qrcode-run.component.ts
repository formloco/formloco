import { Component, OnInit, Input } from '@angular/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-scanner-qrcode-run',
  templateUrl: './scanner-qrcode-run.component.html',
  styleUrls: ['./scanner-qrcode-run.component.scss']
})
export class ScannerQrcodeRunComponent implements OnInit {

  @Input() index;

  scannerEnabled = false;

  constructor(public builderService: BuilderService) { }

  ngOnInit(): void {
  }

  startScan() {
    this.scannerEnabled = true;
  }

  stopScan() {
    this.scannerEnabled = false;
  }

  scanSuccess(event) {

  }

  scanError(event) {

  }

  scanFailure(event) {

  }

  scanComplete(event) {

  }

}
