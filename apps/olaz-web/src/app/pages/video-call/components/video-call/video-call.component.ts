import { Component, OnInit, } from '@angular/core';
import { doc, Firestore, collection, addDoc, setDoc, docData, getDoc, collectionChanges, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'olaz-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements OnInit {
  constructor(public fs: Firestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.init();
    this.route.params.subscribe(params => {
      this.docId = params['id'];
      this.getData();
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

    localvideo.srcObject = this.localStream;
    remoteVideo.srcObject = this.remoteStream;
  }
  async startCall() {
    this.callRef = collection(this.fs, 'calls');
    this.offerDocRef = collection(doc(this.callRef, this.inputCall), 'offerCandidates');
    this.ansDocRef = collection(doc(this.callRef, this.inputCall), 'answerCandidates');

    const offerDescription = await this.pc.createOffer();
    this.pc.onicecandidate = (event) => {
      event.candidate && addDoc(this.offerDocRef, event.candidate.toJSON());
    }
    await this.pc.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }

    await setDoc(doc(this.callRef, this.inputCall), { offer });

    docData(doc(this.callRef, this.inputCall)).subscribe((data: any) => {
      if (!this.pc.currentRemoteDescription && data!.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.pc.setRemoteDescription(answerDescription);
      }
      collectionChanges(this.ansDocRef).subscribe((data) => {
        data.forEach((doc) => {
          if (doc.type === 'added') {
            const candidate = new RTCIceCandidate(doc.doc.data());
            this.pc.addIceCandidate(candidate);
          }
        })
      })
    });
  }

  async answerCall() {
    this.callRef = collection(this.fs, 'calls');
    this.offerDocRef = collection(doc(this.callRef, this.inputAnswer), 'offerCandidates');
    this.ansDocRef = collection(doc(this.callRef, this.inputAnswer), 'answerCandidates');

    const callRef = collection(this.fs, 'calls');
    const callDoc = doc(callRef, this.inputAnswer);
    const ansDocRef = collection(callDoc, 'answerCandidates');

    this.pc.onicecandidate = ((event) => {
      event.candidate && addDoc(ansDocRef, event.candidate.toJSON());
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

  listNAme = doc(collection(this.fs, 'names'))

  input() {
    setDoc(this.listNAme, {
      name: "trong"
    })
  }

  async getData() {
    console.log(this.docId);
    let docRef = doc(collection(this.fs, 'names'), this.docId)
    await getDoc(docRef).then(data => {
      console.log(data.data());
    });
  }
}

