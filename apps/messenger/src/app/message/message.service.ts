/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class MessageService {
  constructor() {}

  async sendMessage(
    content: string,
    image: string,
    type: string,
    myID: string,
    roomID: string,
    createdTime: string
  ) {
    const fs = firebase.firestore();
    const messID = Date.now().toString();
    try {
      console.log({
        userId: myID,
        id: messID,
        content: content,
        image: image,
        type: type,
        createdTime: createdTime,
      });
      const createMessage = fs.collection('messages').doc(messID).create({
        userId: myID,
        id: messID,
        content: content,
        image: image,
        type: type,
        createdTime: createdTime,
      });

      const updateRoom = fs
        .collection('rooms')
        .doc(roomID)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion(messID),
        });
      await Promise.all([createMessage, updateRoom]);
      return {
        message: "Gửi tin nhắn thành công"
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
