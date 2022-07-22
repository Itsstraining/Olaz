/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'olaz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'olaz-web';
  panelOpenState = false;
  userInfo = undefined
  

  path=false;


  ngOnInit(): void {
  }


  
}
