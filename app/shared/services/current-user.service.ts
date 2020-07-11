import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';

import { CookieManagerService } from './cookie-manager.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SchoolService2 } from 'src/app/pages/addLookups/schools/school2.service';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public user: BehaviorSubject<any>;
  private userData: any;

  private userImage: any;
  public _userImage = new BehaviorSubject<any>({});
  /*public image: Observable<any>;
  public _image = new BehaviorSubject<any>({});

 */

  constructor(
    private cookieManagerService: CookieManagerService,
    private schoolService2: SchoolService2
  ) {
    if (this.cookieManagerService.getCookie('_t')) {
      const token = this.cookieManagerService.getCookie('_t');
      this.userData = jwt_decode(token);
    } else {
      this.userData = JSON.parse('{}');
    }
    this.user = new BehaviorSubject<any>(this.userData);

    if (localStorage.getItem('userImage')) {
      // this._userImage = new BehaviorSubject<any>(localStorage.getItem('userImage'));
      // this.userImage = this._userImage.asObservable();
    }

    let objectURL = 'src/assets/img/avatars/avatar.png';
    const id = this.User.schoolId;
    this.schoolService2.getSchool(id).subscribe(school => {
      if (school.imageFile) {
        objectURL = 'data:image/jpeg;base64,' + school.imageFile;
        this._userImage.next(objectURL);
      }
    });
  }

  public set User(data: any) {
    this.userData = data;
    console.log('-------------set user data--');
    
    this.user.next(this.userData);
  }

  public get User(): any {
    console.log('-------------getuser data--');
    return this.userData;
  
  }

  public set UserImage(data: any) {
    this.userImage = data;
    this._userImage.next(this.userImage);
  }

  public get UserImage(): any {
    return this._userImage;
  }

}
