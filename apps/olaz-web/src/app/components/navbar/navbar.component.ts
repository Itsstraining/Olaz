/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { DialogFriendComponent } from '../../pages/message/components/dialog-friend/dialog-friend.component';
import { RejectAddComponent } from '../../pages/message/components/reject-add/reject-add.component';
import { ProfileComponent } from '../../pages/task/components/profile/profile.component';
@Component({
  selector: 'olaz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public UserService: UserService
  ) { }

  count = 0;
  messageCount = 0;
  userInfo = undefined;

  ngOnInit(): void {
    this.UserService.user$.subscribe(user => {
      if (!user) return
      this.UserService.notifyCount(user.id).subscribe((count: any) => {
        if (!count) return
        this.count = count.requests.length;
      })
      this.userInfo = user;
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

  handleError(e: any) {
    console.log(e)
    e.target.src = "https://cdyduochopluc.edu.vn/wp-content/uploads/2019/07/anh-dai-dien-FB-200-1.jpg"
  }

  openDialogAddRj() {
    const dialogRef = this.dialog.open(RejectAddComponent, {
      width: '50%', height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '30%', height: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
