import { CurrentUserService } from './../../../../shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { DomSanitizer } from '@angular/platform-browser';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { ReportsService } from "src/app/pages/reports/reports.service";

import { studentyear } from "./../../../../Models/Reg/Reports/studentyear";
import { RegyearService } from "./../regyear.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-bynew-student",
  templateUrl: "./bynew-student.component.html",
  styleUrls: ["./bynew-student.component.scss"]
})
export class BynewStudentComponent implements OnInit {
  newstudentList: studentyear[];
  schoolId:any;
  image: any;
  public DateAndTime=new Date();
  name:string;
  constructor(
    private serviceregyear: RegyearService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService:CurrentUserService,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name= currentUser.username;
    this.schoolId = currentUser.schoolId;
  }

  ngOnInit() {
    this.GetNewStudent();
  }
  print(div) {
    this.reportsService.print(div);
  }
  GetNewStudent() {
    return this.serviceregyear.GetNewStudent().subscribe(res => {
      this.newstudentList = res;
      console.log("res=", res);
      this.getImage();
    });
  }

  getImage() {
    console.log('id ',this.schoolId);
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
