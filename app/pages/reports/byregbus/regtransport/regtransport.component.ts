import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { SectionService } from './../../../addLookups/sections/section.service';
import { CurrentUserService } from "src/app/shared/services/current-user.service";
import { StudCardData } from './../../../../Models/Reg/Reports/StudCardData';
import { users } from './../../../../Models/Users/users';
import { RepService } from 'src/app/pages/reports/rep.service';
import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from '../../reports.service';
@Component({
  selector: 'app-regtransport',
  templateUrl: './regtransport.component.html',
  styleUrls: ['./regtransport.component.scss']
})
export class RegtransportComponent implements OnInit {
  // dataSource: MatTableDataSource<lkpClass>=new MatTableDataSource<lkpClass>();
  studByBusList:StudCardData[];
  image: any;
  name: string;
  schoolName: any;
  schoolId:any;
  SectionId:any;
  yearId: any;
  sectionList: LkpSection[];
  ClassList:lkpClass[];
  classId:any;
  ClassSeqId:number;
  DateAndTime=new Date();
  constructor(private service: RepService,
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    private classService: ClassService,
    private schoolService:SchoolService,
    private sanitizer: DomSanitizer,
    private reportsService: ReportsService,
    ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
   }
  ngOnInit() {
    this.sectionListBySchool();
    this.getImage();

    // this.GetStudByBus(13, 2, 15,1122);
  }
  sectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.schoolId)
    .subscribe(res => 
      {
      this.sectionList = res;
      console.log('section list: ',this.sectionList);
      });
    
  }
  onSectionChange(sectionId) {
    console.log('inisectionID',sectionId)
    return sectionId;
  }
  getClassList(sectionId) {
    this.classService.GetClassBySection(sectionId).subscribe(res =>{
      this.ClassList = res;
     console.log('Classbysection',this.ClassList);
    } );
    }
GetStudByBus( ClassId){
  return this.service.GetStudByBus(ClassId,1122).subscribe(res=>{
    this.studByBusList=res;
  console.log("res =",res);
  });
}

print(div) {
  this.reportsService.print(div);
}
getImage() {
  this.schoolService.getSchool(this.schoolId).subscribe(res => {
    let objectURL = "data:image/jpeg;base64," + res.imageFile;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  });
}
}


