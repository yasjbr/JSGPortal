import { Component, OnInit } from '@angular/core';
import { StudCourseMark } from 'src/app/Models/Marks/StudCourseMark';
import { MatTableDataSource } from '@angular/material';
import { StudCourseMarkService } from '../stud-course-mark.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { YearlyCourseExamService } from '../../yearly-course-exam/yearly-course-exam.service';
import { YearlyCourseService } from '../../yearly-course/yearly-course.service';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { users } from 'src/app/Models/Users/users';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';

@Component({
  selector: 'app-stud-course-mark-index',
  templateUrl: './stud-course-mark-index.component.html',
  styleUrls: ['./stud-course-mark-index.component.scss']
})
export class StudCourseMarkIndexComponent implements OnInit {

  searchForm: FormGroup;
  datasource: MatTableDataSource<StudCourseMark>;
  yearlyCourseList: YearlyCourse[];
  yearsList: any;
  schoolId: any;
  sectionsList: any;
  schoolList: any;
  classList: lkpClass[];
  public currentYear: number;
  // examList: Lkplookup[];
  termsList: Lkplookup[];
  cols = [
      // { field: "id", header: "#" },
       { field: "courseName", header: "courseName" },
    { field: "termName", header: "termName" },
    { field: "studentId", header: "studentId" },
    { field: "studentName", header: "studentName" },
    //  { field: "yearlyCourseId", header: "yearlyCourseId" },
    // { field: "termId", header: "termId" },
    { field: "mark", header: "mark" },
    //{ field: "note", header: "note" },
  ]

  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  constructor(private service: StudCourseMarkService,
    private yearlyCourseExamService: YearlyCourseExamService,
    private yearlyCourseService: YearlyCourseService,
    private yearService: YearService,
    private classService: ClassService,
    private lookup: LookupsApiService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    private currentUserService: CurrentUserService,
    // private yearlyCourseService: YearlyCourseService,
    private fb: FormBuilder) {
    this.datasource = new MatTableDataSource<StudCourseMark>();
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.currentYear = currentUser.yearId;
  }

  public dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();

  getStudCourseMarkList() {
    this.service.getStudCourseMarkList().subscribe(result => {
      this.datasource.data = result;
    },
      err => console.log("error in StudCourseMark"),
      () => console.log("complete")

    );
  }

  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    //this.onSearch();
  }

  ngOnInit() {
    this.getSchoolList();
    this.getSectionsList();
    this.getYearsList();
    this.getClassList();
    this.initSearchForm();
    this.getLookups();
    // this.getStudCourseMarkList();
    this.getYealyCourseList();

   // this.getStudCourseMarkListBySearchForm();


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

  getYealyCourseList() {
    this.yearlyCourseService.getYearlyCourseByParam(this.searchForm.value).subscribe(res => this.yearlyCourseList = res)
  }

  getStudCourseMarkListBySearchForm() {
    console.log('-----------Fired------------' + this.searchForm.get('courseId').value);
    
    this.service.GetStudCourseMarkByParam(this.searchForm.value).subscribe(res => this.datasource.data = res)

  }

  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }
  getClassList() {
    return this.classService.GetClassBySchool(this.schoolId).subscribe(res => this.classList = res);
  }



  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        // case LookupTypes.Exam:
        //   this.examList = element;
        case LookupTypes.Terms:
          this.termsList = element;
        default:
          break;
      }
    });
  }

  private getLookups() {
    this.lookup
      .getLookupsByType2([
        LookupTypes.Exam,
        LookupTypes.Terms
      ])
      .subscribe(
        res => this.fillLookups(res),
        _err => {
          console.log("Error");
        },
        () => {
          console.log("Complite");
        }
      );
  }

 


  initSearchForm() {

    // console.log('----year from form----' + this.form.get('yearId').value);
    // console.log('----classId from form----' + this.form.get('classId').value);

    this.searchForm = this.fb.group({
      yearId: [Number(this.currentYear)],
      schoolId:[Number(this.schoolId)],
      sectionId: [0],
      classId: [],
      courseId: [],
      termId: []
    })
  }

   

  onSearchyearlyCourse() {
    // this.getYealyCourseList();
    this.getStudCourseMarkListBySearchForm();
  }

  onSearch() {
    this.getYealyCourseList();
    this.getStudCourseMarkListBySearchForm();
  }


}
