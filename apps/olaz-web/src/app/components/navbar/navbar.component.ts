/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'olaz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private UserService: UserService, public fireStore: Firestore) {}
    myID="hnbBbNtPTMIBxsLCBLJj"
    myIDMessage="1656682165468"
    public userCount: any;
    public messageCount: any;
  ngOnInit(): void {
    this.getRequests()
    this.getMessage()
  }
  getRequests(){
    this.UserService.notifyCount(this.myID).subscribe(
      (user:any)=> {
        console.log(user.requests.length)
        this.userCount = user.requests.length
      }
    )
  }
  getMessage(){
    this.UserService.messCount(this.myIDMessage).subscribe(
      (mess: any)=> {
        console.log(mess.messages.length)
        this.messageCount = mess.messages.length
      }
    )
  }
}
