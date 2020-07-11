
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { Permissions } from './Permissions';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private permissions: Permissions,
        public snackBar: MatSnackBar,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const result = this.permissions.canActivate(route.params.id);

        if (!result) {
            this.snackBar.open('You dont have permissions to open the link', 'Exit', {
                duration: 2000
            });
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }

        return result;
    }
}
