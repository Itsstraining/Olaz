/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
// import { collection, collectionData, addDoc, Firestore, getDoc, doc, setDoc} from '@angular/fire/firestore'
// import { updateDoc } from '@firebase/firestore';

@Component({
  selector: 'olaz-dialog-friend',
  templateUrl: './dialog-friend.component.html',
  styleUrls: ['./dialog-friend.component.scss'],
})
export class DialogFriendComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  
  email= "";

  users = [
    {
      email: "ford@gmail.com"
    },
    {
      email: "lexus@gmail.com"
    },
    {
      email: "honda@gmail.com"
    },
    {
      email: "kia@gmail.com"
    }
  ]

  // findUser() {
  //   for(let i =0; i<= this.users.length;i++){
  //     if( )
  //   }
  // }

}
