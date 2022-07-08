/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFowardComponent } from '../message/components/dialog-foward/dialog-foward.component';
import { DialogFriendComponent } from '../message/components/dialog-friend/dialog-friend.component';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message/message.service';
import { RoomService } from '../../services/message/room.service';
import {doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion} from '@angular/fire/firestore'
import { RejectAddComponent } from './components/reject-add/reject-add.component';

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
    private MessageService:MessageService,
    private RoomService:RoomService
  ) { }
    public myId!: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    // this.UserService.getUsers().subscribe(
    //   res => console.log(res)
    // );
    this.UserService.user$.subscribe(
      user => {
        console.log(user)
        if(!user) return;
        this.myId = user.id;
        this.UserService.notifyCount(this.myId).subscribe(
          (user:any) => {
            if(!user) return
            console.log(user.requests.length)
          }
        )
      }
    )
    this.RoomService.getRoomById("1657280749904").subscribe(room=>{
      console.log(room)
    })
  
  }

  openDialogFw() {
    const dialogRef = this.dialog.open(DialogFowardComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAddFr() {
    const dialogRef = this.dialog.open(DialogFriendComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAddRj(){
    const dialogRef = this.dialog.open(RejectAddComponent,{
      width: '50%', height:'350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

roomId = "1657280749904"
 async sendMessage(content: string, image:string, type: string){
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
    if(!this.myId) return;
    this.MessageService.sendMessage(content,image,type,this.myId,this.roomId).subscribe(
      res => {
        console.log(res);
      }
    )
}

content = "";
image = "";
  onKeydown(event:any){
    if(event.key=="Enter"){
      let type: string= "";

      if(this.content){
        type = "text"
      }
      else{
        type = "url"
      }

      this.sendMessage(this.content, this.image, type);
      this.content = "";
      this.image = "";
    }
  }

}
