/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { addDoc, doc, collection, collectionChanges, collectionData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DialogCallComponent} from '../components/dialog-call/dialog-call.component'


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
  constructor(public db: Firestore, public UsrSv: UserService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  //button call
  async clickCall() {
    this.callRequestRef = collection(this.db, 'calls');
    await addDoc(this.callRequestRef,
      {
        owner: { id: this.UsrSv.user.id, camOn: true, micOn: true },
        opponent: { id: this.userID, camOn: true, micOn: true }
      }
    ).then((data) => {
      this.router.navigate([`ownspace/call/call/${data.id}`])
    })
  }
  openDialogCreatRoom() {
    const dialogRef = this.dialog.open(DialogCallComponent, {
      width: 'fit-content', height: 'fit-content',
    });
}
}
