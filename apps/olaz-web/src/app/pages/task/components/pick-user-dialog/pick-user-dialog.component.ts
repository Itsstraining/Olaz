import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'olaz-pick-user-dialog',
  templateUrl: './pick-user-dialog.component.html',
  styleUrls: ['./pick-user-dialog.component.scss']
})
export class PickUserDialogComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<PickUserDialogComponent>) {}
  
  
  ngOnInit(): void {
  }
  
}
