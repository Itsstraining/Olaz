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
    async create(newTodo: any){
        const result = await this.firestore.collection('users').doc(newTodo.createdBy).collection('todos').doc(newTodo.id).create(newTodo);
        return result;
    }
    async update(updateTodo: any){
        const result = await this.firestore.collection('users').doc(updateTodo.createdBy).collection('todos').doc(updateTodo.id).update(updateTodo);
        return result;
    }
    async delete(todo){
        const result = await this.firestore.collection('users').doc(todo.createdBy).collection('todos').doc(todo.id).delete();
        return result;
    }

}

