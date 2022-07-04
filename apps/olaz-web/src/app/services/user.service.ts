/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  arrayRemove,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fs: Firestore) {}

  private readonly refUser = collection(this.fs, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);
  }

  public notifyCount(myID: string) {
    return docData(doc(collection(this.fs, 'users'), myID));
  }
  public messCount(myIDMessage: string) {
    return docData(doc(collection(this.fs, 'rooms'),myIDMessage))
  }

  public async toggleRequest(check: boolean, frID: string, myID: string) {
    if (check) {
      const roomId = Date.now().toString();
      const myUpdate = updateDoc(doc(this.fs, 'users', myID), {
        friends: arrayUnion(frID),
        requests: arrayRemove(frID),
        rooms: arrayUnion(roomId)
      });
       const frUpdate = updateDoc(doc(this.fs, 'users', frID), {
        friends: arrayUnion(myID),
        requests: arrayRemove(myID),
        rooms: arrayUnion(roomId)
      })
      const createRoom = setDoc(doc(this.fs, 'rooms', roomId), {
        id: roomId,
        messages: [],
        users: [frID, myID],
        name: ""
      })
      await Promise.all([
        myUpdate,
        frUpdate,
        createRoom
      ])
    } 
    else {
      await updateDoc(doc(this.fs, 'users', myID), {
        requests: arrayRemove(frID),
      });
      await updateDoc(doc(this.fs, 'users', frID), {
        requests: arrayRemove(myID),
      });
    }
  }

  async getUserByID(id: string){
    return await getDoc(doc(this.fs, 'users', id))
  }
}
