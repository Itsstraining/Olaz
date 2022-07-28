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
    private _message: MessageLogService
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
      console.log(user)

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
                return
              }
            }
          }
        })
        this.rooms = value
        // console.log(this.rooms)
      })
    });
    this.UserService.user$.subscribe(
      user => {
        if (!user) return;
        console.log(user);
        if (user.rooms.length === 0) {
          this.message = "Vui lòng kết bạn!"
          return;
        } else {
          this.route.params.subscribe(params => {
            // console.log(params['roomId'])
            if (!params['roomId']) return
            this.getRoomId(params['roomId'], user.token)
            this.roomId = params['roomId']
          })
        }
      }
    )
  }

  public message: string = "Loading...";
  async getRoomId(id: string, token: string) {

    const isCheck = await this.RoomService.checkRoom(id, token)?.toPromise();

    if (!isCheck) {
      console.log("Bạn không có quyền truy cập vào phòng này!")
      this.message = "Bạn không có quyền truy cập vào phòng này!"
      return;
    }

    this.RoomService.getRoomById(id).subscribe((room: any) => {
      // console.log(room.messages)
      if (!room) {
        console.log(`Room tim ko dc`)
        this.message = "Phòng không tồn tại!"
        return;
      }

      room.messages.map(async (message: string, i: number) => {
        // room['messages'].map(async (value: any, j: number)=>{
        //   room.message[i].messages[j] = await this.MessageService.getMessageById(room.message[i].messages[j])
        // })

        const mess: any = await this.MessageService.getMessageById(message);

        room.messages[i] = mess;

        const userId = mess.userId;

        // console.log(userId)

        let user = await (await this.UserService.getUserByID(userId)).data();
        // console.log(user)
        room.messages[i].userId = user;
      });

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

  // roomId = '1657280749904';
  async sendMessage(content: string, image: string, type: string) {
    // const messId = Date.now().toString()
    //  setDoc(
    //     doc(this.fireStore, 'messages', messId),
    //     {
    //       userId: this.myID,
    //       id: messId,
    //       content: content,
    //       image: image,
    //       type: type,
    //       createdTime: messId
    //     });
    //     updateDoc(doc(this.fireStore, 'rooms', this.roomId), {
    //       messages: arrayUnion(messId)
    //     })
    //     await Promise.all([
    //       setDoc,
    //       updateDoc
    //     ])
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
    console.log(e)
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }

  onClickTask(roomId:any){
    // this.taskService.roomId = roomId;
    localStorage.setItem('roomId',roomId)
    this.Router.navigate(['/ownspace/task'])
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
  async clickCall() {

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
      const url = this.Router.serializeUrl(
        this.Router.createUrlTree([`ownspace/call/call/${data.id}`])
      );

      window.open(url, '_blank');
      // this.Router.navigate([`ownspace/call/call/${data.id}`])
    })
  }

}
function token(content: string, image: string, type: string, myId: string, roomId: string, token: any) {
  throw new Error('Function not implemented.');
}

