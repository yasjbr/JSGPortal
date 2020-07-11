import { Component, OnInit, ViewChild } from '@angular/core';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { Admission } from 'src/app/Models/Admission/admission';
import { ReportsService } from '../../reports.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RepService } from '../../rep.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-getbrothers',
  templateUrl: './getbrothers.component.html',
  styleUrls: ['./getbrothers.component.scss']
})
export class GetbrothersComponent implements OnInit {
  ParentList:regParents[];
  filterParents: regParents[];

  // studentList:Admission[];

  selected: any;
  parentId:any;
  image:any;
  name:string;
  schoolId:any;
  schoolName:any;
  yearId: any;
  _parentId:number;

  dataSource: MatTableDataSource<Admission>=new MatTableDataSource<Admission>();
  loading=false;
  cols=[
    // {field:index+1, header:"#"},
    {field:"name", header:"Student name"},
    {field:"section", header:"Section"},
    {field:"class", header:"Class"},
    {field:"classSeq", header:"Division"},
    {field:"fatherMobail", header:"Father mobile"},
    {field:"motherMobail", header:"Mother mobile"},

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  public displayedColumns: string[] = this.cols.map(col => col.field);

  constructor(
    private service:AdmService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private parentService: RegParentService,
    private repService: RepService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
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
    this.getParentList(1);
    this.getStudentList();
    this.getImage();
    this.dataSource.filterPredicate = (data:Admission, filter: string) => {
      return data.parentId == +filter;
  
     };
  }
 
  
  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.ParentList = res;
      this.filterParents = this.ParentList;
      let index = this.ParentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.ParentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }
  onParentChanged(parentId: string){
    console.log('parentId='+ parentId)
    this.repService.sParentId= this.parentId;
    this.dataSource.filter = parentId+"";
  }

  getStudentList(){
    return this.service.GetStudentByParentandSchool(this.schoolId,0).subscribe(res=>{
    console.log('resault', res);
      this.dataSource.data=res
    
    });
  }
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
//   getParentList(id){
   
// return this.service.GetStudentByParentandSchool(this.schoolId,0).subscribe(res=>{
//   if(res !=null){
//     this.ParentList=res;
//   }

// })
//   }
//   getStudent(parentId){
//     console.log('filterid',parentId);
//     this.repService.sParentId= this.parentId;
//     this.ParentList['id'].filter=parentId+""; ;
//      if(parentId !=null){
//       this._parentId=parentId;
//     }
//     return this.service.GetStudentByParentandSchool(this.schoolId,this._parentId).subscribe(res=>{
//       if(res !=null){
//          this.studentList=res;
//       }
     
//       })
// }
}
