/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {  transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'olaz-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  todo =[{
    title: 'My daily life', 
    description:'remember to do home work',
    status: 'To do',
    deadline: '22/07/2022',
    assignee: '',
    reporter: '',
    priority: ''
  },
  {
    title: 'Make new daily routine', 
    description:'remember to do home work',
    status: 'To do',
    deadline: '22/07/2022',
    assignee: ''
  },
  {
    title: 'Design prototype', 
    description:'remember to do home work',
    status: 'Doing',
    deadline: '22/07/2022',
    assignee: ''
  },
  {
    title: 'my daily life  my da', 
    description:'remember to do home work',
    status: 'To do',
    deadline: '22/07/2022',
    assignee: ''
  },
  
  {
    title: 'New project', 
    description:'remember to do home work',
    status: 'Done',
    deadline: '22/07/2022',
    assignee: ''
  },
];
  doing =[{
    title: 'my daily life  my daily life hihimy daily life hihi my daily life hihi my daily life  my daily life hihimy daily life hihi my daily life hihi', 
    description:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  }];
  done =[];
  panelOpenState = true;
  isShowDetail = false;
  isActiveDropdown = false;
  onSelected = 'Choose option'
  taskData: any;
  constructor() { }

  ngOnInit(): void {
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

  showDetails(taskData: any){
    this.isShowDetail = true;
    this.taskData = taskData
  }

  closeShowDetails(){
    this.isShowDetail = false
  }

  // show(status: any){
  //   this.onSelected = status
  // }

  // getDropdownClass():string{
  //   let styleClass ='';
  //   if(this.isActiveDropdown == true){
  //     styleClass = 'active';
  //   }else {
  //     styleClass = ''
  //   }
  //   return styleClass;
  // }

  // toggleDropdown(){
  //   this.isActiveDropdown = !this.isActiveDropdown;
  // }

}
