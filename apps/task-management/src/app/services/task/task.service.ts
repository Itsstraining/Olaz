import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class TaskService {
    firestore = admin.firestore();
    
    // API FOR CRUD TASK LIST
    async createTaskList(roomsId){
        const tempUserList = await (await this.firestore.collection('rooms').doc(roomsId).get()).data().users;
        const result = await this.firestore.collection('taskList').doc('TL'+roomsId).create({
            id: 'TL' + roomsId,
            taskList: [],
            participants: tempUserList,
            createdDate: Date.now(),
            updatedDate: Date.now()
        }); 
        return result;
    }

    async getTaskList(roomsId){
        const result = (await this.firestore.collection('taskList').doc('TL'+roomsId).get()).data();
        return result;
    }

    async deleteTaskList(roomsId){
        const result = await this.firestore.collection('taskList').doc('TL'+roomsId).delete(); 
        return result;
    }

    // API FOR CRUD A TASK
    async getTaskDetail(taskId): Promise <any>{
        const result = (await this.firestore.collection('tasks').doc(taskId).get()).data();
        return result;
    }
    async create(newTask: any, roomsId){
        const result = await this.firestore.collection('tasks').doc(newTask.id).create(newTask);
        await this.firestore.collection('taskList').doc('TL'+roomsId).update({
            taskList: admin.firestore.FieldValue.arrayUnion(newTask.id)
        })
        return result;
    }
    async update(updateTask, taskId){
        const result = await this.firestore.collection('tasks').doc(taskId).update({
            title: updateTask.title, 
            description: updateTask.description,
            status: updateTask.status,
            deadline: updateTask.deadline,
            assignee: updateTask.assignee,
            reporter: updateTask.reporter,
            updatedDate: Date.now(),
            priority: updateTask.priority
        });
        return result;
    }
    async delete(roomsId, taskId){
        const tempTaskList = await this.firestore.collection('taskList').doc('TL'+roomsId).update({
            taskList: admin.firestore.FieldValue.arrayRemove(taskId)
        }); 
        const result = await this.firestore.collection('tasks').doc(taskId).delete();
        return result ;
    }
}

