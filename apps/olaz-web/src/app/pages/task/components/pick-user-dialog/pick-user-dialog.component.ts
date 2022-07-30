/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'olaz-pick-user-dialog',
  templateUrl: './pick-user-dialog.component.html',
  styleUrls: ['./pick-user-dialog.component.scss']
})
export class PickUserDialogComponent implements OnInit {
  choseParticipant:any

  constructor( public dialogRef: MatDialogRef<PickUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
  ngOnInit(): void {
  }

  handleError(e: any) {
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }
}
