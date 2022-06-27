import { Component, OnInit } from '@angular/core';
// import { doc, Firestore, collection, addDoc, setDoc, docData, getDoc, collectionChanges, updateDoc } from '@angular/fire/firestore';
// import { StoreDevtoolsConfig } from '@ngrx/store-devtools';

@Component({
  selector: 'olaz-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  checkScreen = false;
  checkMic = false;

  screenOff() {
    this.checkScreen = !this.checkScreen;
  }

  micOff() {
    this.checkMic = !this.checkMic;
  }

  // title = 'Peer';
  // localStream!: MediaStream;
  // remoteStream!: MediaStream;
  // servers = {
  //   iceServers: [
  //     {
  //       urls: ['stun:stun.l.google.com:19302', 'stun:stun2.l.google.com:19302']
  //     },
  //   ],
  //   iceCandidatePoolSize: 10,
  // }

  // callRef: any;
  // offerDocRef: any;
  // ansDocRef: any;
  // inputCall!: string;
  // inputAnswer!: string;
  // pc = new RTCPeerConnection(this.servers);

  // async startCall(){
  //   this.callRef = collection(this.fs, 'calls');
  //   this.offerDocRef = collection(doc(this.callRef, this.inputCall), 'offerCandidates');
  //   this.ansDocRef = collection(doc(this.callRef, this.inputCall), 'answerCandidates');

  //   const offerDescription = await this.pc.createOffer();
  //   this.pc.onicecandidate = (event) => {
  //     event.candidate && addDoc(this.offerDocRef, event.candidate.toJSON());
  //   }

  //   await this.pc.setLocalDescription(offerDescription);
  //   const offer = {
  //     sdp: offerDescription.sdp,
  //     type: offerDescription.type,
  //   }

  //   await setDoc(doc(this.callRef, this.inputCall), {offer});

  //   docData(doc(this.callRef, this.inputCall)).subscribe((data: any) =>{
  //     if(!this.pc.currentRemoteDescription && data)
  //   });


}

