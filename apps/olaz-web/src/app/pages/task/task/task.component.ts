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
    title: 'my daily life  my dai', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  },
  {
    title: 'my daily life  my dai', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  },
  {
    title: 'my daily life  my dai', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  },
  {
    title: 'my daily life  my dai', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  },
  
  {
    title: 'my daily life  my dai', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  },
];
  doing =[{
    title: 'my daily life  my daily life hihimy daily life hihi my daily life hihi', 
    content:'remember to do home work',
    deadline: '22/07/2022',
    assignee: ''
  }];
  done =[];

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

}
