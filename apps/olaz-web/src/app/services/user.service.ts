/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  authState,
  Auth,
  signOut,
} from '@angular/fire/auth';
import { User } from './user';

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
  collectionChanges,
} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from './message/message.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn = false;
  user!: User;
  userTodo: any;

  callRef: any;
  offerDocRef: any;
  ansDocRef: any;
  opponentId!: any;
  ownerId!: any;

  constructor(
    private route: Router,
    private fs: Firestore,
    private auth: Auth,
    private http: HttpClient
  ) {
    authState(this.auth).subscribe(async (user) => {
      if (!user) return;
      let userDoc = doc(collection(this.fs, 'users'), user!.uid);
      let todoCollection = collection(userDoc, 'Todo');
      let todoID;

      this.callRef = collection(this.fs, 'calls');

      if (user) {
        this.userTodo = collection(this.fs, 'todo');
        this.loggedIn = true;
        this.user = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          requests: [],
          friends: [],
          incall: false,

          rooms: [],
        };
        this.user$.next(this.user);

        collectionChanges(this.callRef).subscribe((data) => {
          data.forEach((doc) => {
            if (
              doc.type === 'added' &&
              doc.doc.data()['opponentID'] === this.user.id
            ) {
              let text = 'Incoming Call...';
              if (confirm(text) == true) {
                this.answerCall(doc.doc.id);
              } else {
                text = 'Denied!';
              }
            }
          });
        });

        if ((await this.userFirstLogin()) == false) {
          await setDoc(doc(this.fs, 'users', this.user.id), this.user);
          todoID = await await addDoc(todoCollection, {
            content: 'This is todo',
            status: 'Done',
          });
        }
      }
    });
  }
  async answerCall(idDoc: any) {
    this.route.navigate([`call/call/${idDoc}`]);
  }

  public user$ = new BehaviorSubject<any>(null);

  private readonly refUser = collection(this.fs, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);
  }

  //new fuction with server
  public getUserByEmail(email: string) {
    return this.http.get(
      `http://localhost:3333/api/user/get-email?email=${email}`
    );
  }

  public notifyCount(myID: string) {
    return docData(doc(collection(this.fs, 'users'), myID));
  }
  public messCount(myIDMessage: string) {
    return docData(doc(collection(this.fs, 'rooms'),myIDMessage))
  }

  public toggleRequest(check: boolean, frID: string, myID: string) {
    // if (check) {
    //   const roomId = Date.now().toString();
    //   const myUpdate = updateDoc(doc(this.fs, 'users', myID), {
    //     friends: arrayUnion(frID),
    //     requests: arrayRemove(frID),
    //     rooms: arrayUnion(roomId)
    //   });
    //   const frUpdate = updateDoc(doc(this.fs, 'users', frID), {
    //     friends: arrayUnion(myID),
    //     requests: arrayRemove(myID),
    //     rooms: arrayUnion(roomId)
    //   })
    //   const createRoom = setDoc(doc(this.fs, 'rooms', roomId), {
    //     id: roomId,
    //     messages: [],
    //     users: [frID, myID],
    //     name: ""
    //   })
    //   await Promise.all([
    //     myUpdate,
    //     frUpdate,
    //     createRoom
    //   ])
    // }
    // else {
    //   await updateDoc(doc(this.fs, 'users', myID), {
    //     requests: arrayRemove(frID),
    //   });
    //   await updateDoc(doc(this.fs, 'users', frID), {
    //     requests: arrayRemove(myID),
    //   });
    // }
    return this.http.post('http://localhost:3333/api/user/add-friend', {
      check,
      myID,
      frID,
    });
  }

  async userFirstLogin() {
    if (!this.user) {
      return false;
    } else {
      let exists = await getDoc(doc(this.fs, 'users', this.user.id));
      return exists.exists();
    }
  }

  async login() {
    let provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      alert('Loggin Success');
    } catch (e) {
      alert('Loggin Failed !');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      alert('Logout Success');
    } catch (e) {
      alert('Logout Failed !');
    }
  }
  async getUserByID(id: string) {
    return await getDoc(doc(this.fs, 'users', id));
  }

  public sendRequest(myID: string, frID: string) {
    return this.http.post('http://localhost:3333/api/user/send-request', {
      myID: myID,
      frID: frID,
    });
  }

  public suggestUsers(){
    return this.http.get("http://localhost:3333/api/user/suggest-user")
  }
}
