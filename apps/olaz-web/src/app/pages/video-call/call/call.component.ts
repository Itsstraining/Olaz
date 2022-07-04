/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { addDoc, doc, collection, collectionChanges, collectionData, Firestore } from '@angular/fire/firestore';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'olaz-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  userID!: string;
  callRequestRef: any;
  constructor(public db: Firestore, public UsrSv: UserService) { }

  ngOnInit(): void {
  }

  async clickCall() {
    this.callRequestRef = collection(this.db, 'calls');
    await addDoc(this.callRequestRef, {
      ownerId: this.UsrSv.user.id,
      opponentId: this.userID
    }).then((data) => {
      console.log(data.id)
    });

  }
}
