/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'olaz-dialog-friend',
  templateUrl: './dialog-friend.component.html',
  styleUrls: ['./dialog-friend.component.scss'],
})
export class DialogFriendComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public users:any = [
    {
      id: 1,
      email: "trong@gmail.com",
      requests: []
      
    },
    {
      id: 2,
      email: "dat@gmail.com",
      requests: []
    },
    {
      id: 3,
      email: "tin@gmail.com",
      requests: []
    }
  ];
  public email!: string;


  findUser(){
    for(let i=0; i<this.users.length;i++){
      if(this.users[i].email == this.email){
        // console.log(this.users[i])
        this.users[i].requests.push(3)
      }
    }
    // console.log(this.users)
    this.users.map((user:any, i: number)=>{
      user['requests'].map((value:any, j: number)=>{
        this.users[i].requests[j] = this.findUserId(this.users[i].requests[j])
      })
    })
    console.log(this.users)
    // for(let i = 0 ;i<this.users.length; i++){
    //   console.log(this.users[i])
    //   this.users[i].requests.map((value:any, index: number)=>{
    //     this.users[i].requests[index] = this.findUserId(this.users[i].requests[index])
    //   })
    // }
  }
  onKeydown(event:any){
    if(event.key=="Enter"){
      this.findUser()
    }
  }
  addFriend(){
  }

  findUserId(id:string){
    for(let i=0; i<this.users.length;i++){
      if(this.users[i].id == id){
        return this.users[i];
      }
    }
  }

}
