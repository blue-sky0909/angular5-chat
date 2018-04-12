import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message: string = '';

  constructor(public snackBar: MatSnackBar) { }

  open(message: string, cssClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.extraClasses = [cssClass];
    this.snackBar.open(message, 'X', config);
  }
}
