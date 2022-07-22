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
        const taskId = Date.now().toString();
        const result = await this.firestore.collection('tasks').doc(taskId).create({
            id: taskId,
            title: newTask.title, 
            description: newTask.description,
            status: 0,
            deadline: Date.now(),
            assignee: [],
            reporter: [],
            updatedDate: Date.now(),
            priority: 0
        });
        await this.firestore.collection('taskList').doc('TL'+roomsId).update({
            taskList: admin.firestore.FieldValue.arrayUnion(taskId)
        })
        return result;
    }
    async update(updateTask, taskId){
        const result = await this.firestore.collection('tasks').doc(taskId).update({
            title: updateTask.title, 
            description: updateTask.description,
            status: updateTask.status,
            deadline: updateTask.deadline,
            assignee: admin.firestore.FieldValue.arrayUnion(updateTask.assignee),
            reporter: admin.firestore.FieldValue.arrayUnion(updateTask.reporter),
            updatedDate: Date.now(),
            priority: updateTask.priority
        });
        console.log(result)

        return result;
    }
    async delete(roomsId, taskId){
        const result = await this.firestore.collection('rooms').doc(roomsId).collection('task').doc(taskId).delete() ;
        return result ;
    }
}

