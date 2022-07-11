/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, getDoc, doc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private HttpClient:HttpClient,
    private fs: Firestore
    ) { }

  public sendMessage(
    content: string,
    image: string,
    type: string,
    myID: string,
    roomID: string
  ) {
    const messageID = Date.now().toString();
    return this.HttpClient.post('http://localhost:3333/api/message/send-message', {
      userId: myID,
      id: messageID,
      content: content,
      image: image,
      type: type,
      createdTime: messageID,
      roomID:roomID
    });
  }

  async getMessageById(messId: string){
    return await (await getDoc(doc(this.fs, 'messages', messId))).data()
  }
}
