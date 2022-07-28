/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  docSnapshots,
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
  user!: any;
  userTodo: any;

  callRef: any;
  offerDocRef: any;
  ansDocRef: any;
  opponentId!: any;
  ownerId!: any;
  statemanager = false;

  constructor(
    private route: Router,
    private fs: Firestore,
    private auth: Auth,
    private http: HttpClient,
   
  ) {
    authState(this.auth).subscribe(async (user: any) => {
      if (!user) return;
      let userDoc = doc(collection(this.fs, 'users'), user!.uid);

      let todoCollection = collection(userDoc, 'Todo');
      let todoID;

      this.callRef = collection(this.fs, 'calls');
      this.userTodo = collection(this.fs, 'todo');
      this.loggedIn = true;

      this.user = await (await this.getUserByID(user.uid)).data();

      if (!this.user) {
        console.log({
          message: "Không tìm được người dùng!"
        });
        try {
          let _userRegister = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            friends: [],
            photoURL: user.photoURL,
            incall: false,
            requests: [],
            rooms: [],
            todos: []
          }
          await setDoc(doc(this.fs, 'users', _userRegister.id), _userRegister);
        } catch (err) {
          console.log(err);
        }
      }

      this.user = await (await this.getUserByID(user.uid)).data();

      let _user = {
        ...this.user,
        token: user.accessToken
      }

      this.user$.next(_user);

      collectionChanges(this.callRef).subscribe((data) => {
        data.forEach(async (docVal) => {
          if (docVal.type === 'added' && docVal.doc.data()['opponent']['id'] === user.uid) {
            
            let userInCall = (await getDoc(doc(this.fs, `users/${user.uid}`))).data()!['incall'];
            if (!userInCall) {
              let text = "Incoming Call...";
              if (confirm(text) == true) {

                await this.answerCall(docVal.doc.id);
                // audio.pause();
                // audio.currentTime=0;
                await this.answerCall(docVal.doc.id);
                // const audio = new Audio('../../assets/audios/incoming-call.wav');
                // audio.play().then(()=>{
                // });

                let ownerID = docVal.doc.data()['owner']['id'];
                // let callerData = (await getDoc(doc(this.fs, `users/${ownerID}`))).data()
                // console.log(callerData);
              }
            }

          }
        });
      });

      console.log("haha")
      console.log(await this.userFirstLogin())

      if ((await this.userFirstLogin()) == false) {
        // await setDoc(doc(this.fs, 'users', ...user.uid), this.user);
        // await addDoc(todoCollection, {
        //   content: 'This is todo',
        //   status: 'Done',
        // });
      } else {
        console.log('user exists');
      }
    });
  }
  async answerCall(idDoc: any) {
    this.route.navigate([`ownspace/call/call/${idDoc}`]);
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
      `http://localhost:3331/api/user/get-email?email=${email}`
    );
  }

  public notifyCount(myID: string) {
    return docData(doc(collection(this.fs, 'users'), myID));
  }
  public messCount(myIDMessage: string) {
    return docData(doc(collection(this.fs, 'rooms'), myIDMessage));
  }

  public toggleRequest(check: boolean, frID: string, myID: string) {
    return this.http.post('http://localhost:3331/api/user/add-friend', {
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
      this.route.navigate(['/ownspace/todo'])
      alert('Loggin Success');
    } catch (e) {
      alert('Loggin Failed !');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.route.navigate(['/'])
      alert('Logout Success');
    } catch (e) {
      alert('Logout Failed !');
    }
  }

  async getUserByID(id: string) {
    return await await getDoc(doc(this.fs, 'users', id));
  }

  public sendRequest(myID: string, frID: string) {
    return this.http.post('http://localhost:3331/api/user/send-request', {
      myID: myID,
      frID: frID,
    });
  }

  public suggestUsers() {
    return this.http.get('http://localhost:3331/api/user/suggest-user');
  }

  getListOfRoomId(userId: string) {
    const rooms = docData(doc(this.fs, 'users', userId)).pipe(
      map((user: any) => {
        return user.rooms;
      })
    );
    return rooms;
  }
  private stateManager(myID: string) {
    authState(this.auth).subscribe(async (user) => {

    })
  }
}
