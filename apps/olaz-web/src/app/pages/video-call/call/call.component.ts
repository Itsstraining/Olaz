/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { addDoc, doc, collection, collectionChanges, collectionData, Firestore, setDoc,updateDoc} from '@angular/fire/firestore';
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
  pc = new RTCPeerConnection(this.servers)
  constructor(public db: Firestore, public UsrSv: UserService) { }

  ngOnInit(): void {
  }

  async clickCall() {
    this.callRequestRef = collection(this.db, 'calls');
    await addDoc(this.callRequestRef, {
      ownerId: this.UsrSv.user.id,
      opponentId: this.userID
    }).then(async (data) => {
      const offerDescription = await this.pc.createOffer();
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      }
      console.log(new Date())
      let docRef = doc(this.db, `calls/${data.id}`)
      await updateDoc(docRef, { offer})
    });

  }
}
