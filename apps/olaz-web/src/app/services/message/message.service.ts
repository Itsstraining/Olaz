/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Firestore, getDoc, doc } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Storage, uploadBytesResumable, ref, percentage, getDownloadURL } from '@angular/fire/storage';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { endPointMessenger } from '../../../configs/baseURL';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _token!: string;

  constructor(
    private HttpClient: HttpClient,
    private fs: Firestore,
    private fStorage: Storage,
    private UserService: UserService
  ) {
    this.UserService.user$.subscribe(user => {
      if (!user) return;
      this._token = user.token;
    })
  }

  public sendMessage(
    content: string,
    image: string,
    type: string,
    myID: string,
    roomID: string,
  ) {
    if (!this._token) {
      return from(<any>{})
    };
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }
    const messageID = Date.now().toString();
    return this.HttpClient.post(endPointMessenger + 'message/send-message', {
      userId: myID,
      id: messageID,
      content: content,
      image: image,
      type: type,
      createdTime: messageID,
      roomID: roomID,
    }, header);
  }

  async getMessageById(messId: string) {
    return await (await getDoc(doc(this.fs, 'messages', messId))).data()
  }

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const _ext = file.name.split('.').pop();
      const _id = Date.now().toString();
      const path = `images/${_id}.${_ext}`;
      if (file) {
        try {
          const storageRef = ref(this.fStorage, path);
          const task = uploadBytesResumable(storageRef, file);
          percentage(task).subscribe(async (value: any) => {
            if (value.snapshot.metadata != null) {
              const _url = await getDownloadURL(storageRef);
              resolve(_url)
            }
          });
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}
