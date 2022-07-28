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

  checkRoom(roomId: string, token: string) {
    if (!token) return;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.HttpClient.get(`http://localhost:3331/api/room/check-room/${roomId}`, header)
  }
}
