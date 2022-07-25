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
      await admin.firestore().collection("calls").doc(id).delete().then(() => {
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async updateDoc(id: string, userId: string, status: any) {
    console.log(status)
    try {
      await admin.firestore().collection('calls').doc(id).get().then(async (data) => {
        let callData = data.data();
        if (userId === callData.opponent.id) {
          await admin.firestore().collection('calls').doc(id).update({
            opponent: {
              micOn: status.micOn,
              id:callData.opponent.id,
              camOn: status.camOn,
            }
          })
        }
        else {
          await admin.firestore().collection('calls').doc(id).update({
            owner: {
              micOn: status.micOn,
              id:callData.owner.id,
              camOn: status.camOn,
            }
          }
          )
        }
      })
      return true;
    }
    catch (error) {
      return false;
    }
  }
}
