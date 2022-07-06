/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TodoService {
    firestore = admin.firestore();
    async getAll(userId): Promise<any>{
        const result = (await this.firestore.collection('users').doc(userId).collection('Todo').get()).docs.map(doc => doc.data())
        return result;
    }
    async create(newTask: any, userId){
        const result = await this.firestore.collection('users').doc(userId).collection('Todo').add(newTask);
        return result;
    }
    async update(updateTask: any, userId, taskId){
        const result = await this.firestore.collection('users').doc(userId).collection('Todo').doc(taskId).update(updateTask);
        return result;
    }
    async delete(userId,taskId){
        const result = await this.firestore.collection('users').doc(userId).collection('Todo').doc(taskId).delete();
        return result;
    }

}

