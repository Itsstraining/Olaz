import { Component, OnInit, } from '@angular/core';
import { doc, Firestore, collection, addDoc, setDoc, docData, getDoc, collectionChanges, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'apps/olaz-web/src/app/services/user.service';


@Component({
  selector: 'olaz-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements OnInit {
  constructor(public fs: Firestore, private route: ActivatedRoute, public userSrv: UserService) { }

  ngOnInit(): void {
    this.init();
    this.route.params.subscribe(params => {
      this.docId = params['id'];
      this.startCall();
    });



  }

  myFunction() {
    document.getElementById("menuBtnCalls")!.classList.toggle("menu-items");
  }

  onOffScreen = true;
  checkScreen = true;
  checkMic = false;
  localStream!: MediaStream;
  remoteStream!: MediaStream;
  servers = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      },
    ],
    iceCandidatePoolSize: 10,
  }

  callRef: any;
  offerDocRef: any;
  ansDocRef: any;
  inputCall!: string;
  inputAnswer!: string;
  docId: any
  pc = new RTCPeerConnection(this.servers);

  screenOff() {
    this.checkScreen = !this.checkScreen;
    if (this.checkScreen) {
      let localvideo = <HTMLVideoElement>document.getElementById('user1video');
      localvideo.style.display = 'block';
      localvideo.srcObject = this.localStream;
    } else {
      let localvideo = <HTMLVideoElement>document.getElementById('user1video');
      localvideo.style.display = 'none';
    }
  }

  micOff() {
    this.checkMic = !this.checkMic;
  }

  onOff() {
    this.onOffScreen = !this.onOffScreen;
  }

  async init() {
    let localvideo = <HTMLVideoElement>document.getElementById('user1video');
    let remoteVideo = <HTMLVideoElement>document.getElementById('user2video');
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    this.remoteStream = new MediaStream();
    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream);
    })
    this.pc.ontrack = ((event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      })
    })
    this.pc.iceConnectionState
    this.pc.addEventListener('onconnectionstatechange ',event=>{
      if(this.pc.connectionState=='disconnected'){
        console.log('alo')
      }
    })
    this.pc.onconnectionstatechange = () => {
      const connectionStatus = this.pc.connectionState;
      if (["disconnected", "failed", "closed"].includes(connectionStatus)) {
          console.log("disconnected");
      }
  };


    localvideo.srcObject = this.localStream;
    remoteVideo.srcObject =  this.localStream;
  }

  async startCall() {
    this.callRef = collection(this.fs, 'calls');
    let userCallDoc = doc(this.fs, `calls/${this.docId}`)
    let ownerID = (await getDoc(userCallDoc)).data()!['ownerID']

    if (this.userSrv.user.id === ownerID) {
      this.offerDocRef = collection(doc(this.callRef, this.docId), 'offerCandidates');
      const ansdocRef = collection(userCallDoc, 'answerCandidates');
      const offerDescription = await this.pc.createOffer();
      this.pc.onicecandidate = (event) => {
        event.candidate && addDoc(this.offerDocRef, event.candidate.toJSON());
      }
      await this.pc.setLocalDescription(offerDescription);
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      }
      await setDoc(userCallDoc, { offer });
      docData(userCallDoc).subscribe((data: any) => {
        if (!this.pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          this.pc.setRemoteDescription(answerDescription)
        }
      });

      collectionChanges(ansdocRef).subscribe((data) => {
        data.forEach((doc) => {
          if (doc.type === 'added') {
            const candidate = new RTCIceCandidate(doc.doc.data());
            this.pc.addIceCandidate(candidate)
          }
        })
      })
    } else {
      this.answerCall()
    }
  }

  async answerCall() {
    this.callRef = collection(this.fs, 'calls');
    this.offerDocRef = collection(doc(this.callRef, this.docId), 'offerCandidates');
    this.ansDocRef = collection(doc(this.callRef, this.docId), 'answerCandidates');
    const callRef = collection(this.fs, 'calls');
    const callDoc = doc(callRef, this.docId);


    this.pc.onicecandidate = ((event) => {
      event.candidate && addDoc(this.ansDocRef, event.candidate.toJSON());
    });

    const callData = ((await getDoc(callDoc)).data());

    const offerDescription = callData!['offer'];
    await this.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await this.pc.createAnswer();

    await this.pc.setLocalDescription(answerDescription);

    const answer = {
      sdp: answerDescription.sdp,
      type: answerDescription.type
    }

    updateDoc(callDoc, { answer });
    collectionChanges(this.offerDocRef).subscribe((data) => {
      data.forEach((doc) => {
        if (doc.type === 'added') {
          let data = doc.doc.data();
          this.pc.addIceCandidate(new RTCIceCandidate(data));
        }
      })
    })
  }
}

