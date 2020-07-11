import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../pages/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate  {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) { return true; }

    this.router.navigate(['/login/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
