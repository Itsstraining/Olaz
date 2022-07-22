/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
export const navbarData = [
  {
    routeLink: 'm/:id',
    icon: 'uil uil-comments',
    Label: 'Message',
  },
  {
    routeLink: 'call',
    icon: 'uil uil-video',
    Label: 'Meeting',
  },
  {
    routeLink: 'todo',
    icon: 'uil uil-edit',
    Label: 'To do',
  },
  {
    routeLink: 'profile',
    icon: 'uil uil-user-circle',
    Label: 'Profile',
  },
];

@Component({
  selector: 'olaz-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public userService: UserService, ) {
   
   }
  @Output() isOpened: EventEmitter<SideNavToggle> = new EventEmitter();
  // @Output() isOpened: EventEmitter<boolean> = new EventEmitter();


  ngOnInit(): void {
    this.userService.user$.subscribe(data => {
      if (!data) return;
      if (data.rooms.length !== 0) {
        navbarData[0].routeLink = `m/${data.rooms[0]}`;
      } else {
        navbarData[0].routeLink = `m/123456789`;
      }
      this.appear = data;
      console.log(data)

    })
    
  }
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
<<<<<<< HEAD
  userInfo = undefined;
  incall = false;
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

  closeSidenav(): void {
    this.collapsed = false;
    this.isOpened.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    // this.isOpened.emit(this.collapsed);
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    // this.isOpened.emit(this.collapsed);
=======
  // closeSidenav(): void {
  //   this.collapsed = false;
  //   this.isOpened.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  //   // this.isOpened.emit(this.collapsed);
  // }
  // toggleCollapse(): void {
  //   this.collapsed = !this.collapsed;
  //   // this.isOpened.emit(this.collapsed);
>>>>>>> eec8e86dbab1f5a486d19499bf6e4022f34cf5d9

  //   this.isOpened.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  // }
  appear = undefined;
}
