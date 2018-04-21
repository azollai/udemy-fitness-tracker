import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, duration);
  }
}
