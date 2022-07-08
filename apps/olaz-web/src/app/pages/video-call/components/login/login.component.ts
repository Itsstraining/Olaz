import { Component, OnInit } from '@angular/core';
import { UserService } from 'apps/olaz-web/src/app/services/user.service';

@Component({
  selector: 'olaz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public Login: UserService) { }

  ngOnInit(): void {
  }

}
