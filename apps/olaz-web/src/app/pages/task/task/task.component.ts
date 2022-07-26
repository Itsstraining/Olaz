/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task/tasks/task.service';
import { UserService } from '../../../services/user.service';
import { doc, onSnapshot } from '@firebase/firestore';
import { collection, collectionData, docData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'olaz-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskListData: any;
  taskListFull: Array<any> = [];
  todo: any[] =[];
  doing: any[] =[];
  done: any[] =[];
  panelOpenState = true;
  isShowDetail = false;
  isActiveDropdown = false;
  onSelected = 'Choose option';
  taskData: any;
  updateTaskData!: TaskModel;
  newTaskTitle: any = '';
  message: any;

  constructor(
    private TaskService: TaskService,
    private userService: UserService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.getTaskListData();
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  async getTaskListData() {
    this.taskListData = undefined;
    this.taskListFull = [];
    // onSnapshot()
    // docData(doc(this.firestore, 'taskList', `TL1657869801036`)).subscribe(async (result) => {
    //   this.taskListData = result;
    //   console.log(this.taskListData); 
    //   if(this.taskListData) {
    //     for (let i = 0; i < this.taskListData.taskList.length; i++) {
    //       const tempTask = await this.TaskService.getTaskDetail(this.taskListData.taskList[i]);
    //       if (tempTask !== undefined) {
    //         this.taskListFull.push(tempTask);
    //       }
    //     }
    //     this.filterListTask();

    //   };
    // })
    // this.taskListData = await this.TaskService.getTaskListData('1657869801036');
    // onSnapshot(
    //   doc(this.firestore, 'taskList', `TL1657869801036`),
    //   async (doc) => {
    //     if (doc.exists()) {
    //       this.taskListData = doc.data();
    //       console.log(this.taskListData);
    //       const temp = this.taskListData.taskList;
    //       if (this.taskListData) {
    //         if (this.taskListData) {
    //           for (let i = 0; i < temp.length; i++) {
    //             const tempTask = await this.TaskService.getTaskDetail(temp[i]);
    //             if (tempTask !== undefined) {
    //               this.taskListFull.push(tempTask);
    //             }
    //           }
    //         }
    //         this.filterListTask();
    //       }
    //     }
    //   }
    // );
    // setTimeout(this.getTaskList, 5000)
  }

  async getTaskList(taskListData: any){

    const temp = taskListData.taskList;
    if (this.taskListData) {
      if (this.taskListData) {
        for (let i = 0; i < temp.length; i++) {
          const tempTask = await this.TaskService.getTaskDetail(temp[i]);
          if (tempTask !== undefined) {
            this.taskListFull.push(tempTask);
          }
        }
      }
    console.log(taskListData);

      this.filterListTask();
    }
  }

  filterListTask() {
    this.todo = [];
    this.doing = [];
    this.done = [];
    console.log(this.taskListFull)
    this.taskListFull.filter((value) => {
      if (value.status == 0) return this.todo.push(value);
      if (value.status == 1) return this.doing.push(value);
      if (value.status == 2) return this.done.push(value);
      return;
    });
  }

  addNew() {
    if (this.newTaskTitle == '') {
      alert('You have to fill the task title!!');
      return;
    } else {
      const temp = {
        id: Date.now().toString(),
        title: this.newTaskTitle,
        description: '',
        deadline: Date.now(),
        status: 0,
        assignee: [],
        reporter: [],
        priority: 0,
        createdBy: this.userService.user.id,
        createdDate: Date.now(),
        updatedDate: Date.now(),
      };
      this.todo.push(temp);
      this.TaskService.createTask(temp, '1657869801036').subscribe(
        (data) => (this.message = data)
      );
      this.newTaskTitle = '';
    }
  }

  deleteTask(taskId: any) {
    this.TaskService.deleteTask(taskId, '1657869801036').subscribe(
      (data) => (this.message = data)
    );
    const tempIndex = this.taskListFull.findIndex((task: any) => {
      return task.id === taskId;
    });
    this.taskListFull = this.taskListFull
      .slice(0, tempIndex)
      .concat(this.taskListFull.slice(tempIndex + 1));
    this.filterListTask();
  }

  updateTaskEmit(event: any) {
    if (event.message.message.includes('Update Success')) {
      const tempIndex = this.taskListFull.findIndex((task) => {
        return task.id === event.updateTaskData.id;
      });
      for (let i = 0; i < this.taskListFull.length; i++) {
        if (i == tempIndex) {
          this.taskListFull[i] = event.updateTaskData;
        }
      }
      // this.getTaskListData();

      this.filterListTask();
    }
  }

  updateTaskBtn() {
    console.log(this.updateTaskData);
    this.updateTaskData.updatedDate = Date.now();
    const tempIndex = this.taskListFull.findIndex((task) => {
      return task.id === this.updateTaskData.id;
    });
    for (let i = 0; i < this.taskListFull.length; i++) {
      if (i == tempIndex) {
        this.taskListFull[i] = this.updateTaskData;
      }
    }
    this.filterListTask();
  }

  getShowDetailsClass(): string {
    let styleClass = '';
    if (this.isShowDetail == true) {
      styleClass = 'task-details';
    } else if (this.isShowDetail == false) {
      styleClass = 'not-show-task-details';
    }
    return styleClass;
  }

  showDetails(data: any) {
    this.isShowDetail = true;
    this.taskData = data;
    this.updateTaskData = {
      id: data.id,
      title: data.title,
      description: data.description,
      deadline: data.description,
      status: data.status,
      assignee: data.assignee,
      reporter: data.reporter,
      priority: data.priority,
      createdBy: data.createdBy,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }

  closeShowDetails() {
    this.isShowDetail = false;
  }
}
