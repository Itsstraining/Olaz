/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from './dialog/dialog.component';
// import { DialogFowardComponent } from './pages/message/components/dialog-foward/dialog-foward.component';
// import { DialogFriendComponent } from './pages/message/components/dialog-friend/dialog-friend.component';
// import { UserService } from './services/user.service';

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

  // constructor(public dialog: MatDialog, public userService: UserService) { }
  ngOnInit(): void {
    // this.userService.user$.subscribe(user => {
    //   if (!user) return;
    //   this.userInfo = user;
    // })
  }

  // isSideNavCollapsed =  false;
  // screenWidth = 0;

  // isOpened(data: any):void{
  //   this.screenWidth=data.screenWidth;
  //   this.collapsed = data.collapsed;
  //   console.log(data.screenWidth)
  // }
  // collapsed = false;

  // getBodyClass():string{
  //   let styleClass ='';
  //   if(this.userInfo != undefined){
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

  // getMatDrawerClass():string{
  //   let styleWithoutLoginClass = '';
  //   if(this.userInfo != undefined){
  //     styleWithoutLoginClass = 'mat-drawer-with-login';
  //   }else{
  //     styleWithoutLoginClass = 'mat-drawer-without-login';
  //   }
  //   return styleWithoutLoginClass;
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
