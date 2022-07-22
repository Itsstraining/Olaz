/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'olaz-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges{

  taskListFull = [
    {
      id: 1658409084118,
      title: 'My daily life', 
      description:'remember to do home work',
      status: 'To do',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Normal'
    },
    {
      id: 1658409084114,
      title: 'Make new daily routine', 
      description:'remember to do home work',
      status: 'To do',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Important'
    },
    {
      id: 1658409084133,
      title: 'my daily life  my da', 
      description:'remember to do home work',
      status: 'To do',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Normal'
    },
    {
      id: 1658409084112,
      title: 'my daily life  my daily life hihimy daily life hihi my daily life hihi my daily life  my daily life hihimy daily life hihi my daily life hihi', 
      description:'remember to do home work',
      status: 'Doing',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Medium'
    },
    {
      id: 1658409084199,
      title: 'Design prototype', 
      description:'remember to do home work',
      status: 'Doing',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Normal'
    },
    {
      id: 1658409084198,
      title: 'New project', 
      description:'remember to do home work',
      status: 'Done',
      deadline: 1658409084198,
      assignee: '',
      reporter: '',
      priority: 'Normal'
    },
  ]

  todo = <any>[];
  doing =<any>[];
  done =<any>[];
  panelOpenState = true;
  isShowDetail = false;
  isActiveDropdown = false;
  onSelected = 'Choose option'
  taskData: any;
  updateTaskData: any;
  newTaskTitle: any;
  
  constructor() { }
  ngOnChanges(): void {
    this.taskListFull.filter(value => {
      if(value.status == 'To do') return this.todo.push(value)
      if(value.status == 'Doing') return this.doing.push(value)
      if(value.status == 'Done') return this.done.push(value)
    })
  }

  ngOnInit(): void {
    this.taskListFull.filter(value => {
      if(value.status == 'To do') return this.todo.push(value)
      if(value.status == 'Doing') return this.doing.push(value)
      if(value.status == 'Done') return this.done.push(value)
    })
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNew(){
    this.todo.push({
      id: Date.now(),
      title: this.newTaskTitle,
      description: '',
      deadline: Date.now(),
      status: 'To do',
      assignee: '',
      reporter: '',
      priority: 'Normal'
    });
    this.newTaskTitle = ''
  }

  updateTaskEmit(event: any){
    if(event){
      switch(event.type){
        case 'title': return this.updateTaskData.title = event.value;
        case 'description': return this.updateTaskData.description = event.value;
        default: return;
      }  
    }
  }

  updateTaskBtn(){
    for(let i = 0; i < this.taskListFull.length; i++){
      if(this.updateTaskData.id == this.taskListFull[i].id){
        this.taskListFull[i]=this.updateTaskData;
          console.log(this.taskListFull[i])

      }
    }
  }

  getShowDetailsClass():string{
    let styleClass ='';
    if(this.isShowDetail == true){
      styleClass = 'task-details';
    }else if(this.isShowDetail ==false){
      styleClass = 'not-show-task-details'
    }
    return styleClass;
  }

  showDetails(data: any){
    this.isShowDetail = true;
    this.taskData = data;
    this.updateTaskData = data;
  }

  closeShowDetails(){
    this.isShowDetail = false
  }

}
