import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../pages/login/login.service';
import 'rxjs/add/operator/catch';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  text = {
    'ar': 'ليس لديك صلاحيات لإتمام العملية',
    'en-US': 'You dont have permissions to continue'
  };

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.token || null}`,
        Locale: localStorage.getItem('locale') || 'ar',
        Url: window.location.href,
        'Access-Control-Allow-Origin': '*'
      }
    });

    return next.handle(request).catch((err: any, _caught) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.snackBar.open(this.text[localStorage.getItem('locale')], '', {
            duration: 2500
          });
          this.router.navigateByUrl('/');
        } else {
          return Observable.throw(err);
        }
      }
    });
  }
}
