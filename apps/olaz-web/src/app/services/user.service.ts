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
import { environment } from '../../environments/environment';
import { endPointMessenger } from '../../configs/baseURL';

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
  public userInfoFb$ = new BehaviorSubject<any>(null);
  constructor(
    private route: Router,
    private fs: Firestore,
    private auth: Auth,
    private http: HttpClient,
  ) {
    authState(this.auth).subscribe(async (user: any) => {
      if (!user) return;
      let userDoc = doc(collection(this.fs, 'users'), user!.uid);
      sessionStorage.setItem("user", JSON.stringify(user));
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

          }
          await setDoc(doc(this.fs, 'users', _userRegister.id), _userRegister);
        } catch (err) {
          console.log(err);
        }
      }
      ////
      let userRef = doc(this.fs, 'users', user.uid);
      docData(userRef).subscribe((data) => {
        this.userInfoFb$.next(data);
      })
      ///
      this.user = await (await this.getUserByID(user.uid)).data();

      let _user = {
        ...this.user,
        token: user.accessToken
      }

      this.user$.next(_user);

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
  public user$ = new BehaviorSubject<any>(null);

  private readonly refUser = collection(this.fs, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);

  }

  //new fuction with server
  public getUserByEmail(email: string) {
    return this.http.get(
      `${endPointMessenger}user/get-email?email=${email}`
    );
  }

  public notifyCount(myID: string) {
    return docData(doc(collection(this.fs, 'users'), myID));
  }
  public messCount(myIDMessage: string) {
    return docData(doc(collection(this.fs, 'rooms'), myIDMessage));
  }

  public toggleRequest(check: boolean, frID: string, myID: string) {
    return this.http.post(endPointMessenger + 'user/add-friend', {
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
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.route.navigate(['/ownspace/todo'])

      alert('Loggin Success');
    } catch (e) {
      alert('Loggin Failed !');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      sessionStorage.clear();
      this.route.navigate(['/'])

      alert('Logout Success');
      this.loggedIn = false;
    } catch (e) {
      alert('Logout Failed !');
    }
  }
  getCurrentUser() {
    if (sessionStorage.getItem("user") != null) {
      return true;
    } else {
      return false
    }
  }

  async getUserByID(id: string) {
    return await await (await getDoc(doc(this.fs, 'users', id)));
  }

  public sendRequest(myID: string, frID: string) {
    return this.http.post(endPointMessenger + 'user/send-request', {
      myID: myID,
      frID: frID,
    });
  }

  public suggestUsers() {
    return this.http.get(endPointMessenger + 'user/suggest-user');
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
