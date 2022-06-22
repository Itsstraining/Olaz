import { Component, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'olaz-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

}
