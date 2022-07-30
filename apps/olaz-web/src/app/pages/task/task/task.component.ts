/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task/tasks/task.service';
import { UserService } from '../../../services/user.service';
import {
  collectionGroup,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
@Component({
  selector: 'olaz-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskListData: any;
  taskListFull: Array<any> = [];
  todo: any[] = [];
  doing: any[] = [];
  done: any[] = [];
  tempTasks: any[] = [];
  isLoading: boolean = true;
  panelOpenState = true;
  isShowDetail = false;
  isActiveDropdown = false;
  onSelected = 'Choose option';
  taskData: any;
  newTaskTitle: any = '';
  currentRoomId: any;
  appear: any;
  constructor(
    private TaskService: TaskService,
    public userService: UserService,
    private firestore: Firestore,
    private _snackBar: MatSnackBar,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      if (!data) return;
      this.appear = data;
    });
    this.currentRoomId = localStorage.getItem('roomId');
    this.getTaskListData();
  }

  goback() {
    this.Router.navigate([`/ownspace/m/${this.currentRoomId}`]);
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
    if (event.container.id == 'cdk-drop-list-0') {
      this.updateTaskFunc(event.container.data[event.currentIndex], 0);
    } else if (event.container.id == 'cdk-drop-list-1') {
      this.updateTaskFunc(event.container.data[event.currentIndex], 1);
    } else {
      this.updateTaskFunc(event.container.data[event.currentIndex], 2);
    }
  }

  openSnackBar(message: any) {
    this._snackBar.open(message.message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async getTaskListData() {
    // this.taskListData = undefined;
    this.taskListData = (
      await getDoc(doc(this.firestore, `rooms`, this.currentRoomId))
    ).data();
    const q = query(
      collection(this.firestore, `rooms`, `${this.currentRoomId}/taskList`)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.taskListFull.unshift(change.doc.data());
        }
        if (change.type === 'modified') {
          for (let i = 0; i < this.taskListFull.length; i++) {
            if (this.taskListFull[i].id == change.doc.data()['id']) {
              this.taskListFull[i] = change.doc.data();
            }
          }
        }
        if (change.type === 'removed') {
          const index = this.taskListFull.findIndex(
            (value: any) => value['id'] == change.doc.data()['id']
          );
          this.taskListFull.splice(index, 1);
        }
      });
      this.tempTasks = this.taskListFull;
      if(this.tempTasks != undefined){
        this.isLoading = false;
      }
      this.filterListTask();
    });
  }

  filterListTask() {
    if (this.tempTasks.length != 0) {
      this.todo =  this.tempTasks.filter((value) => value.status == 0)
      this.doing =  this.tempTasks.filter((value) => value.status == 1)
      this.done =  this.tempTasks.filter((value) => value.status == 2)
    }
  }

  addNew() {
    if (this.newTaskTitle == '') {
      // alert('You have to fill the task title!!');
      this.openSnackBar({ message: 'You have to fill the task title!!' });
      return;
    } else {
      const temp = {
        id: Date.now().toString(),
        title: this.newTaskTitle,
        description: '',
        deadline: Date.now(),
        status: 0,
        assignee: '',
        reporter: '',
        priority: 0,
        createdBy: this.userService.user.id,
        createdDate: Date.now(),
        updatedDate: Date.now(),
      };
      // this.todo.push(temp);
      this.TaskService.createTask(temp, this.currentRoomId).subscribe((data) =>
        this.openSnackBar(data)
      );
      this.newTaskTitle = '';
    }
  }

  updateTaskFunc(task: any, status: any) {
    const data = {
      ...task,
      status: status,
      assignee: '',
      updatedDate: Date.now(),
    };
    this.TaskService.updateTask(data, this.currentRoomId).subscribe(
      (message) => message
    );
  }

  async deleteeEmit(event: any) {
    await this.TaskService.deleteTask(
      this.taskData.id,
      this.currentRoomId
    ).subscribe((message) => this.openSnackBar(message));
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

  async showDetails(data: any) {
    this.isShowDetail = true;
    this.taskData = data;
  }

  closeShowDetails() {
    this.isShowDetail = false;
  }
}
