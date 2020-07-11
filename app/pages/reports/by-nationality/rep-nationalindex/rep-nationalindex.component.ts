import { DomSanitizer } from '@angular/platform-browser';
import { SchoolService } from './../../../addLookups/schools/school.service';
import { studentNationalData } from './../../../../Models/Reg/Reports/studentNationalData';
import { NationalrepService } from './../nationalrep.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../../reports.service';
import { MatPaginator, MatTableDataSource, MatSelect } from '@angular/material';
import { Student } from 'src/app/Models/Reg/Students/students';
import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lkpClassDivision } from 'src/app/Models/addLookups/classes/LkpClassDivision';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { ClassDivisionService } from 'src/app/pages/addLookups/divisions/classDivision.Service';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';

@Component({
  selector: 'app-rep-nationalindex',
  templateUrl: './rep-nationalindex.component.html',
  styleUrls: ['./rep-nationalindex.component.scss']
})
export class RepNationalindexComponent implements OnInit {


  StudentList: studentNationalData[];
  public DateAndTime = new Date();
  name: string;
  image: any;
  schoolId: any;
  sectionId:any=0;
  classId:any=0;
  classdivisionId:any=0;
  schoolList: LkpSchool[];
  // public form: FormGroup;
  divisionList: lkpClassDivision;
  sectionList: LkpSection[];
  ClassList: lkpClass[];
  dataSource: MatTableDataSource<studentNationalData> = new MatTableDataSource<studentNationalData>();
  loading = false;
  cols = [
    //{field:"index", header:"index"},
    { field: "studId", header: "#" },
    { field: "studName", header: "إسم الطالب" },
    { field: "className", header: "الصف" },
    { field: "classDivisions", header: "الشعبة" },
    { field: "nationalityName", header: "الجنسية" },
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  @ViewChild('_schoolId') _schoolId: MatSelect;
  @ViewChild('_sectionId') _sectionId: MatSelect;
  @ViewChild('_classId') _classId: MatSelect;
  @ViewChild('_classDivisionId') _classDivisionId: MatSelect;

  constructor(
    private nationalServ: NationalrepService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private sectionService: SectionService,
    private classService: ClassService,
    private division: ClassDivisionService
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name = currentUser.username;
    this.schoolId = +currentUser.schoolId;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // this.GetStudByNationality();
    this.getSchoolList();
    this.filter();
    this.dataSource.filterPredicate = (data: studentNationalData, filter: string) => {
      return data.studId == +filter;
    }
  }


  print(div) {
    this.reportsService.print(div);
  }
  getSchoolList() {
    this.schoolService.schoolList().subscribe(res => {
      this.schoolList = res;
    }, (err) => {
      console.log(err);
    });
  }
  sectionListBySchool() {
    console.log("_schoolId",this._schoolId.value);
    if(this._schoolId.value != null && this._schoolId.value != 0){
      this.schoolId=this._schoolId.value;
      console.log('schooooolll=>',this.schoolId);
    }
    return this.sectionService.sectionListBySchool(this.schoolId).subscribe(res => {
      this.sectionList = res;
    });
  }
  getClassListBySection() {
    if(this._sectionId.value != null && this._sectionId.value != 0){
      this.sectionId=this._sectionId.value;
    }
    this.classService.GetClassBySection(this.sectionId).subscribe(res => {
      this.ClassList = res;
      console.log('ClassList list=====>', res);
    });
  }
  getClassDivision() {
    if(this._classId.value != null && this._classId.value != 0){
      this.classId=this._classId.value;
    }
    this.division.getDivisionsByClass(this.classId).subscribe(res => {
      console.log('division list=====>', res);
      this.divisionList = res[0];
    }, (err) => console.log(err) 
    ) 
  }
  // GetStudByNationality() {
  //   return this.nationalServ.GetStudByNationality().subscribe(res =>{
  //     this.dataSource.data = res
  //     console.log('res===>',res);
      
  //   } );
  // }
  filter() {
    if(this._classDivisionId.value != null && this._classDivisionId.value != 0){
      this.classdivisionId=this._classDivisionId.value;
    }
    return this.nationalServ.GetStudNationalitybyfilter(this.schoolId, this.sectionId, this.classId, this.classdivisionId).subscribe(res => {
      this.dataSource.data = res
      console.log('data=====>', res);
    })
  }
  
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
