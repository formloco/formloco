import { Component, OnInit, Input } from '@angular/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-scanner-barcode',
  templateUrl: './scanner-barcode.component.html',
  styleUrls: ['./scanner-barcode.component.scss']
})
export class ScannerBarcodeComponent implements OnInit {

  @Input() index;

  allowedFormats = [ BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];

  constructor(public builderService: BuilderService) { }

  ngOnInit(): void {
  }

}
