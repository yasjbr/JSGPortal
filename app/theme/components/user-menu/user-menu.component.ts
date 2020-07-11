import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';
import { CookieManagerService } from 'src/app/shared/services/cookie-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/img/juico.jpg';
  constructor(private loginService: LoginService,
    private cookieManagerService: CookieManagerService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.loginService.isLoggedInVar = false;
    this.cookieManagerService.deleteCookie(this.loginService.tokenCookieName);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
