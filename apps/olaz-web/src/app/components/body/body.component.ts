/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'olaz-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  @Input() screenWidth = 0;
  @Input() collapsed = false;
  constructor() { }

  ngOnInit(): void {
  }
  getBodyClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 768 ){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 ){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}

