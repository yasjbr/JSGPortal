import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  image: any;
  schoolName: any;
  currentYear: any;

  constructor(private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.login();
  }

  login() {
    // Get user image
    this.currentUserService._userImage.subscribe(image => this.image = image);
    // this.image = localStorage.getItem('userImage');
    // if (this.image && (this.image as string).indexOf('data:') !== -1) {
      this.image = this.sanitizer.bypassSecurityTrustUrl(this.image);
    // }
    const locale = localStorage.getItem('locale');
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolName = locale === 'ar' ? currentUser.arSchoolName : currentUser.enSchoolName;
    this.currentYear = currentUser.yearName;

    // const schoolId = currentUser.schoolId;
    // this.schoolService.getSchool(schoolId).subscribe(res => {
    //   const objectURL = 'data:image/jpeg;base64,' + res.imageFile;
    //   this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    // });
  }

}
