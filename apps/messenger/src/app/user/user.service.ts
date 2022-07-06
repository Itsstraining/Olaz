/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { User } from '../../../../../libs/models/user.model';

@Injectable()
export class UserService {

    constructor() { }

    users = []
    getUserByEmail() {
        return this.users;
    }

    async getUsers() {
        try {
            // console.time('loop');
            if (this.users.length == 0) {
                const users = await (
                    await firebase.firestore()
                        .collection('users')
                        .get())
                    .docChanges()
                    .map(
                        user => { return user.doc.data() }
                    )
                this.users = users;
            }
            // console.timeEnd('loop');
            return this.users;

        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserById(id: string) {
        try {
            return await (await firebase.firestore().collection('users').doc(id).get()).data();
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async toggleRequest(check: boolean, frID: string, myID: string) {
        const fs = firebase.firestore();
        try {
            if (check) {
                const roomId = Date.now().toString();
                const myUpdate = fs.collection('users').doc(myID).update({
                    friends: firebase.firestore.FieldValue.arrayUnion(frID),
                    requests: firebase.firestore.FieldValue.arrayRemove(frID),
                    rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
                });

                const frUpdate = fs.collection('users').doc(frID).update({
                    friends: firebase.firestore.FieldValue.arrayUnion(myID),
                    requests: firebase.firestore.FieldValue.arrayRemove(myID),
                    rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
                });

                const createRoom = fs.collection('rooms').doc(roomId).create({
                    id: roomId,
                    messages: [],
                    users: [frID, myID],
                    name: ""
                })

                await Promise.all([
                    myUpdate,
                    frUpdate,
                    createRoom
                ])

                return {
                    message: "Chấp nhận kết bạn thành công !"
                }
            }
            else {
                await fs.collection('users').doc(myID).update({
                    requests: firebase.firestore.FieldValue.arrayRemove(frID),
                });
                await fs.collection('users').doc(frID).update({
                    requests: firebase.firestore.FieldValue.arrayRemove(myID),
                });
                return {
                    message: "Từ chối thành công !"
                }
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}