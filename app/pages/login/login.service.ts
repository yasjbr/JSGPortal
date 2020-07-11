
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieManagerService } from "src/app/shared/services/cookie-manager.service";
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { environment } from "src/environments/environment";
//import { map } from "rxjs/internal/operators/map";
import { Menu } from 'src/app/theme/components/menu/menu.model';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/map';

//import { map } from 'rxjs/operators/map';

@Injectable({
    providedIn: "root"
})
export class LoginService {
    public sUserId: any;
    public sSchoolId: any;
    public schoolName: any;
    public sLoginData: any;

    private apiUrl = environment.apiBaseUrl;

    isLoggedInVar = false;
    redirectUrl: string;
    tokenCookieName = '_t';

    constructor(private http: HttpClient,
        private cookieManagerService: CookieManagerService,
        private currentUserService: CurrentUserService) { }

    login(credentials) {
        return this.http.post(`${this.apiUrl}Auth/Login`, credentials).map((response: any) => {
            const result = response;
            if (result.token) {
            const decodedJwtData = jwt_decode(result.token);
            this.currentUserService.User = decodedJwtData;
            this.cookieManagerService.setCookie(this.tokenCookieName, result.token, 2);
            }
            return result;
        });
    }

    isLoggedIn() {
        const token = this.token;
        if (!token) {
            return false;
        }
        const decodedJwtData = jwt_decode(token);
        const current_time = new Date().getTime() / 1000;
        if (!decodedJwtData.exp || current_time > decodedJwtData.exp) {
            /* expired */
            this.cookieManagerService.deleteCookie(this.tokenCookieName);
            return false;
        }
        return true;
    }

    restorePassword(credentials: any) {
        return this.http.post(`${this.apiUrl}RestorePassword`, credentials)
            .map((response: any) => {
                return true;
            });
    }

    completeRestorePassword(credentials: any) {
        return this.http.post(`${this.apiUrl}CompleteRestorePassword`, credentials)
            .map((response: any) => {
                return true;
            });
    }

    get currentUser() {
        // const token = localStorage.getItem('token');
        const token = this.token;
        console.log('--------------currentuser----------');
        
        if (!token) { return null; }
        const decodeToken = jwt_decode(token);
        console.log('token: ', token);
        console.log('decodeToken: ', decodeToken);

        this.currentUserService.User = decodeToken;
        return decodeToken;
    }

    get token() {
        return this.cookieManagerService.getCookie(this.tokenCookieName);
    }

    getUserMenu(userId): Observable<Menu> {
        return this.http.get<Menu>(`${this.apiUrl}Users/GetUserMenu/${userId}`, environment.httpOptions);
    }

}
