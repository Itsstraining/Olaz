/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { DialogFriendComponent } from '../../pages/message/components/dialog-friend/dialog-friend.component';
import { RejectAddComponent } from '../../pages/message/components/reject-add/reject-add.component';
@Component({
  selector: 'olaz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
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
  openDialogAddFr() {
    const dialogRef = this.dialog.open(DialogFriendComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAddRj(){
    const dialogRef = this.dialog.open(RejectAddComponent,{
      width: '50%', height:'350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
