import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { YearService } from '../../addLookups/years/year.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { id } from '@swimlane/ngx-datatable/release/utils';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-study-year',
  templateUrl: './study-year.component.html',
  styleUrls: ['./study-year.component.scss']    
})
export class StudyYearComponent implements OnInit {
  durationInSeconds = 5;

  image: any;
  schoolName: any;
  currentYear: any;
  yearsList:LkpYear[];
  name:any;
  schoolId:any;
  yearId:any;
  constructor(
    private snackBar: MatSnackBar,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
    private yearService: YearService
  ) {

    {
      let currentUser: users;
      this.currentUserService.user.subscribe(user => (currentUser = user));
      this.name = currentUser.username;
      this.schoolId = currentUser.schoolId;
      this.schoolName = currentUser.arSchoolName;
      this.yearId = currentUser.yearId;
     }

   }

  ngOnInit() {
    this.login();
    this.GetYearList();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    
    });
  }

  GetYearList() {

    return this.yearService.GetYearList().subscribe(result =>{
      this.yearsList = result;
     console.log('ffff',this.yearsList);  
    } );
  }

  ChangeYearByActive(id){
    this.openSnackBar('تم تغيير السنة بنجاح الرجاء تسجيل الخروج لتحديث البيانات','');
  console.log('iffffff',id);
    this.yearService.ChangeYearByActive(id).subscribe(res=>{

    });
  
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
