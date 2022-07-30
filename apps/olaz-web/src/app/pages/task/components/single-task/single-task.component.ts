/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'olaz-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit, OnChanges {
  deadline: any;
  assignee: any;
  @Input() task: any;
  
  constructor(public datePipe: DatePipe, private userService: UserService) { 
  }
  ngOnChanges(): void {
    this.deadline = this.datePipe.transform(new Date(this.task.deadline), 'dd/MM/yyyy');
    this.getAssigneePhotoURL();
  }

  ngOnInit(): void {
    this.deadline =this.datePipe.transform(new Date(this.task.deadline), 'dd/MM/yyyy');
    this.getAssigneePhotoURL();
  }

  handleError(e: any) {
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }

  async getAssigneePhotoURL(){
    if(this.task.assignee !== ''){
      this.assignee = await (await this.userService.getUserByID(this.task.assignee)).data()
    }
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

}