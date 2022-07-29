import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private userSrv: UserService, private route: Router) { }
  canActivate(): boolean {

    if (this.userSrv.getCurrentUser()) {
      return true;
    } else {
      alert("You are not logged in to access this page")
      this.route.navigate([''])
      return false;
    }

  }
}
