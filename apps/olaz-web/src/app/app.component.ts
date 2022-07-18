/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogFowardComponent } from './pages/message/components/dialog-foward/dialog-foward.component';
import { DialogFriendComponent } from './pages/message/components/dialog-friend/dialog-friend.component';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'olaz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'olaz-web';
  panelOpenState = false;
  userInfo = undefined
  
  // @Input() screenWidthContent = 0;
  // @Input() collapsed = false;
  path=false;

  constructor(public dialog: MatDialog, public userService: UserService, private router: Router, private location: Location) {
    // this.router.events.subscribe((val)=>{
      // this.path = this.location.path()
      // console.log(val)
    // })
    // if(this.location.path() == `/call/call/YZHEycnganXwXfXNI5ah`){
    //   this.path = true;
    //   console.log(this.path)
    //   if (!this.userInfo) return;
    //   console.log(this.userInfo['incall']);
    // }
   }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (!user) return;
      if(this.location.prepareExternalUrl()== `/call/call/`){
        this.path = true;
        console.log(this.path)
        console.log(user.incall)
      }
      this.userInfo = user;
    })
  }

  // isSideNavCollapsed =  false;
  screenWidth = 0;

  isOpened(data: any):void{
    this.screenWidth=data.screenWidth;
    this.collapsed = data.collapsed;
    console.log(data.screenWidth)
  }
  collapsed = false;

  getBodyClass():string{
    let styleClass ='';
    if(this.userInfo != undefined){
      if(this.userInfo['incall'] == true ){
        styleClass ='body-without-login'
      }
      if(this.collapsed == true){
        styleClass = 'body-trimmed';
      }else if(this.collapsed ==false){
        styleClass = 'body-md-screen'
      }
    }else{
      styleClass = 'body-without-login'
    }
    return styleClass;
  }
  
  getMatDrawerClass():string{
    let styleWithoutLoginClass = '';
    if(this.userInfo != undefined){
      styleWithoutLoginClass = 'mat-drawer-with-login';
    }else{
      styleWithoutLoginClass = 'mat-drawer-without-login';
    }
    return styleWithoutLoginClass;
  }

  // inCall(){
  //   let styleClass ='';
  //   if(this.userInfo == undefined) return;
  //   if(this.userInfo['incall'] == false ){
  //     if(this.collapsed == true){
  //       styleClass = 'body-trimmed';
  //     }else if(this.collapsed ==false){
  //       styleClass = 'body-md-screen'
  //     }
  //   }else{
  //     styleClass = 'body-without-login'
  //   }
  //   return styleClass;
  // }


  // openDialog(): void {
  //   this.dialog.open(DialogComponent, {
  //     width: '250px',
  //   });
  // }

  // openDialogFw(){
  //   const dialogRef = this.dialog.open(DialogFowardComponent, {
  //     width: '50%'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  // openDialogAddFr(){
  //   const dialogRef = this.dialog.open(DialogFriendComponent, {
  //     width: '50%'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  
}
