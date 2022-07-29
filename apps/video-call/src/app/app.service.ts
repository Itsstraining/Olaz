import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to video-call!' };
  }
  addItem(item: any) {
    return { addedItem: item };
  }

  async delDoc(id: string) {
    const batch = admin.firestore().batch();

    try {
      await admin.firestore().collection('calls').doc(id).collection('answerCandidates').get().then((data) => {
        data.forEach((doc) => {

          batch.delete(doc.ref);
        })
      })
      await admin.firestore().collection('calls').doc(id).collection('offerCandidates').get().then((data) => {
        data.forEach((doc) => {

          batch.delete(doc.ref);
        })
      })
      await batch.commit();

      let userList = await (await admin.firestore().collection('calls').doc(id).get()).data();
      await admin.firestore().collection("calls").doc(id).delete().then(() => {
      })
      await admin.firestore().collection('users').doc(userList.owner.id).update({
        incall: false
      })
      await admin.firestore().collection('users').doc(userList.opponent.id).update({
        incall: false
      })


      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUserStatus(id: any) {

    let status = await admin.firestore().collection('users').doc(id).get().then((data) => {
      {
        return data.data().incall
      }

    });
    admin.firestore().collection('users').doc(id).update({
      incall: !status
    })
    return true;
  }

  async updateDoc(id: string, userId: string, status: any) {

    try {
      await admin.firestore().collection('calls').doc(id).get().then(async (data) => {
        let callData = data.data();
        if (userId === callData.opponent.id) {
          await admin.firestore().collection('calls').doc(id).update({
            opponent: {
              micOn: status.micOn,
              id: callData.opponent.id,
              camOn: status.camOn,
            }
          });
        }
        else {
          await admin.firestore().collection('calls').doc(id).update({
            owner: {
              micOn: status.micOn,
              id: callData.owner.id,
              camOn: status.camOn,
            }
          }
          );
        }
      });
      return true;
    }
    catch (error) {
      return false;
    }
  }
}
