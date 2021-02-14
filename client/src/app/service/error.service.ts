import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  popRequestErrorSnackbar(error): any {
    this.snackBar.open(error.reason, "Error!", {duration: 3000})
  }

  popSnackbar(message) {
    this.snackBar.open(message, "Heads Up!", {duration: 3000})
  }
  
}

