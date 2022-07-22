/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'apps/olaz-web/src/app/services/user.service';

@Component({
  selector: 'olaz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public UserService:UserService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    ) { }
  userInfo = undefined;


  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
