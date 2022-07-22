/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskModel } from 'apps/olaz-web/src/app/models/task.model';

@Component({
  selector: 'olaz-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit, OnChanges {
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

  constructor() { 
  }

  ngOnChanges(): void {
    if(this.taskData !== undefined){
      this.newTitle = this.taskData.title;
      this.newDes = this.taskData.description;
      this.updateTaskInfo = this.taskData;
    }
  }

  ngOnInit(): void {
  }

  show(status: any){
    // this.taskData.status = status;
    this.updateTaskInfo.status = status;
    // this.updateTaskEmit.emit(this.updateTaskInfo);
  }

  showPrio(priority: any){
    // this.taskData.priority = priority;
    this.updateTaskInfo.priority = priority;
    // this.updateTaskEmit.emit(this.updateTaskInfo);
  }

  updateTitle(newData:any){
      // this.updateTaskInfo = this.taskData;
    // this.updateTaskInfo.title = newData;
    this.updateTaskEmit.emit({type: 'title', value: newData});
  }

  updateDes(newData:any){
    this.updateTaskEmit.emit({type: 'description', value: newData});
  }

  getDropdownClass():string{
    let styleClass ='';
    if(this.isActiveDropdown == true){
      styleClass = 'active';
    }else {
      styleClass = '';
    }
    if(this.taskData.status !== 'To do'){
      styleClass += ' lightFont';
    }else{
      styleClass += ' blackFont';
    }
    return styleClass;
  }

  getDropdownColorClass():string{
    let styleClass ='';
    if(this.taskData.status == 'To do'){
      styleClass = 'todo-active';
    }else if(this.taskData.status == 'Doing'){
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
    if(this.taskData.priority !== 'Normal'){
      styleClass += ' lightFont';
      if(this.taskData.priority == 'Medium'){
        styleClass += ' medium-active';
      }else {
        styleClass += ' important-active';
      }
    }else{
      styleClass += ' blackFont normal-active';
    }
    return styleClass;
  }

  getDropdownPrioColorClass():string{
    let styleClass ='';
    if(this.taskData.priority == 'Normal'){
      styleClass = 'normal-active';
    }else if(this.taskData.priority == 'Medium'){
      styleClass = 'medium-active';
    }else{
      styleClass = 'important-active';
    }
    return styleClass;
  }

  toggleDropdown(){
    this.isActiveDropdown = !this.isActiveDropdown;
  }
  toggleDropdownPrio(){
    this.isActiveDropdownPrio = !this.isActiveDropdownPrio;
  }

}
