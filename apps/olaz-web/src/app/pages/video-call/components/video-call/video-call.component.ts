import { Component, OnInit, } from '@angular/core';
import { doc, Firestore, collection, addDoc, setDoc, docData, getDoc, collectionChanges, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { UserService } from '../../../../services/user.service';
import { VideoService } from '../../../../services/video-call/video.service';


@Component({
  selector: 'olaz-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements OnInit {
  constructor(public fs: Firestore, private route: ActivatedRoute, public userSrv: UserService, public videoSrv: VideoService, public router: Router) { }

  ngOnInit(): void {
    this.init();
    this.route.params.subscribe(params => {
      this.docId = params['id'];
      this.startCall();
    });
    window.addEventListener('unload', () => {
      navigator.sendBeacon(`${this.videoSrv.serverURL}/delete-Item?id=${this.docId}`);
      // Check if any of the input fields are filled
      // Cancel the event and show alert that
      // the unsaved changes would be lost
    });
  }

  myFunction() {
    document.getElementById("menuBtnCalls")!.classList.toggle("menu-items");
  }
  onOffScreen = true;
  opponentStatus = {
    micOn: true,
    camOn: true,

  }
  ownerStatus = {
    micOn: true,
    camOn: true,

  }
  checkScreen = true;
  checkMic = true;
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
  docId: any;
  callInf: any;
  stopload = false;
  camInProgress = false;
  micInProgress = false;
  public isLoaded: any
  ownerInfo = {
    name: '',
    photoURL: '',
  }
  opponentInfo = {
    name: '',
    photoURL: '',
  }
  pc = new RTCPeerConnection(this.servers);
  userList = [];
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

    this.pc.oniceconnectionstatechange = () => {
      if (this.pc.iceConnectionState == 'disconnected') {
        this.deleteRoom();
      }
    }

    docData(doc(this.fs, `calls/${this.docId}`)).subscribe(async (data) => {
      if (data['offer'] != null) {
        this.isLoaded = true
      }
      console.log(this.ownerInfo)
      let opponent = (await getDoc(doc(this.fs, `users/${data['opponent']['id']}`))).data();
      let owner = (await getDoc(doc(this.fs, `users/${data['owner']['id']}`))).data();
      this.callInf = data;
      if (this.userSrv.user.id === this.callInf.owner.id) {

        this.opponentInfo.name = opponent!['displayName'];
        this.opponentInfo.photoURL = opponent!['photoURL'];
        this.ownerInfo.name = owner!['displayName'];
        this.ownerInfo.photoURL = owner!['photoURL'];

        this.opponentStatus.camOn = data['opponent']['id'];
        this.opponentStatus.micOn = data['opponent']['id'];
        this.ownerStatus.camOn = data['owner']['id'];
        this.ownerStatus.micOn = data['owner']['id'];

      } else {
        this.opponentInfo.name = owner!['displayName'];
        this.opponentInfo.photoURL = owner!['photoURL'];
        this.ownerInfo.name = opponent!['displayName'];
        this.ownerInfo.photoURL = opponent!['photoURL'];
        this.opponentStatus.camOn = data['owner']['id'];
        this.opponentStatus.micOn = data['owner']['id'];
        this.ownerStatus.camOn = data['opponent']['id'];
        this.ownerStatus.micOn = data['opponent']['id'];
      }
    });

    collectionChanges(collection(this.fs, 'calls')).subscribe((data) => {
      data.forEach(async (doc) => {
        if (doc.type === 'removed' && doc.doc.id === this.docId) {
          await alert("Cuộc gọi đã kết thúc");
          window.close();
        }
      })
    })
  }

  deleteRoom() {
    this.videoSrv.delData(this.docId).subscribe((data: any) => {
      console.log(data);
    });
  }

  async startCall() {
    this.callRef = collection(this.fs, 'calls');
    let userCallDoc = doc(this.fs, `calls/${this.docId}`);
    let ownerID = (await getDoc(userCallDoc)).data()!['owner']['id'];
    console.log(ownerID);

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
      await updateDoc(userCallDoc, { offer });
      docData(userCallDoc).subscribe((data: any) => {
        if (!this.pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          this.pc.setRemoteDescription(answerDescription);
        }
      });

      collectionChanges(ansdocRef).subscribe((data) => {
        data.forEach((doc) => {
          if (doc.type === 'added') {
            const candidate = new RTCIceCandidate(doc.doc.data());
            this.pc.addIceCandidate(candidate);
          }
        })
      })
    } else {
      if (this.isLoaded == true) {
        this.answerCall();
      }
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

  turnWebCam() {
    this.camInProgress = true;
    this.checkScreen = !this.checkScreen;
    console.log(this.ownerInfo.photoURL)
    let status = { micOn: this.checkMic, camOn: this.checkScreen }
    this.videoSrv.updateData(this.docId, this.userSrv.user.id, status).subscribe(() => {
      this.camInProgress = false;
    })
    this.localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    })
  }

  turnMic() {
    this.checkMic = !this.checkMic;
    this.micInProgress = true;
    let status = { micOn: this.checkMic, camOn: this.checkScreen }
    this.videoSrv.updateData(this.docId, this.userSrv.user.id, status).subscribe(() => {
      this.micInProgress = false;
    })
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    })
  }

  endCall() {
    this.videoSrv.delData(this.docId).subscribe(() => {
    });
  }
}

