import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoService } from '../../../../services/video-call/video.service';
@Component({
  selector: 'olaz-dialog-call',
  templateUrl: './dialog-call.component.html',
  styleUrls: ['./dialog-call.component.css']
})
export class DialogCallComponent implements OnInit {
  audio: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router, public videoSrv: VideoService) {

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
    this.audio.currentTime=0;
    this.route.navigate([`ownspace/call/call/${this.data.idRoom}`]);
  }
  deleteCall() {
    this.audio.pause();
    this.audio.currentTime=0;
    this.videoSrv.delData(this.data.idRoom).subscribe(() => {
    });
  }
}
