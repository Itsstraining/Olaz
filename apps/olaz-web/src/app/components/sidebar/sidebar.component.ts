/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
export const navbarData = [
  {
    routeLink: 'home',
    icon: 'uil uil-comments' ,
    Label: 'Chat',
  },
  {
    routeLink: 'invitation',
    icon: 'uil uil-video',
    Label: 'Meeting',
  },
  {
    routeLink: 'todo',
    icon: 'uil uil-edit' ,
    Label: 'To do' ,
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
  constructor() {}
  @Output() isOpened: EventEmitter<SideNavToggle> = new EventEmitter();
  // @Output() isOpened: EventEmitter<boolean> = new EventEmitter();


  ngOnInit(): void {}
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  closeSidenav(): void {
    this.collapsed = false;
    this.isOpened.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    // this.isOpened.emit(this.collapsed);
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    // this.isOpened.emit(this.collapsed);

    this.isOpened.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
