/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFowardComponent } from '../message/components/dialog-foward/dialog-foward.component';
import { CreateRoomComponent } from '../message/components/dialog-create-room/create-room.component';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message/message.service';
import { RoomService } from '../../services/message/room.service';
import {
  doc,
  collection,
  collectionData,
  addDoc,
  Firestore,
  getDoc,
  setDoc,
  docData,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RejectAddComponent } from './components/reject-add/reject-add.component';
import { ActivatedRoute } from '@angular/router';
import { idToken } from '@angular/fire/auth';
import { MessageLogService } from '../../components/message-log';
import { VideoService } from '../../services/video-call/video.service';
@Component({
  selector: 'olaz-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [MessageLogService],
})
export class MessageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private UserService: UserService,
    public fireStore: Firestore,
    private MessageService: MessageService,
    private RoomService: RoomService,
    private route: ActivatedRoute,
    private Router: Router,
    private _message: MessageLogService,
    private VideoService: VideoService
  ) { }
  public myId!: string;
  public room: any;
  public roomId: string = ''
  public rooms: any = []

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

  user!: any
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {

    this.UserService.user$.subscribe((user) => {
      if (!user) return

      this.user = user
      this.myId = user.id;
      this.UserService.notifyCount(this.myId).subscribe((user: any) => {
        if (!user) return;
        // console.log(user.requests.length);
      });
      this.UserService.getListOfRoomId(user.id).subscribe((value) => {
        // console.log(value)
        value.map(async (roomId: any, i: number) => {
          const listOfRoomId: any = await this.RoomService.getRoomByIdPromise(roomId);
          value[i] = listOfRoomId;
          // console.log(listOfRoomId)
          if (listOfRoomId.name !== "") {
            return
          }
          else {
            for (let j = 0; j < listOfRoomId.users.length; j++) {
              if (listOfRoomId.users[j] !== this.myId) {
                // console.log(listOfRoomId.users[j]) //ban minh
                let user: any = (await this.UserService.getUserByID(listOfRoomId.users[j])).data()
                // console.log(user)
                listOfRoomId.name = user.displayName;
                listOfRoomId.image = user.photoURL
                listOfRoomId.incall = user.incall;
                return
              }
            }
          }
        })
        this.rooms = value
      })
    });
    this.UserService.user$.subscribe(
      user => {
        if (!user) return;
        if (user.rooms.length === 0) {
          this.message = "Vui lòng kết bạn!"
          return;
        } else {
          this.route.params.subscribe(params => {
            // console.log(params['roomId'])
            if (!params['roomId']) return
            this.messages = [];
            this.getRoomId(params['roomId'], user.token)
            this.roomId = params['roomId']
          })
        }
      }
    )
  }

  public message: string = "Loading...";

  public messages: any = [];

  async getRoomId(id: string, token: string) {

    const isCheck = await this.RoomService.checkRoom(id, token)?.toPromise();

    if (!isCheck) {
      this._message.openSnackBar("You are not in this chat!");
      this.message = "You do not have access to this chat!";
      return;
    }

    this.RoomService.getRoomById(id).subscribe((room: any) => {
      if (!room) {
        this._message.openSnackBar("This room is not exist!");
        this.message = "This chat is not exits!"
        return;
      }

      if (room.name == "" && room.image == "") {
        room.users.map(async (user: any) => {
          if (user != this.myId) {
            let _friend: any = await (await this.UserService.getUserByID(user)).data();
            room.name = _friend.displayName;
            room.image = _friend.photoURL;
            return;
          }
        })
      }

      this.room = room;
      this.message = ""
    });

    this.RoomService.getMessagesInRoom(id).subscribe((messages: any) => {
      if (!messages) {
        return;
      }
      messages.map(async (message: any) => message.userId = await this.UserService.getUserByID(message.userId))
      messages.sort((a: any, b: any) => {
        return a.createdTime - b.createdTime
      })
      this.messages = messages;
      console.log(messages);
    });
  }

  openDialogFw() {
    const dialogRef = this.dialog.open(DialogFowardComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCreatRoom() {
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async sendMessage(content: string, image: string, type: string) {
    if (!this.myId || content == '') return;
    this.MessageService.sendMessage(
      content,
      image,
      type,
      this.myId,
      this.roomId,
    ).subscribe((res) => {
      console.log(res);
    });
  }

  content = '';
  image = '';

  onKeydown(event: any) {
    if (event.key == 'Enter') {
      let type: string = '';

      if (this.content) {
        type = 'text';
      } else {
        type = 'url';
      }

      this.sendMessage(this.content, this.image, type);
      this.content = '';
      this.image = '';
    }
  }

  handleError(e: any) {
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }

  onClickTask(roomId: any) {
    // this.taskService.roomId = roomId;
    localStorage.setItem('roomId', roomId)
    this.Router.navigate([`/ownspace/m/${roomId}/task`])
  }

  changeMessage(idMessage: string) {
    this.Router.navigate([`ownspace/m/${idMessage}`]);
  }

  selectedFile!: File;
  async onFileSelectedEvent(event: any) {
    this.selectedFile = event.target.files[0]
    const url: string = await this.MessageService.uploadImage(this.selectedFile);

    this.MessageService.sendMessage(
      "",
      url,
      "image",
      this.myId,
      this.roomId,
    ).subscribe((res) => {
      console.log(res);
    });
  }
  async clickCall(incall: boolean) {
    if (!incall) {
      if (this.UserService.userInfoFb$.value.incall) {
        alert("You already in a call with someone else")
      } else {
        let userID;
        this.room.users.forEach((user: any) => {
          if (user != this.myId) {
            userID = user
          }
        })
        this.callRequestRef = collection(this.fireStore, 'calls');
        await addDoc(this.callRequestRef,
          {
            owner: { id: this.UserService.user.id, camOn: true, micOn: true },
            opponent: { id: userID, camOn: true, micOn: true }
          }
        ).then((data) => {
          this.VideoService.updateUserStatus(this.UserService.userInfoFb$.value.id).subscribe(() => {
            const url = this.Router.serializeUrl(
              this.Router.createUrlTree([`ownspace/call/call/${data.id}`])
            );
            window.open(url, '_blank');
          })
        })
      }
    } else {
      alert("User is in a call")
    }
  }


}
function token(content: string, image: string, type: string, myId: string, roomId: string, token: any) {
  throw new Error('Function not implemented.');
}

