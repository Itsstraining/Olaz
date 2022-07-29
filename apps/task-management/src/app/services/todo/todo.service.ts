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
        console.log(newTask)
        const tempUser = await this.firestore.collection('users').doc(newTask.createdBy).update({
            todos: admin.firestore.FieldValue.arrayUnion(newTask.id)
        }); 
        const result = await this.firestore.collection('todos').doc(newTask.id).set({
            id: newTask.id, 
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
    async delete(todo){
        const tempUser = await this.firestore.collection('users').doc(todo.createdBy).update({
            todos: admin.firestore.FieldValue.arrayRemove(todo.id)
        }); 
        const result = await this.firestore.collection('todos').doc(todo.id).delete();
        return result;
    }

}

