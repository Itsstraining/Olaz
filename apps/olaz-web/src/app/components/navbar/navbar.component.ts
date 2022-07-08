/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'olaz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private UserService:UserService
  ) {}

  count = 0;
  messageCount = 0
  ngOnInit(): void {
    this.UserService.user$.subscribe(user=>{
      if(!user) return
      this.UserService.notifyCount(user.id).subscribe((count:any)=>{
        this.count = count.requests.length;
      })
    })
  }
}
