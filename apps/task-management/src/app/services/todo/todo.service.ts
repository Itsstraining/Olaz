/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TodoService {
    firestore = admin.firestore();
    async getTodoDetail(todoId): Promise<any>{
        const result = (await this.firestore.collection('todos').doc(todoId).get())
        return result;
    }
    async create(newTask: any){
        const uniqueId = Date.now().toString()
        const result = await this.firestore.collection('todos').doc(uniqueId).set({
            id: uniqueId, 
            title: newTask.title,
            status: newTask.status,
            createdDate: newTask.createdDate,
            createdBy: newTask.createdBy
        });
        return result;
    }
    async update(updateTask: any){
        const result = await this.firestore.collection('todos').doc(updateTask.id).update(updateTask);
        return result;
    }
    async delete(todoId,){
        const result = await this.firestore.collection('todos').doc(todoId).delete();
        return result;
    }

}

