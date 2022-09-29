import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private accountService: AccountService) {}

  canActivate(): boolean {

    const token = this.accountService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
