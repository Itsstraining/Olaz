/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion, arrayRemove} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fs: Firestore
  ) { }

  private readonly refUser = collection(this.fs, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);
  }

  public notifyCount(myID:string){
    return docData(doc(collection(this.fs, 'users'), myID));
  }

  async toggleRequest(check:boolean, frID: string, myID: string){
    if(check){
      await updateDoc(doc(this.fs, 'users', myID), {
        friends: arrayUnion(frID),
        requests: arrayRemove(frID)
      })
    }else{
      //do something here...
    }
  }
}
