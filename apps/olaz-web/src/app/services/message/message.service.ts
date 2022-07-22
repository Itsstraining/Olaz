/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, getDoc, doc } from '@angular/fire/firestore';
import {  Storage,uploadBytesResumable,ref, percentage, getDownloadURL } from '@angular/fire/storage'
import { idToken } from '@angular/fire/auth';
import { _FEATURE_REDUCERS_TOKEN } from '@ngrx/store/src/tokens';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private HttpClient:HttpClient,
    private fs: Firestore,
    private fStorage: Storage
    ) { }

  public sendMessage(
    content: string,
    image: string,
    type: string,
    myID: string,
    roomID: string
  ) {
    const messageID = Date.now().toString();
    console.log({
      userId: myID,
      id: messageID,
      content: content,
      image: image,
      type: type,
      createdTime: messageID,
      roomID:roomID
    })
    return this.HttpClient.post('http://localhost:3333/api/message/send-message', {
      userId: myID,
      id: messageID,
      content: content,
      image: image,
      type: type,
      createdTime: messageID,
      roomID:roomID,
    });
  }

  async getMessageById(messId: string){
    return await (await getDoc(doc(this.fs, 'messages', messId))).data()
  }

  async uploadImage(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
      const _ext = file.name.split('.').pop();
      const _id = Date.now().toString();
      const path = `images/${_id}.${_ext}`;
      if(file){
        try {
          const storageRef =  ref(this.fStorage, path);
          const task = uploadBytesResumable(storageRef, file);
          percentage(task).subscribe(async (value: any) => {
            if(value.snapshot.metadata != null){
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
