import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'olaz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'olaz-web';
  panelOpenState = false;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
    });
  }
}
