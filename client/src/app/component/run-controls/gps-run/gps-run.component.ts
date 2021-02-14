import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from "../../../service/builder.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gps-run',
  templateUrl: './gps-run.component.html',
  styleUrls: ['./gps-run.component.scss']
})
export class GpsRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  lat;
  long;

  constructor(
    public builderService: BuilderService) { 
      
    }

  ngOnInit() {
    this.runForm.addControl(this.builderService.detailArray[this.index].lat.formControlName, new FormControl(''));
    this.runForm.addControl(this.builderService.detailArray[this.index].long.formControlName, new FormControl(''));  

    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.runForm.controls['Latitude'].setValue(this.lat);
      this.runForm.controls['Longitude'].setValue(this.long);
    });
  }

}
