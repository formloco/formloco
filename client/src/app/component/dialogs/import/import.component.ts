import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from "@angular/material/dialog";

import { MatSnackBar } from '@angular/material/snack-bar';

import { BuilderService } from "../../../service/builder.service";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  fileArray = [];

  constructor(
    private snackBar: MatSnackBar,
    public builderService: BuilderService,
    public dialogRef: MatDialogRef<ImportComponent>,) { }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  ngOnInit(): void {
  }

  import() {
    
  }

  onSelect(event) {
    this.fileArray.push(...event.addedFiles);
    
    this.fileArray.forEach(element => {
      this.readFile(element).then(fileContents => {
        element.content = fileContents;
      });
    });
  }

  onFilesRejected(files: File[]) {
    this.snackBar.open('Your file is too big, must be 20k or less.', "Error:",
      { duration: 5000 })
  }

  onRemove(event) {
    this.builderService.fileArray.splice(this.builderService.fileArray.indexOf(event), 1);
  }

}
