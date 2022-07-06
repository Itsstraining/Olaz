import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TaskService {
    firestore = admin.firestore();
    async getAll(roomsId): Promise <any>{
        const result = (await this.firestore.collection('rooms').doc(roomsId).collection('task').get()).docs.map(doc => doc.data());
        return result;
    }
    async create(newTask: any, roomsId){
        const result = await this.firestore.collection('rooms').doc(roomsId).collection('task').add(newTask); 
        return result;
    }
    async update(updateTask: any, roomsId, taskId){
        const result = await this.firestore.collection('rooms').doc(roomsId).collection('task').doc(taskId).update(updateTask);
        return result;
    }
    async delete(roomsId, taskId){
        const result = await this.firestore.collection('rooms').doc(roomsId).collection('task').doc(taskId).delete() ;
        return result ;
    }
}

