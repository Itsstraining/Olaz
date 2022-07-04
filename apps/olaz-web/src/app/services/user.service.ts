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
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fs: Firestore,
    private http:HttpClient
    ) {}

  private readonly refUser = collection(this.fs, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);
  }

  //new fuction with server
  public getUserByEmail(email: string){
    return this.http.get(`http://localhost:3333/api/user/get-all?email=${email}`);
  }

  public notifyCount(myID: string) {
    return docData(doc(collection(this.fs, 'users'), myID));
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
