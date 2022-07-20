/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Inject } from '@angular/core';
import { doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore'
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData{
    animal: string;
    name: string;
}

@Component({
  selector: 'olaz-reject-add',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {

  constructor(public fireStore: Firestore, private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.user$.subscribe(user=>{
      console.log(user)
    })
   }
}
