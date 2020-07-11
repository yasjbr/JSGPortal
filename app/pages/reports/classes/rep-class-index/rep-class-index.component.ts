import { SectionService } from './../../../addLookups/sections/section.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { users } from 'src/app/Models/Users/users';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { Router } from '@angular/router';
import { RepService } from '../../rep.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-rep-class-index',
  templateUrl: './rep-class-index.component.html',
  styleUrls: ['./rep-class-index.component.scss']
})
export class RepClassIndexComponent implements OnInit {


  
  dataSource: MatTableDataSource<lkpClass>=new MatTableDataSource<lkpClass>();
  sectionList: any[];
  loading=false;
  cols=[
    {field:"id", header:"#"},
    {field:"name", header:"Class"}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  schoolId: any;
  schoolName: any;
  yearId: any;
  sectionId: any;

  constructor(private router: Router,
    private classService: ClassService,
    private sectionService: SectionService,
    private service: RepService,
    private currentUserService: CurrentUserService) { 
 
    this.sectionId = this.service.sSectionId;
    if (this.sectionId != null) {
      this.onSectionChange(this.sectionId);
}
    
    // let data = JSON.parse(localStorage.getItem("token")) as users;
    // this.schoolId = data.schoolId;
    // this.schoolName = data.schoolName;
    // this.yearId = data.yearId; 

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;

  }

  ngOnInit() {
    this.getSectionList();
    this.getClassList();
    this.dataSource.filterPredicate = (data: lkpClass, filter: string) => {
      return data.sectionId == +filter;
     };
  }
  
  getSectionList() {
    return this.sectionService.sectionListBySchool(this.schoolId)
    .subscribe(res => 
      {
      this.sectionList = res;
      console.log(this.sectionList);
      });
    
  }
  getClassList() {
    return this.classService.GetClassBySchool(this.schoolId)
    .subscribe
  (res => this.dataSource.data = res);
   
    
  }
  
  onSectionChange(sectionId) {
    console.log(sectionId);
    console.log(this.dataSource.data);
    console.log(this.sectionList);
    this.service.sSectionId= this.sectionId;
    this.dataSource.filter = sectionId+"";
  }

  rep1Url = '/reports/classRep';
  openReport(repId, classId) {
    this.service.sClassId = classId;
    this.service.sRepId = repId;
    console.log("repId=" + repId , "element-id = " + classId);
    this.router.navigateByUrl(this.rep1Url);

  }


}
