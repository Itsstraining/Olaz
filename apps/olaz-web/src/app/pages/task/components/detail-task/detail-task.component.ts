/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'olaz-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {
  @Input() taskData: any;

  onSelected = 'Choose option'
  panelOpenState = false;
  isActiveDropdown = false;

  constructor() { 
  }

  ngOnInit(): void {
    this.onSelected = 'Choose option'
    
    if(this.taskData === undefined){
      this.onSelected = 'Choose option'
    }else{
      this.onSelected = this.taskData.status
    }
  }

  show(status: any){
    this.taskData.status = status;
    // this.taskData.status = status
  }

  getDropdownClass():string{
    let styleClass ='';
    if(this.isActiveDropdown == true){
      styleClass = 'active';
    }else {
      styleClass = ''
    }
    return styleClass;
  }

  toggleDropdown(){
    this.isActiveDropdown = !this.isActiveDropdown;
  }

}
