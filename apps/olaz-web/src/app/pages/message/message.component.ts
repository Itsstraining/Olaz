/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFowardComponent } from '../message/components/dialog-foward/dialog-foward.component';
import { DialogFriendComponent } from '../message/components/dialog-friend/dialog-friend.component';
import { UserService } from '../../services/user.service';
import {doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc} from '@angular/fire/firestore'

@Component({
  selector: 'olaz-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private UserService: UserService,
    public fireStore: Firestore
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    // this.UserService.getUsers().subscribe(
    //   res => console.log(res)
    // );
    this.UserService.notifyCount(this.myID).subscribe(
      (user:any) => console.log(user.requests.length)
    )
  }

  openDialogFw() {
    const dialogRef = this.dialog.open(DialogFowardComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAddFr() {
    const dialogRef = this.dialog.open(DialogFriendComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  myID="hnbBbNtPTMIBxsLCBLJj"
  async toggleRequest(){
    await this.UserService.toggleRequest(true,'mi10EPz75Hdf128XpNwe','hnbBbNtPTMIBxsLCBLJj')
  }
}
