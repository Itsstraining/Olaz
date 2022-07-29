/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  getDoc,
  docData,
  collectionData,
} from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { endPointMessenger } from '../../../configs/baseURL';

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

  getMessagesInRoom(roomId: string) {
    return collectionData(collection(this.fs, `rooms/${roomId}/messages`));
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
    return this.HttpClient.get(`${endPointMessenger}room/check-room/${roomId}`, header)
  }
}
