/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'olaz-todo',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  screenWidth = 0;
  collapsed = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }


  isOpened(data: any):void{
    this.screenWidth=data.screenWidth;
    this.collapsed = data.collapsed;
  }

  getBodyClass():string{
    let styleClass ='';
    if(this.collapsed == true){
      styleClass = 'body-trimmed';
    }else if(this.collapsed ==false){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
