/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { collection, collectionData, addDoc, Firestore, getDoc, doc, setDoc, arrayUnion} from '@angular/fire/firestore'
import { updateDoc } from '@firebase/firestore';

@Component({
  selector: 'olaz-dialog-friend',
  templateUrl: './dialog-friend.component.html',
  styleUrls: ['./dialog-friend.component.scss'],
})
export class DialogFriendComponent implements OnInit {
  constructor( private userService: UserService, public fireStore: Firestore ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(user=>{
      this._user = user;
    })
    // this.userService.suggestUsers().subscribe(user =>{
    //   console.log(user)
    //   this.listOfFriend.push(user)
    // })
  }

  public _user: any;
  listOfFriend: any = [];
  email!: string;
  listOfEmail: any = []; 

  findSuggestUser(){
    this.userService.getUsers().subscribe(user=>{
      console.log(user)
      this.listOfFriend =user;
    },
    err=> {
      console.log(err.error.text);
    }
    )
  }
 async findUser() {
    //  this.userService.getUsers().subscribe(
    //   res => {
    //     // console.log(res)
    //     this.listOfEmail = [];
    //     res.map(user=> {
    //       if(user.email == this.email){
    //         console.log(user);
    //         this.listOfEmail.push(user);
    //       }        
    //     })
    //   }
    // );
    this.listOfEmail = await this.userService.getUserByEmail(this.email).toPromise()
    console.log(this.listOfEmail)
    const myListFriend:any= await (await this.userService.getUserByID(this._user.id)).data()
    console.log(myListFriend)
    for(let i = 0; i<myListFriend.friends.length; i++){
      for(let j = 0; j<this.listOfEmail.length; j++){
        if(myListFriend.friends[i] == this.listOfEmail[j].id){
          console.log(true)
      }
    }
    }
  }

  // getMyListFriend(){
  //   getDoc(doc())
  // }
  
  onKeydown(event:any){
    if(event.key=="Enter"){
      this.findUser()
    }
  }
  // findUser(){
  //   for(let i=0; i<this.users.length;i++){
  //     if(this.users[i].email == this.email){
  //       console.log(this.users[i])
  //       this.users[i].requests.push(3)
  //     }
  //   }
  //   console.log(this.users)
  //   this.users.map((user:any, i: number)=>{
  //     user['requests'].map((value:any, j: number)=>{
  //       this.users[i].requests[j] = this.findUserId(this.users[i].requests[j])
  //     })
  //   })
  //   console.log(this.users)
  //   for(let i = 0 ;i<this.users.length; i++){
  //     console.log(this.users[i])
  //     this.users[i].requests.map((value:any, index: number)=>{
  //       this.users[i].requests[index] = this.findUserId(this.users[i].requests[index])
  //     })
  //   }
  // }

  // findUserId(id:string){
  //   for(let i=0; i<this.users.length;i++){
  //     if(this.users[i].id == id){
  //       return this.users[i];
  //     }
  //   }
  // }
  
  addFriend(frID:string){
    // const myID = "mi10EPz75Hdf128XpNwe";
    if(this._user){
      this.userService.sendRequest(this._user.id, frID).subscribe((response)=>{
        console.log(response);
      })
    }else{
      console.log("user::: null")
    }
    // updateDoc(doc(this.fireStore,'users', frID),{
    //   requests: arrayUnion(this.myID)
    // })
 
  }


}
