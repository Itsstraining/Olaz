/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  getDoc,
  docData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private fs: Firestore) {}

  getRoomById(roomId: string) {
    return docData(doc(this.fs, 'rooms', roomId));
  }
}
