/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { RoomService } from '../room/room.service';

@Injectable()
export class MessageService {
  constructor(private RoomService:RoomService) {}

  async sendMessage(
    content: string,
    image: string,
    type: string,
    myID: string,
    roomId: string,
    createdTime: string,
    token: string
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
      const _isToken = token.split(" ")[1]
      const isValid = await this.RoomService.checkToken(_isToken)
      if(isValid){
        return //some thing here
      }
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
        .doc(roomId)
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
