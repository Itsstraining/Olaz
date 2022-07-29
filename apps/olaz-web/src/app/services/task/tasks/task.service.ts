/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { docData, Firestore, getDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  roomId: any;
  constructor(public httpClient: HttpClient, private firestore: Firestore) {}
  async getTaskListData(roomId: any) {
    // await this.httpClient.get(environment.endpoint+`task-list/${roomId}`)
    try {
      return (
        await getDoc(doc(this.firestore, 'taskList', `TL${roomId}`))
      ).data();
    } catch (error) {
      return { message: error };
    }
  }

  async getTaskDetail(taskId: any) {
    // return this.httpClient.get(environment.endpoint+`task-list/task/${taskId}`);
    return (await getDoc(doc(this.firestore, 'tasks', taskId))).data();
  }

  createTask(newTask: any, roomId: any) {
    const data = { newTask: newTask, roomsId: roomId };
    return this.httpClient.post(environment.endpoint+"task-list/task", data);
  }

  updateTask(updateTask: any, taskId: any) {
    const data = { updateTask: updateTask, taskId: taskId };
    return this.httpClient.put(environment.endpoint+"task-list/task",data);
  }

  deleteTask(taskId: any, roomId: any) {
    const data = { taskId: taskId, roomsId: roomId };
    return this.httpClient.delete(environment.endpoint+"task-list/task", {body: data});
  }
}
