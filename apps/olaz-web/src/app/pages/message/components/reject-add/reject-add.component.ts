/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore'
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'olaz-reject-add',
  templateUrl: './reject-add.component.html',
  styleUrls: ['./reject-add.component.scss'],
})
export class RejectAddComponent implements OnInit {

  constructor(public fireStore: Firestore, private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.user$.subscribe(user=>{
      // console.log(user)
      this.myID = user.id;    
      this.getAllRequests(this.myID)
    })
    this.UserService.suggestUsers().subscribe(user=>{
      console.log(user)
    })
   }

  public myID: any
  toggleRequest(check: boolean, frID: string){
    // console.log("check:::::" + check)
    // console.log(`myID:::::${myID}`)
    // console.log(`frID::::::${frID}`)
    this.UserService.toggleRequest(check, frID, this.myID).subscribe(res=>{
      console.log(res)
    })
  }

  public request: any = [];

  async getAllRequests(myID:string){
    const user = await (await this.UserService.getUserByID(myID)).data();
    console.log(user)
    if(!user) return;
    user['requests'].map( async (requestId: string, index: number) =>{
      // console.log(requestId)
      user['requests'][index] = await (await this.UserService.getUserByID(requestId)).data();
    })
    this.request = user['requests']
  }
}
