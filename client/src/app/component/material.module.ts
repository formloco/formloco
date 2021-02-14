import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
 

@NgModule({
  imports: [
    FormsModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule, 
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule, 
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule, 
    MatDialogModule, 
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, 
    MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    OverlayModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    NgxBarcode6Module,
    MatProgressBarModule
  ],
  exports:[
    FormsModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule, 
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule, 
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule, 
    MatDialogModule, 
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, 
    MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    OverlayModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    NgxBarcode6Module,
    MatProgressBarModule
  ],
  providers: [MatDatepickerModule]
})
export class MaterialModule { }
