/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { collection, collectionData, addDoc, Firestore, getDoc, doc, setDoc, arrayUnion } from '@angular/fire/firestore'
import { updateDoc } from '@firebase/firestore';
import { MessageLogService } from '../../../../components/message-log';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'olaz-dialog-friend',
  templateUrl: './dialog-friend.component.html',
  styleUrls: ['./dialog-friend.component.scss'],
  providers: [MessageLogService],
})
export class DialogFriendComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
     public fireStore: Firestore, private _MessageLogService: MessageLogService) { }

  isFriend:any =[]
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this._user = user;
      this.isFriend = user.friends;
    })
  }

  public _user: any;
  listOfFriend: any = [];
  email!: string;
  listOfEmail: any = [];

  findSuggestUser() {
    this.userService.getUsers().subscribe(user => {
      console.log(user)
      this.listOfFriend = user;
    },
      err => {
        console.log(err.error.text);
      }
    )
  }

  handleError(e: any) {
    console.log(e)
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }

  async findUser() {
    this.listOfEmail = []
    const listOfEmail:any = await this.userService.getUserByEmail(this.email).toPromise()
    const myListFriend: any = await (await this.userService.getUserByID(this._user.id)).data()
    for (let i = 0; i < myListFriend.friends.length; i++) {
      for (let j = 0; j < listOfEmail.length; j++) {
        if (myListFriend.friends[i] == listOfEmail[j].id) {
          this.listOfEmail.push(Object.assign(listOfEmail[j], { isF: true}))
        }
      }
      this.listOfEmail.push(Object.assign(listOfEmail[i], { isF: false}))
    }
    console.log(this.listOfEmail)
  }

  onKeydown(event: any) {
    if (event.key == "Enter") {
      this.findUser()
    }
  }
  isSent: boolean = false;
  addFriend(frID: string) {
    // const myID = "mi10EPz75Hdf128XpNwe";
    if (this._user) {
      this.userService.sendRequest(this._user.id, frID).subscribe((response) => {
        this._MessageLogService.openSnackBar("Sent successfully");
        this.isSent = true;
        this.dialog.closeAll()
      })
    } else {
      console.log("user::: null")
    }
  }


}
