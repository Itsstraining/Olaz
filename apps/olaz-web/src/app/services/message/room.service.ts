/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private _token!: string;
  constructor(private fs: Firestore, private UserService: UserService, private HttpClient: HttpClient) {
    this.UserService.user$.subscribe(user => {
      console.log(user)
      if (!user) return;
      this._token = user.token;
    })
  }

  getRoomById(roomId: string) {
    return docData(doc(this.fs, 'rooms', roomId));
  }

  async getRoomByIdPromise(roomId: string) {
    return await (await getDoc(doc(this.fs, 'rooms', roomId))).data()
  }

  checkRoom(roomId: string) {
    if (!this._token) return;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }
    return this.HttpClient.get(`https://messenger-server-api-oolzqmo74q-uc.a.run.app/api/room/check-room/${roomId}`, header)
  }
}
