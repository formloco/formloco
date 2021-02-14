import { Component, OnInit } from '@angular/core';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

import * as _moment from 'moment';

@Component({
  selector: 'app-qrcode-run',
  templateUrl: './qrcode-run.component.html',
  styleUrls: ['./qrcode-run.component.scss']
})
export class QrcodeRunComponent implements OnInit {

  begin = "";
  end = "";
  event = "";

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value

  constructor() { }

  ngOnInit(): void {

    this.value = 'after the fact';
    this.begin = _moment().format('YYYYMMDD[T]HHmmss');
    this.end = _moment().format('YYYYMMDD[T]HHmmss');
    // this.generateCodeData();
  }

  generateCodeData(): void {
    // this.event = QrCodeHelper.makeEvent('dffd',this.begin, this.end);
    // let yy = QrCodeHelper.makeSMS('sddsd', 'ssddsds');
  }

}
