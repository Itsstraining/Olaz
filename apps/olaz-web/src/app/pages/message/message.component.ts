/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFowardComponent } from '../message/components/dialog-foward/dialog-foward.component';
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
import { RejectAddComponent } from './components/reject-add/reject-add.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'olaz-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private UserService: UserService,
    public fireStore: Firestore,
    private MessageService: MessageService,
    private RoomService: RoomService,
    private route: ActivatedRoute
  ) {}
  public myId!: string;
  public room: any;
  public roomId: string = ''
public rooms = []
public nameRoom: string = ''
public imageRoom: string = ''
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params['roomId'])
      if(!params['roomId'])  return
      this.getRoomId(params['roomId'])
      this.roomId = params['roomId']
    })
    this.UserService.user$.subscribe((user) => {
      console.log(user);
      if (!user) return;
      this.myId = user.id;
      this.UserService.notifyCount(this.myId).subscribe((user: any) => {
        if (!user) return;
        console.log(user.requests.length);
      });
      this.UserService.getListOfRoomId(user.id).subscribe((value)=>{
        console.log(value)
        value.map(async (roomId:any, i: number)=>{
          const listOfRoomId: any = await this.RoomService.getRoomByIdPromise(roomId);
          value[i] = listOfRoomId;
          console.log(listOfRoomId)
          if (listOfRoomId.name !== ""){
            return this.nameRoom = listOfRoomId.name, this.imageRoom = listOfRoomId.image
          }
          else{
            for(let j = 0; j < listOfRoomId.users.length; j++){
              if(listOfRoomId.users[j] !== this.myId){
               console.log(listOfRoomId.users[j]) //ban minh
               let user:any = (await this.UserService.getUserByID(listOfRoomId.users[j])).data()
               console.log(user)
               return this.nameRoom = user.displayName, this.imageRoom = user.photoURL
              }  
            }
          }
        })
        this.rooms = value
        console.log(this.rooms)
      })
    });
  }

  getRoomId(id: string){
    this.RoomService.getRoomById(id).subscribe((room: any) => {
      // console.log(room.messages)
      console.log(room);
      if(!room) {
        console.log(`Room tim ko dc`)
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
      this.room = room;
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
    if (!this.myId) return;
    this.MessageService.sendMessage(
      content,
      image,
      type,
      this.myId,
      this.roomId
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
}
