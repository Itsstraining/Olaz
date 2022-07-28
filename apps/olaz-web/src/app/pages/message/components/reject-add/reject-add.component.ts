/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore'
import { UserService } from '../../../../services/user.service';
import { MessageLogService } from '../../../../components/message-log';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'olaz-reject-add',
  templateUrl: './reject-add.component.html',
  styleUrls: ['./reject-add.component.scss'],
  providers: [MessageLogService]
})
export class RejectAddComponent implements OnInit {

  constructor(public fireStore: Firestore, private UserService: UserService, private MatDialog: MatDialog,
    private MessageLogService: MessageLogService) { }

  ngOnInit(): void {
    this.UserService.user$.subscribe(user => {
      // console.log(user)
      this.myID = user.id;
      this.getAllRequests(this.myID)
    })
    this.UserService.suggestUsers().subscribe(user => {
      console.log(user)
      this.listOfFriend = user
    })
  }
  listOfFriend: any = [];
  public myID: any

  public requestStatus = "Chưa kết bạn";

  toggleRequest(check: boolean, frID: string) {
    // console.log("check:::::" + check)
    // console.log(`myID:::::${myID}`)
    // console.log(`frID::::::${frID}`)
    this.requestStatus = "Đang kết bạn";
    this.UserService.toggleRequest(check, frID, this.myID).subscribe(res => {
      if (!res) return
      console.log(res)
      this.requestStatus = "Kết bạn thành công"
      this.MessageLogService.openSnackBar("Accepted friend request")
      // window.location.reload()
      this.MatDialog.closeAll();
    })
  }

  public request: any = [];
  public _user: any;
  async getAllRequests(myID: string) {
    const user = await (await this.UserService.getUserByID(myID)).data();
    console.log(user)
    if (!user) return;
    user['requests'].map(async (requestId: string, index: number) => {
      // console.log(requestId)
      user['requests'][index] = await (await this.UserService.getUserByID(requestId)).data();
    })
    this.request = user['requests']
  }
  addFriend(frID: string) {
    if (this._user) {
      this.UserService.sendRequest(this._user.id, frID).subscribe((response) => {
        console.log(response);
      })
    } else {
      console.log("user:null")
    }
  }
}
