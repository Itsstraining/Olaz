/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TodoService {
    // firestore = admin.firestore();
    async getAll(userId): Promise<any>{
        // const result = (await this.firestore.collection('users').doc(userId).collection('Todo').get()).docs.map(doc => doc.data())
    // return result ;
    }
    async create(data: any){
        // const result = await this.firestore.collection('users').add(data);
        // return result;
    }
    async update(data: any, task){
        // const result = await this.firestore.collection('users').doc(task).update(data);
        // return result;
    }
    async delete(task){
        // const result = await this.firestore.collection('users').doc(task).delete();
        // return result;
    }

}

