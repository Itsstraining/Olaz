/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { addDoc, doc, collection, collectionChanges, collectionData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'olaz-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  userID!: string;
  callRequestRef: any;

  servers = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      },
    ],
    iceCandidatePoolSize: 10,
  }
  pc = new RTCPeerConnection(this.servers);
  constructor(public db: Firestore, public UsrSv: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  //button call
  async clickCall() {
    this.callRequestRef = collection(this.db, 'calls');
    await addDoc(this.callRequestRef, { ownerID: this.UsrSv.user.id, opponentID: this.userID }).then((data) => {
      this.router.navigate([`call/call/${data.id}`])
    })


  }
}
