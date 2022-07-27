/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task/tasks/task.service';
import { UserService } from '../../../services/user.service';
import { doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';

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
    private firestore: Firestore,
    private _snackBar: MatSnackBar
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

  openSnackBar(message: any) {
    this._snackBar.open(message.message, '',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      
    });
  }

  async getTaskListData() {
    this.taskListData = undefined;
    this.taskListFull.length = 0;

    docSnapshots(doc(this.firestore, 'taskList', `TL1657869801036`)).subscribe(
      async (result) => {
        if (!result.metadata.fromCache) {
          this.taskListFull.length = 0;

          this.taskListData = result.data();
          for (let i = 0; i < this.taskListData.taskList.length; i++) {
            docSnapshots(
              doc(this.firestore, 'tasks', this.taskListData.taskList[i])
            ).subscribe((data) => {
              console.log(data.data());
              const temp = data.data();
              // if (!data.metadata.fromCache) {
              const index = this.taskListFull.findIndex(
                (value) => value['id'] == temp
              );
              if (!index) {
                this.taskListFull.push(temp);
              }
              {
                this.taskListFull[i] = temp;
              }
              // }
              this.filterListTask();
            });
          }
        }
      }
    );
  }

  filterListTask() {
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.taskListFull.filter((value) => {
      if (value.status == 0) return this.todo.push(value);
      if (value.status == 1) return this.doing.push(value);
      if (value.status == 2) return this.done.push(value);
      return;
    });
    console.log(this.todo, this.doing, this.done);
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
        (data) => this.openSnackBar(data)
      );
      this.newTaskTitle = '';
    }
    this.taskListFull.length = 0;
  }

  deleteTask(taskId: any) {
    this.TaskService.deleteTask(taskId, '1657869801036').subscribe(
      (data) => this.openSnackBar(data)
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
      this.getTaskListData();
      this.openSnackBar({message: 'Update Success'})

      // this.filterListTask();
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
