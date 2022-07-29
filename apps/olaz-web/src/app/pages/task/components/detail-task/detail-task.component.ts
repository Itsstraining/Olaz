/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from 'apps/olaz-web/src/app/components/delete-dialog/delete-dialog.component';
import { TaskModel } from 'apps/olaz-web/src/app/models/task.model';
import { TaskService } from 'apps/olaz-web/src/app/services/task/tasks/task.service';
import { UserService } from 'apps/olaz-web/src/app/services/user.service';
import { PickUserDialogComponent } from '../pick-user-dialog/pick-user-dialog.component';

@Component({
  selector: 'olaz-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss'],
})
export class DetailTaskComponent implements OnInit, OnChanges {
  @Input() isShowDetail: any;
  @Input() taskData: any;
  @Input() taskListData: any;

  @Output() isShowDetailToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTaskEmit: EventEmitter<any> = new EventEmitter<any>();

  panelOpenState = false;
  isActiveDropdown = false;
  isActiveDropdownPrio = false;
  statusColor!: string;
  statusBgColor!: string;
  updateTaskInfo!: TaskModel;
  currentRoomId: any;
  participantList: any[] = [];
  newAssignee: any;
  newReporter: any;
  newTitle!: string;
  newDes!: string;
  // newDeadline: any
  newDeadline = new FormControl();

  newPriority: any;
  newStatus: any;

  arr = [
    {
      id: 0,
      value: 'To do',
    },
    {
      id: 1,
      value: 'Doing',
    },
    {
      id: 2,
      value: 'Done',
    },
  ];

  arrPrio = [
    {
      id: 0,
      value: 'Normal',
    },
    {
      id: 1,
      value: 'Medium',
    },
    {
      id: 2,
      value: 'Important',
    },
  ];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(PickUserDialogComponent, {
      width: '500px',
      data: this.participantList
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newAssignee = result;
      }
    });
  }

  ngOnChanges(): void {
    if (this.taskData !== undefined) {
      this.newTitle = this.taskData.title;
      this.newDes = this.taskData.description;
      this.newPriority = this.taskData.priority;
      this.newStatus = this.taskData.status;
      this.newDeadline.setValue(new Date(this.taskData['deadline']));

      // this.newAssignee = this.userService.getUserByID(this.taskData.assignee);
    }
  }

  ngOnInit(): void {
    this.currentRoomId = localStorage.getItem('roomId');
    if (this.taskData !== undefined) {
      this.newTitle = this.taskData.title;
      this.newDes = this.taskData.description;
      this.newPriority = this.taskData.priority;
      this.newStatus = this.taskData.status;
      this.newDeadline.setValue(new Date(this.taskData['deadline']));
    };
    this.getParticipantList();
  }

  async getParticipantList(){
    this.participantList.length = 0;
    for(let i = 0; i < this.taskListData.users.length; i++){
      const temp =(await this.userService.getUserByID(this.taskListData.users[i])).data();
      this.participantList.push(temp);
      this.getAssignee_Reporter(temp);
    }
  }

  getAssignee_Reporter(temp: any){
    
    if(this.taskData.assignee == ''){
      this.newAssignee = {displayName: 'Unknown', photoURL: "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"}
    }else{
      if(temp['id'] == this.newAssignee){
        this.newAssignee = temp;
      }
    }
    if(this.taskData.reporter == ''){
      this.newReporter = {displayName: 'Unknown', photoURL: "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"}
    }else{
      if(temp['id'] == this.newAssignee){
        this.newReporter = temp;
      }
    }
  }

  show(status: any) {
    this.newStatus = status;
    this.updateTaskBtn();
  }

  showPrio(priority: any) {
    this.newPriority = priority;
    this.updateTaskBtn();
  }

  getDropdownClass(): string {
    let styleClass = '';
    if (this.isActiveDropdown == true) {
      styleClass = 'active';
    } else {
      styleClass = '';
    }
    if (this.newStatus !== 0) {
      styleClass += ' lightFont';
    } else {
      styleClass += ' blackFont';
    }
    return styleClass;
  }

  getDropdownColorClass(): string {
    let styleClass = '';
    if (this.newStatus == 0) {
      styleClass = 'todo-active';
    } else if (this.newStatus == 1) {
      styleClass = 'doing-active';
    } else {
      styleClass = 'done-active';
    }
    return styleClass;
  }

  getDropdownPrioClass(): string {
    let styleClass = '';
    if (this.isActiveDropdownPrio == true) {
      styleClass = 'active';
    } else {
      styleClass = '';
    }
    if (this.newPriority !== 0) {
      styleClass += ' lightFont';
      if (this.newPriority == 1) {
        styleClass += ' medium-active';
      } else {
        styleClass += ' important-active';
      }
    } else {
      styleClass += ' blackFont normal-active';
    }
    return styleClass;
  }

  toggleDropdown() {
    this.isActiveDropdown = !this.isActiveDropdown;
  }
  toggleDropdownPrio() {
    this.isActiveDropdownPrio = !this.isActiveDropdownPrio;
  }

  openSnackBar(message: any) {
    this._snackBar.open(message.message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async updateTaskBtn() {
    const temp = Date.parse(this.newDeadline.value);
    const data = {
      id: this.taskData.id,
      title: this.newTitle,
      description: this.newDes,
      status: this.newStatus,
      priority: this.newPriority,
      createdDate: this.taskData.createdDate,
      deadline: temp,
      updatedDate: Date.now(),
      createdBy: this.taskData.createdBy,
      assignee: this.newAssignee,
      reporter: '',
    };
    console.log(data)
    this.taskService
      .updateTask(data, this.taskListData.id)
      .subscribe((message) => {this.openSnackBar(message); console.log(message)});
  }

  deleteTask(taskId: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: taskId
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // await this.taskService
        //   .deleteTask(taskId, this.currentRoomId)
        //   .subscribe((message) => this.openSnackBar(message));
        this.isShowDetail = false;
        this.isShowDetailToggle.emit(this.isShowDetail);
        this.deleteTaskEmit.emit('delete');
      }
    });
  }

  closeShowDetails() {
    this.isShowDetail = false;
    this.isShowDetailToggle.emit(this.isShowDetail);
  }

  getShowDetailsClass() {
    let styleClass = '';
    if (this.isShowDetail == true) {
      styleClass = 'task-details';
    } else if (this.isShowDetail == false) {
      styleClass = 'not-show-task-details';
    }
    return styleClass;
  }
}
