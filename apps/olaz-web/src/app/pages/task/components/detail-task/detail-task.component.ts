/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskModel } from 'apps/olaz-web/src/app/models/task.model';
import { TaskService } from 'apps/olaz-web/src/app/services/task/tasks/task.service';

@Component({
  selector: 'olaz-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit, OnChanges {
  @Input() isShowDetail: any;
  @Output() isShowDetailToggle: EventEmitter<any> = new EventEmitter<any>();
  @Input() taskData: any;
  @Output() updateTaskEmit: EventEmitter<any> = new EventEmitter<any>()

  panelOpenState = false;
  isActiveDropdown = false;
  isActiveDropdownPrio = false;
  statusColor!: string;
  statusBgColor!: string;
  updateTaskInfo!: TaskModel;

  newTitle!: string
  newDes!: string
  // newDeadline: any
  newDeadline = new FormControl();

  newPriority: any
  newStatus: any

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
    }
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
    }
  ]

  constructor(private taskService: TaskService) { 
  }

  ngOnChanges(): void {
    if(this.taskData !== undefined){
      this.newTitle = this.taskData.title;
      this.newDes = this.taskData.description;
      this.newPriority = this.taskData.priority;
      this.newStatus = this.taskData.status;
      this.newDeadline.setValue(new Date(this.taskData['deadline']))
    }
  }

  ngOnInit(): void {
  }

  show(status: any){
    this.newStatus = status;
  }

  showPrio(priority: any){
    this.newPriority = priority;
  }

  getDropdownClass():string{
    let styleClass ='';
    if(this.isActiveDropdown == true){
      styleClass = 'active';
    }else {
      styleClass = '';
    }
    if(this.newStatus !== 0){
      styleClass += ' lightFont';
    }else{
      styleClass += ' blackFont';
    }
    return styleClass;
  }

  getDropdownColorClass():string{
    let styleClass ='';
    if(this.newStatus == 0){
      styleClass = 'todo-active';
    }else if(this.newStatus == 1){
      styleClass = 'doing-active';
    }else{
      styleClass = 'done-active';
    }
    return styleClass;
  }

  getDropdownPrioClass():string{
    let styleClass ='';
    if(this.isActiveDropdownPrio == true){
      styleClass = 'active';
    }else {
      styleClass = '';
    }
    if(this.newPriority !== 0){
      styleClass += ' lightFont';
      if(this.newPriority == 1){
        styleClass += ' medium-active';
      }else {
        styleClass += ' important-active';
      }
    }else{
      styleClass += ' blackFont normal-active';
    }
    return styleClass;
  }

  toggleDropdown(){
    this.isActiveDropdown = !this.isActiveDropdown;
  }
  toggleDropdownPrio(){
    this.isActiveDropdownPrio = !this.isActiveDropdownPrio;
  }

  updateTaskBtn(){
    const temp = Date.parse(this.newDeadline.value)/1000;
    // console.log(new Date(temp * 1000))
    // console.log(new Date((Date.parse(this.newDeadline.value)/1000)*1000))
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
      assignee: '',
      reporter: '',
    }
    this.taskService.updateTask(data, data.id).subscribe(
      (message) => this.updateTaskEmit.emit({message: message, updateTaskData: data})
    );
  }

  deleteTask(taskId: any){
    this.taskService.deleteTask(taskId, `1657869801036`)
  }

  closeShowDetails(){
    this.isShowDetail = false;
    this.isShowDetailToggle.emit(this.isShowDetail);
  }

  getShowDetailsClass(){
    let styleClass = '';
    if (this.isShowDetail == true) {
      styleClass = 'task-details';
    } else if (this.isShowDetail == false) {
      styleClass = 'not-show-task-details';
    }
    return styleClass;
  }

}
