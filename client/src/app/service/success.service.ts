import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private snackBar: MatSnackBar) { }

  popSnackbar(message) {
    this.snackBar.open(message, "Success!", {duration: 3000})
  }

}
