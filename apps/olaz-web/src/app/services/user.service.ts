/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleAuthProvider, getAuth, signInWithPopup, authState, Auth, signOut } from '@angular/fire/auth';
import { catchError } from 'rxjs';
import { User } from './user'; 
import {doc, collection, collectionData, addDoc, Firestore, getDoc, setDoc, docData, updateDoc, arrayUnion, arrayRemove} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: Firestore, private auth: Auth
  ) {
    authState(this.auth).subscribe(async (user) => {
      let userDoc = doc(collection(this.db, 'users'), user!.uid)
      let todoCollection = collection(userDoc, 'Todo');
      let todoID;

      if (user) {
        this.userTodo = collection(this.db, "todo");
        this.loggedIn = true;
        this.user = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          requests: [],
          friends: [],
          incall: false,

          rooms: []
        }
        console.log(this.user)
        if (await this.userFirstLogin() == false) {

          await setDoc(doc(this.db, "users", this.user.id), this.user)
          todoID = await (await addDoc(todoCollection, { content: 'This is todo', status: 'Done' }))
        }
      }
    })
   }

  private readonly refUser = collection(this.db, 'users');

  //
  public getUsers(): Observable<Array<any>> {
    return collectionData(this.refUser);
  }

  public notifyCount(myID:string){
    return docData(doc(collection(this.db, 'users'), myID));
  }

  async toggleRequest(check:boolean, frID: string, myID: string){
    if(check){
      await updateDoc(doc(this.db, 'users', myID), {
        friends: arrayUnion(frID),
        requests: arrayRemove(frID)
      })
    }else{
      //do something here...
    }
  }

  loggedIn = false
  user!: User
  userTodo: any;

  async userFirstLogin() {
    if (!this.user) {
      return false
    } else {
      let exists = await getDoc(doc(this.db, "users", this.user.id))
      return exists.exists();
    }
  }

  async login() {
    let provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      alert('Loggin Success')
    } catch (e) {
      alert('Loggin Failed !')
    }
  }

  async logout() {
    try {
      await signOut(this.auth)
      alert('Logout Success')
    } catch (e) {
      alert('Logout Failed !')
    }
  }
}
