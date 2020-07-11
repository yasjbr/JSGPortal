import { Component, OnInit } from '@angular/core';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { YearlyCourseService } from '../yearly-course.service';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { FormGroup, FormBuilder } from '@angular/forms';
import { YearlyCourseDialogComponent } from '../yearly-course-dialog/yearly-course-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { log } from 'util';
@Component({
  selector: 'app-yearly-course-index',
  templateUrl: './yearly-course-index.component.html',
  styleUrls: ['./yearly-course-index.component.scss']
})
export class YearlyCourseIndexComponent implements OnInit {
 
  //vars
  yearsList: any;
  sectionsList: any;
  schoolList: any;
  schoolId: any;
  classList: lkpClass[];
  searchFormGroup: FormGroup;
  public currentYear: number;
  public currentYearName:any;
  datasource: any;//MatTableDataSource<YearlyCourse>;
  cols = [
    // { field: "id", header: "#" },
    // { field: "yearName", header: "yearName" },
    // { field: "classId", header: "classId" },
    // { field: "className", header: "className" },
    { field: "courseName", header: "courseName" },
    // { field: "examName", header: "examName" },
    { field: "inGpa", header: "inGpa", type: "chk" },
    { field: "maxMark", header: "maxMark" },
  ]
  public dispalyedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  //constructor
  constructor(
    private service: YearlyCourseService,
    private yearService: YearService,
    private classService: ClassService,
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
    this.datasource = new MatTableDataSource<YearlyCourse>();
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;


    //console.log(currentUser.yearId+'---------------yearid');
    this.currentYear = currentUser.yearId;
    this.currentYearName= currentUser.yearName
    this.service.selectedYearId = currentUser.yearId;
    this.service.SelectedSchoolId = currentUser.schoolId;
  }


  getSchoolList(){
    console.log('schoooooooooo' + this.schoolId);
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
   this.getSectionsList();
   this.onSearch();

  }

  //MEthods
  public dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();

  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }

  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    this.onSearch();
  }

  getClassList() {
    return this.classService
      .GetClassBySchool(this.schoolId)
      .subscribe(res => {
        this.classList = res;
        console.log('classLLLLLLLList', res)
      });
  }

  getYearlyCourseList() { 

    console.log('get-------------');

    this.service.getYearlyCourseList().subscribe(result => {
      this.datasource.data = result,
        console.log('Doneeee');

    },
      err => console.log("error vvvvv in yearly Course :----" + err + this.datasource.data),
      () => console.log("complete")
    );
  }


  initiateForm() {

    console.log('-----------------this.currentYear' + this.currentYear);

    this.searchFormGroup = this.fb.group({
      yearId: [Number(this.currentYear)],
      schoolId:[Number(this.schoolId)],
      sectionId: [0],
      classId: [0],
    })
  }


  openAddNewYearlyCourseDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0};

    const dialogRef = this.dialog.open(YearlyCourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => this.getYearlyCourseList)
  }


  openUpdateYearlyCourseDialog(yearlyCourseId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: yearlyCourseId ,schoolId: this.schoolId};

    const dialogRef = this.dialog.open(YearlyCourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {

    //  this.getYearlyCourseList()
      this.onSearch();

    }
    );
  }



  openDeleteDialog(model: YearlyCourse) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.className + model.courseName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteYearlyCourse(model);
      }
    });
  }



  deleteYearlyCourse(yearlycCourse: YearlyCourse) {
    this.service.deleteYearlyCourse(yearlycCourse.id).subscribe(
      res => {

        //   this.handleSuccess(),
        // this.getYearlyCourseList()
        this.onSearch();
      },
      err => {
        this.handleErrors()
      }

    );
  }




  private handleErrors() {
  }


  private handleSuccess() {
    console.log('comes to delete');

    // this.getYearlyCourseList();
    this.onSearch();
  }

  //events
  onYearChanged(filterValue: string) {
    this.datasource.filter = filterValue + "";
    // this.service.selectedYearId = filterValue;
  }
  onClassChanged(filterValue: string) {
    this.datasource.filter = filterValue + "";
    this.service.selectedClassId = filterValue;
  }


  onSearch() {
    this.service.getYearlyCourseByParam(this.searchFormGroup.value).subscribe(result => {
      this.datasource = result
       // this.service.selectedYearId = this.searchFormGroup.get("yearId").value;
      // this.service.selectedClassId = this.searchFormGroup.get("classId").value;
    }
    );

  }



  ngOnInit() {

     this.getSchoolList();
    
    this.getYearsList();
    // this.getClassList();
    this.getSectionsList();
    this.initiateForm();




  }



}
