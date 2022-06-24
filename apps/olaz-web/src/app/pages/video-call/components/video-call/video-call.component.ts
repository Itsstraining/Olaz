import { Component, OnInit } from '@angular/core';

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

  
}
