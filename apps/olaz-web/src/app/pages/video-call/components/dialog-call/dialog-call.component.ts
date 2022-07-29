import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoService } from '../../../../services/video-call/video.service';
import { UserService } from 'apps/olaz-web/src/app/services/user.service';
import { docData, Firestore, getDoc, doc } from '@angular/fire/firestore';
@Component({
  selector: 'olaz-dialog-call',
  templateUrl: './dialog-call.component.html',
  styleUrls: ['./dialog-call.component.css']
})
export class DialogCallComponent implements OnInit {
  audio: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router, public videoSrv: VideoService, public userSrv: UserService, private fs: Firestore) {

  }

  ownerInfo = {
    name: '',
    photoURL: '',
  }
  opponentInfo = {
    name: '',
    photoURL: '',
  }

  ngOnInit(): void {
    this.audio = <HTMLAudioElement>document.getElementById('audio');
    this.audio.src = '../../../../../assets/audios/incoming-call.wav';
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
  }
  async answerCall() {
    this.audio.pause();
    this.audio.currentTime = 0;

    this.videoSrv.updateUserStatus(this.userSrv.userInfoFb$.value.id).subscribe(() => {

      const url = this.route.serializeUrl(
        this.route.createUrlTree([`ownspace/call/call/${this.data.idRoom}`])

      );
      window.open(url, '_blank');
    })

  }

  deleteCall() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.videoSrv.delData(this.data.idRoom).subscribe(() => {
    });
  }

  // getUsrImg(data: any){
  //   getDoc(doc(this.fs, `users/${data['opponent']['id']}`)).then(async (data) => {
  //     let opponent = (await getDoc(doc(this.fs, `users/${data['opponent']['id']}`))).data()
  //     let owner = (await getDoc(doc(this.fs, `users/${data['owner']['id']}`))).data()
  //   })


}

