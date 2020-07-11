import { UpdateDivisionComponent } from './../update-division/update-division.component';
import { id } from '@swimlane/ngx-charts/release/utils';
import { division } from './../cha-division.routing';
//import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { users } from './../../../../Models/Users/users';
//import { CurrentUserService } from 'src/app/shared/services/current-user.service';
//import { Admission } from './../../../../Models/Admission/admission';
//import { AdmService } from 'src/app/pages/Admission/adm.service';
import { Student } from 'src/app/Models/Reg/Students/students';
//import { ChaStuDivService } from './../cha-stu-div.service';
//import { RegParentService } from '../../parents/reg-parent.service';
//import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { LkpDivision } from '../../../../Models/addLookups/Division/lkpDivision';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { DivisionService } from '../division.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { Admission } from 'src/app/Models/Admission/admission';
import { StudentService } from '../../student/student.service';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { RegParentService } from '../../parents/reg-parent.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ChaStuDivService } from '../cha-stu-div.service';
//import { StudentService } from '../../student/student.service';
 

@Component({
  selector: 'app-cha-division',
  templateUrl: './cha-division.component.html',
  styleUrls: ['./cha-division.component.scss']
})
export class ChaStuDivisionComponent implements OnInit {
  filterParents: regParents[];
  parentList: regParents[];
  parentId: any;
  name: Admission[];
  schoolId: any;
  selected: any;

  currentYearId: number;

  filterDivision: any[];
  DivisionList: any[];
  DivSelectedId: any;
  DivSelectedName: any;
  schoolList: any;
  dataSource: MatTableDataSource<Admission[]> = new MatTableDataSource<Admission[]>();
  loading = false;
  cols = [
    // {field:"index", header:"index"},
    { field: "studId", header: "#" },
    { field: "studName", header: "Student name" },
    { field: "sectionName", header: "Section" },
    { field: "className", header: "Class" },
    { field: "classSeqName", header: "Division" }
  ];



  // @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('Actions');



  // public DivisionListColm = ['id', 'studName', 'sectionName','className','classSeqName']

  constructor(private service: StudentService,
    private serviceby: AdmService,
    private parentService: RegParentService,
    private ChaStuDivServices:ChaStuDivService,
    private currentUserService: CurrentUserService,
    private lookup: LookupsApiService,
    public dialog: MatDialog,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.getParentList(1);
    this.getSchoolList();

 // /**/   this.getDivisionList(127);
   // this.onParentChanged(22);
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.currentYearId = currentUser.yearId;
  //  this.schoolId = currentUser.schoolId;
  }


  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }


  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
    // this.getSectionList();
  
  }


 

  getDivisionList(DivisionName) {
    return this.lookup.getLookupsByType(35).subscribe(res => {
      this.DivisionList = res;
      this.filterDivision = this.DivisionList;
      console.log('Division =', this.filterDivision);
      let index = this.DivisionList.findIndex(i => i.classSeqName === DivisionName);
      if (index != -1) {
        //  this.DivSelectedName=this.DivisionList[index].id;
        // this.onDivisionChanged(this.DivSelectedId);
      }
    });
  }
  Edite(classSeqId) {
    console.log("classSeqId=" + classSeqId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      classSeqId: classSeqId,
    };
    const dialogRef = this.dialog.open(UpdateDivisionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.handleSuccess();
      console.log("Division Id = ", classSeqId);
   
    });
    dialogRef.afterClosed();
  }
   
  
  private handleSuccess() {
    this.onParentChanged(this.parentId);
  }


  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;

      // console.log('resault parent', res);

      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }
  onParentChanged(parentId: any) {
    console.log('parentId=' + parentId);
    this.ChaStuDivServices.sParentId = this.parentId;
    this.dataSource.filter = parentId + "";
    this.getStudentList(parentId, this.schoolId);
  }
  getStudentList(parentId: any, schoolId: number) {
    this.parentId = parentId;
    return this.serviceby.getdataByParentAndSchool(parentId, schoolId).subscribe(res => {
      this.dataSource = res;
      console.log("parent and school" + res);
    });

  }

}
