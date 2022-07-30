import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TaskService {
    firestore = admin.firestore();
    
    // API FOR CRUD TASK LIST
    async create(roomId, newTask){
        const result = await this.firestore.collection('rooms').doc(roomId).collection('taskList').doc(newTask.id).create(newTask); 
        return result;
    }

    async getTaskList(roomsId){
        const result = (await this.firestore.collection('taskList').doc('TL'+roomsId).get()).data();
        return result;
    }

    async update(roomId, updateTask){
        const result = await this.firestore.collection('rooms').doc(roomId).collection('taskList').doc(updateTask.id).update(updateTask);
        return result;
    }

    async delete(roomId, taskId){
        const result = await this.firestore.collection('rooms').doc(roomId).collection('taskList').doc(taskId).delete(); 
        return result;
    }

}

