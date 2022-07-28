
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { collection, collectionChanges, Firestore, getDoc, doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video-call/video.service';
import { DialogCallComponent } from '../video-call/components/dialog-call/dialog-call.component'
@Component({
  selector: 'olaz-todo',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  screenWidth = 0;
  collapsed = false;
  callRef: any

  constructor(public userService: UserService, private videoSrv: VideoService, public dialog: MatDialog, private fs: Firestore) {

  }

  ngOnInit(): void {
    this.userService.userInfoFb$.subscribe((user) => {

      console.log(user)
      if (user != null) {
        this.callRef = collection(this.fs, 'calls');
        collectionChanges(this.callRef).subscribe((data) => {
          data.forEach(async (docVal) => {
            if (docVal.type === 'added' && docVal.doc.data()['opponent']['id'] === user.id) {
              let userInCall = user.incall;
              if (!userInCall) {
                let owner = (await getDoc(doc(this.fs, `users/${docVal.doc.data()['owner']['id']}`))).data()!;
                this.openIncomingCallDialog(owner,docVal.doc.id);
              }
            }
          });
        });
      }
    })

  }


  isOpened(data: any): void {
    this.screenWidth = data.screenWidth;
    this.collapsed = data.collapsed;
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed == true) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed == false) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  openIncomingCallDialog(owner:any,idRoom:any) {
    const dialogRef = this.dialog.open(DialogCallComponent, {
      width: 'fit-content', height: 'fit-content',
      data: {userData:owner,idRoom:idRoom},

    });
  }
}
