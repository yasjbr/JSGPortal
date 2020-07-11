import { Component, OnInit } from '@angular/core';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { SectionService } from './../../../addLookups/sections/section.service';
import { CurrentUserService } from "src/app/shared/services/current-user.service";
import { StudCardData } from './../../../../Models/Reg/Reports/StudCardData';
import { users } from './../../../../Models/Users/users';
import { RepService } from 'src/app/pages/reports/rep.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from '../../reports.service';
import { MatTableDataSource } from '@angular/material';
import { LkpSchool } from '../../../../Models/addLookups/schools/lkpSchool';
import { Items } from 'src/app/Models/Stock/Items';
import { StockService } from 'src/app/pages/stock/stock.service';
@Component({
  selector: 'app-stock-rep',
  templateUrl: './stock-rep.component.html',
  styleUrls: ['./stock-rep.component.scss']
})
export class StockRepComponent implements OnInit {
  studByBusList:StudCardData[];
  exist:boolean=false;
  groupList:Items[];
  data:Items[];
  image: any;
  name: string;
  schoolName: any;
  schoolId:any;
  SectionId:any;
  yearId: any;
  sectionList: LkpSection[];
  schoolList:LkpSchool[];
  ClassList:lkpClass[];
  classId:number;
  ClassSeqId:number;
  DateAndTime=new Date();
  constructor(private service: RepService,
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    private classService: ClassService,
    private schoolService:SchoolService,
    private sanitizer: DomSanitizer,
    private reportsService: ReportsService,
    private services:StockService,
    ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
   }
   dataSource: MatTableDataSource<lkpClass> = new MatTableDataSource<lkpClass>();
  loading = false;
 
  ngOnInit() {
    this.getSchoolList();
    this.getImage();
  
  }
  
  
  getSchoolList() {
    return this.schoolService.schoolList().subscribe(res => {
      console.log('school',res);
      
      this.schoolList = res;
    });
  }

  sectionListBySchool(id) {
    return this.sectionService.sectionListBySchool(id)
    .subscribe(res => 
      {
      this.sectionList = res;
      console.log('section list: ',this.sectionList);
      });

      
    
  }
 
  getClassList(id) {
    this.classService.GetClassBySection(id).subscribe(res =>{
      this.ClassList = res;
     console.log('Classbysection',this.ClassList);
    } );
    }

 

print(div) {
  this.reportsService.print(div);
}

getItemList(id){
  return this.services.getItemList(id, 0 ).subscribe(res=>{
    console.log('Class',res);
    if(res.length==0){
      this.exist=true;
    }
    else{
      this.data=res;
      this.exist=false;
    }
  }); 

}


 


getImage() {
  this.schoolService.getSchool(this.schoolId).subscribe(res => {
    let objectURL = "data:image/jpeg;base64," + res.imageFile;
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  });
}
}


