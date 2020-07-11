import { Component, OnInit } from '@angular/core';
import { YearlyCourseExam } from 'src/app/Models/Marks/YearlyCourseExam';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { YearlyCourseExamService } from '../yearly-course-exam.service'; 
import { YearlyCourseExamModule } from '../yearly-course-exam.module';
import { YearlyCourseExamDialogComponent } from '../yearly-course-exam-dialog/yearly-course-exam-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { YearlyCourseService } from '../../yearly-course/yearly-course.service';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
//import { pipe } from 'rxjs';
// import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-yearly-course-exam-index',
  templateUrl: './yearly-course-exam-index.component.html',
  styleUrls: ['./yearly-course-exam-index.component.scss']
})
export class YearlyCourseExamIndexComponent implements OnInit {


  searchForm: FormGroup;
  yearlyCourseList: YearlyCourse[];
  yearsList: any;
  schoolId: any;
  public currentYear: number;
  sectionsList: any;
  schoolList: any;
  classList: lkpClass[];
  examList: Lkplookup[];
  datasource: MatTableDataSource<YearlyCourseExam>;
  public dateFormatted: string;

  public myDate = new Date();

  cols = [
    // { field: "id", header: "##" },
    // { field: "yearlyCourseId", header: "yearlyCourseId" },
    // { field: "yearId", header: "yearId" },
    // { field: "yearName", header: "yearName" },
    // { field: "className", header: "className" },
    // { field: "courseName", header: "courseName" },
    { field: "examName", header: "examName" },
    { field: "examWeight", header: "examWeight" },
    { field: "examEntryDateFrom", header: "examEntryDateFrom" },
    { field: "examEntryDateTo", header: "examEntryDateTo" },
  ]


  public displayedColums: string[] = this.cols.map(col => col.field).concat('actions');




  constructor(private service: YearlyCourseExamService,
    private yearlyCourseService: YearlyCourseService,
    private yearService: YearService,
    private classService: ClassService,
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    // private yearlyCourseService: YearlyCourseService,
    private fb: FormBuilder,
    // private datePipe: DatePipe,


    private dialog: MatDialog) {
    this.datasource = new MatTableDataSource<YearlyCourseExam>();
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.currentYear = currentUser.yearId;
    this.service.selectedYearId = currentUser.yearId;
    this.service.SelectedSchoolId = currentUser.schoolId;
 
    // this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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


  
  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    this.onSearch();
  }

  getYearlyCoureExamList() {
    this.service.getYearlyCourseExamList().subscribe(result => {
      this.datasource.data = result;
      console.log(result);

    },
      err => console.log("error in yealry course exam"),
      () => console.log("complete")

    );
  }


  dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();

  openAddNewYearlyCourseExamDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, };
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;

    const dialogRef = this.dialog.open(YearlyCourseExamDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
     // this.getYearlyCoureExamList();
    });
  }

  openUpdateYearlyCourseExamDialog(YearlyCourseExamId, YearId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;

    dialogConfig.data = {
      id: YearlyCourseExamId,
      yearId: YearId
    };
    const dialogRef = this.dialog.open(YearlyCourseExamDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
     // this.getYearlyCoureExamList();
    });
  }

  openDeleteYearlyCourseExamDialog(model: YearlyCourseExam) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.className + '--' + model.courseName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteYearlycCourseExam(model);
      }
    });
  }



  deleteYearlycCourseExam(yearlyCourseExam: YearlyCourseExam) {
    this.service.deleteYearlyCourseExam(yearlyCourseExam.id).subscribe(
      res => this.handleSuccess(),
      err => this.handleErrors()
    );
  }


  private handleSuccess() {
    this.getYearlyCoureExamList();
  }

  private handleErrors() {
  }




  getYealyCourseList() {
    this.yearlyCourseService.getYearlyCourseByParam(this.searchForm.value).subscribe(res => this.yearlyCourseList = res)
  }

  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }
  getClassList() {
    return this.classService.GetClassBySchool(this.schoolId).subscribe(res => this.classList = res);
  }


  ngOnInit() {

    this.getSchoolList();
    this.getSectionsList();
    this.initSearchForm();
     this.getYearsList();
    this.getClassList();
    this.getYealyCourseList();
  }



  initSearchForm() {

    // console.log('----year from form----' + this.form.get('yearId').value);
    // console.log('----classId from form----' + this.form.get('classId').value);

    this.searchForm = this.fb.group({
      yearId: [Number(this.currentYear)],
      schoolId:[Number(this.schoolId)],
      sectionId: [0],
      classId: [0],
      yearlyCourseId: []
    })
  }



  onSearch() {
    // this.initSearchForm();

    console.log('yearlyCourseId ' + this.searchForm.get('yearlyCourseId').value);
    console.log('yearId ' + this.searchForm.get('yearId').value);
    console.log('classId ' + this.searchForm.get('classId').value);
    this.yearlyCourseService.getYearlyCourseByParam(this.searchForm.value).subscribe(result => {
      this.yearlyCourseList = result
      // this.yearlyCourseService.selectedYearId = this.searchForm.get("yearId").value;
      // this.yearlyCourseService.selectedClassId = this.searchForm.get("classId").value;
    }
    );



  }




  onChangeYearlyCourse() {
    console.log('yearlyCourseId ' + this.searchForm.get('yearlyCourseId').value);
    console.log('yearId ' + this.searchForm.get('yearId').value);
    console.log('classId ' + this.searchForm.get('classId').value);

    this.service.GetYearlyCourseByYearlyCourseId(this.searchForm.get('yearlyCourseId').value).subscribe(result => {
      this.datasource.data = result
    }
    );
  }
}
