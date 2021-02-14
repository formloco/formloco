import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-barcode-run',
  templateUrl: './barcode-run.component.html',
  styleUrls: ['./barcode-run.component.scss']
})
export class BarcodeRunComponent implements OnInit {

  @Input() index;

  value;

  constructor(public builderService: BuilderService) { }

  ngOnInit(): void {
    console.log(this.builderService.detailArray[this.index].value)
  }

}
