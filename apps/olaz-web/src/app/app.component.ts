/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogFowardComponent } from './pages/message/components/dialog-foward/dialog-foward.component';
import { DialogFriendComponent } from './pages/message/components/dialog-friend/dialog-friend.component';

@Component({
  selector: 'olaz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'olaz-web';
  panelOpenState = false;
  
  // @Input() screenWidthContent = 0;
  // @Input() collapsed = false;

  constructor(public dialog: MatDialog) { }

  // isSideNavCollapsed =  false;
  screenWidth = 0;

  isOpened(data: any):void{
    this.screenWidth=data.screenWidth;
    this.collapsed = data.collapsed;
  }
  collapsed = false;

  getBodyClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 768 ){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 ){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
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
