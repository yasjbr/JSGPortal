import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { users } from 'src/app/Models/Users/users';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { AppSettings } from 'src/app/app.settings';
import { AdddivisionComponent } from '../adddivision/adddivision.component';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { YearService } from '../../years/year.service';
import { SectionService } from '../../sections/section.service';
import { ClassService } from '../../classes/class.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { SchoolService } from '../../schools/school.service';
import { StringMap } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ClassDivisionService } from '../classDivision.Service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { lkpClassDivision } from 'src/app/Models/addLookups/classes/LkpClassDivision';

@Component({
  selector: 'app-classdivision',
  templateUrl: './classdivision.component.html',
  styleUrls: ['./classdivision.component.scss']
})
export class ClassdivisionComponent implements OnInit {
  FormGroup: FormGroup;
  schoolId: any;
  schoolList: any;
  currentYearId: number;
  currentYearName: String;
  yearsList: LkpYear[];
  sectionsList: LkpSection[];
  classList: lkpClass[];
  divisionsList: any;
  appSettings;
  datasource: any;
  loade = false;

  cols = [
    // { field: "id", header: "#" },
    // { field: "yearName", header: "yearName" },
    // { field: "classId", header: "classId" },
    { field: "className", header: "className" },
     { field: "divisionName", header: "divisionName" },
  

  ]
  public dispalyedColumns: string[] = this.cols.map(col => col.field).concat('actions');


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private currentUserService: CurrentUserService,
    private yearService: YearService,
    private classService: ClassService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    private serviceDivision: ClassDivisionService,
  ) {
    this.datasource = new MatTableDataSource<any>();
    let currentUser: users;
    this.appSettings = AppSettings;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.currentYearId = currentUser.yearId;
    this.currentYearName = currentUser.yearName;
    this.classService.sSchoolId = currentUser.schoolId;
    this.classService.sYearId = this.currentYearId;

  }

  ngOnInit() {
    console.log(this.classService.sSchoolId + '  ---------schoooool');
    this.getSchoolList();
    this.getYearsList();
    this.initiateForm();
    this.getSectionsList();
   // this.getDivisionsList();


  }


  openDeleteDialog(model: lkpClassDivision) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.className + model.divisionName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteClassDivision(model);
      }
    });
  }

  deleteClassDivision(model: lkpClassDivision) {
    this.serviceDivision.deleteDivision(model.id).subscribe(
      res => {

        //   this.handleSuccess(),
        // this.getYearlyCourseList()
        this.getDivisionsList();
      },
      err => {
        this.handleErrors();
      }

    );
  }
  
  private handleErrors() {
  }
  getDivisionsList() {
    return this.serviceDivision.getDivisionsByForm(this.FormGroup.value).subscribe(res => {
      this.datasource = res;
      console.log('--------------'+ JSON.stringify(res));
    },(err)=>{
      console.log('error',err)
  });
  }

  onSchoolChanges(filterValue: string) {
    this.schoolId = filterValue;
    this.getSectionsList();
    this.getDivisionsList();

  }


  onYearChanges(filterValue: string) {
   
    this.getDivisionsList();

  }

  public dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();


  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }

  getSchoolList() {
    return this.schoolService.schoolList().subscribe(result => this.schoolList = result);
  }


  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    this.getDivisionsList();
  }

  onChangeClass(selectedSection) {
    //this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    this.getDivisionsList();
  }

  getClassList() {
    return this.classService
      .GetClassBySchool(this.schoolId)
      .subscribe(res => {
        this.classList = res;
        console.log('classLLLLLLLList', res)
      });
  }

  initiateForm() {

  //  console.log('-----------------this.schoolId' + this.schoolId);

    this.FormGroup = this.fb.group({
      yearId: [Number(this.currentYearId)],
      SchoolId: [Number(this.schoolId)],
      sectionId: [null],
      classId: [null]
    
    })
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.direction = 'rtl';

    dialogConfig.data = { id: 0, schoolId: this.schoolId, sectionId: this.FormGroup.get('sectionId').value };

    const dialogRef = this.dialog.open(AdddivisionComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => this.getDivisionList)
  }

  // onSearch() {
  //   this.service.getYearlyCourseByParam(this.searchFormGroup.value).subscribe(result => {
  //     this.datasource = result,
  //       this.service.selectedYearId = this.searchFormGroup.get("yearId").value;
  //     this.service.selectedClassId = this.searchFormGroup.get("classId").value;
  //   }
  //   );

  // }
}
