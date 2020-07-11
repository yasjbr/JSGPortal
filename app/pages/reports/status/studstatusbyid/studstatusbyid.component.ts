import { Component, OnInit } from '@angular/core';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { status } from 'src/app/Models/Admission/status';
import { Admission } from 'src/app/Models/Admission/admission';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../../reports.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-studstatusbyid',
  templateUrl: './studstatusbyid.component.html',
  styleUrls: ['./studstatusbyid.component.scss']
})
export class StudstatusbyidComponent implements OnInit {
  ParentId: number = 0;
  classId: number = 0;
  image:any;
  sectionId: number = 0;
  exist: boolean = false;
  studList: Admission[];
  statusList: status[];
  statusId: number = 0;
  name: string;
  schoolId: any;
  schoolName: any;
  yearId: any;
  count: number = 0;
  constructor(
    private service: AdmService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private sanitizer: DomSanitizer,
    private schoolService: SchoolService,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
  }
  print(div) {
    this.reportsService.print(div);
  }
  ngOnInit() {
    this.getImage();
    this.getStatusList(this.statusId);
  }

  getStatusList(id) {
    if (id != null) {
      this.statusId = id;
      console.log('statusid=', id);

    }
    this.service.GetStatus().subscribe(res => {
      this.statusList = res;
    })
  }
  getStudent() {
    this.service.GetStudStatus(this.statusId, this.schoolId, this.ParentId, this.classId, this.sectionId).subscribe(res => {

      if (res.length == 0) {
        this.exist = true;
      }
      else {
        this.exist = false;
      }
      if (res != null) {
        this.studList = res;
        this.count = res.length;

      }

    })
  }
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
