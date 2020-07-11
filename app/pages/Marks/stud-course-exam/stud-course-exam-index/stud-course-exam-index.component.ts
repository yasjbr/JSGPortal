import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StudCourseExam } from 'src/app/Models/Marks/StudCourseExam';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { StudCourseExamService } from '../stud-course-exam.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { YearlyCourseExamService } from '../../yearly-course-exam/yearly-course-exam.service';
import { YearlyCourseService } from '../../yearly-course/yearly-course.service';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { StudCourseMarkService } from '../../stud-course-mark/stud-course-mark.service';
import { users } from 'src/app/Models/Users/users';
import { StudCourseExamDialogComponent } from '../stud-course-exam-dialog/stud-course-exam-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { ValidationBase } from 'src/app/validationBase';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';

@Component({
  selector: 'app-stud-course-exam-index',
  templateUrl: './stud-course-exam-index.component.html',
  styleUrls: ['./stud-course-exam-index.component.scss']
})
export class StudCourseExamIndexComponent implements OnInit {
  datasource: MatTableDataSource<StudCourseExam>;
  public form: FormGroup;
  searchForm: FormGroup;
  yearsList: any;
  schoolId: any;
  classList: lkpClass[];
  sectionsList: any;
  schoolList: any;
  public currentYear: number;
  termsList: Lkplookup[];
  examsList: Lkplookup[];
  yearlyCourseList: YearlyCourse[];
  reso: StudCourseExam;
  @ViewChild("markf") nameField: ElementRef;
    
     


  cols = [
   // { field: "id", header: "#" },
    { field: "studentId", header: "studentId" },
    { field: "studentName", header: "studentName" },
    { field: "examName", header: "examName" },
    // { field: "className", header: "className" },
     { field: "courseName", header: "courseName" },
    { field: "mark", header: "mark" }
  ]

  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: StudCourseExamService,
    private fb: FormBuilder,
    private yearlyCourseExamService: YearlyCourseExamService,
    private yearlyCourseService: YearlyCourseService,
    private yearService: YearService,
    private classService: ClassService,
    private sectionService: SectionService,
    private schoolService: SchoolService,
    private lookup: LookupsApiService,
    private studCourseMarkService: StudCourseMarkService,
    private currentUserService: CurrentUserService,
    public validator: ValidationBase,
    private dialog: MatDialog) {
    this.datasource = new MatTableDataSource<StudCourseExam>();

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.currentYear = currentUser.yearId;




  }

  public dataFilter = (value: string) => this.datasource.filter = value.trim().toLocaleLowerCase();

  getStudCourseExam() {
    this.service.getStudCourseExamList().subscribe(result => {
      this.datasource.data = result;
      console.log(result.values + '         result-----------');

      result.forEach(element => {

        console.log(element);

      });

      console.log('--------------end iteration');

    },
      err => console.log("error in stud Course Exam"),
      () => console.log("complete")
    );
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
        case LookupTypes.Exam:
          this.examsList = element;
          break;
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


  getYealyCourseList() {
    this.yearlyCourseService.getYearlyCourseByParam(this.searchForm.value).subscribe(res => {
      this.yearlyCourseList = res,
     console.log('99999999999999 '+ JSON.stringify(res)); 
    })
  }

  getStudCourseExamListBySearchForm() {
    this.service.getStudCourseExamListByParam(this.searchForm.value).subscribe(res => {
      this.datasource.data = res,
        // this.rows = this.datasource.data;
        this.rows = res;

      console.log('roooooows :' + this.rows + ' this.datatasource :' + this.datasource.data);
    }
    )

  }

  ngOnInit() {
    this.getYearsList();
    this.getSchoolList();
    this.getSectionsList();
    this.getClassList();
    this.initSearchForm();
    //  this.getStudCourseExam(); 
    this.initSearchForm();
    this.getLookups();
    //this.getYealyCourseList();
    // this.getStudCourseExamListBySearchForm();


    //  this.fetch((data) => {
    //   this.rows = data;
    //   console.log('data : '+ data);

    // });


  }

  getSchoolList(){
    console.log('schoooooooooo' + this.schoolId);
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
   this.getSectionsList();
   //this.onSearch();

  }


  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
    //this.onSearch();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      yearId: [Number(this.currentYear)],
      schoolId:[Number(this.schoolId)],
      sectionId: [0],
      classId: [],
      yearlyCourseId: [],
      termId: [],
      examId: []
    })
  }

  onSearch() {
   // this.getYealyCourseList();
    this.getStudCourseExamListBySearchForm();


  }



  openAddNewStudCourseExamDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, };
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;

    const dialogRef = this.dialog.open(StudCourseExamDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // this.getYearlyCoureExamList();
    });
  }

  openUpdateStudCourseExamDialog(StudCourseExamId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;

    dialogConfig.data = {
      id: StudCourseExamId
    };
    const dialogRef = this.dialog.open(StudCourseExamDialogComponent, dialogConfig);
  }

  openDeleteStudCourseExamDialog(model: StudCourseExam) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.className + '--' + model.courseName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(model.id + '    77777777777777');

        this.deleteStudCourseExam(model);
      }
    });
  }


  deleteStudCourseExam(StudCourseExam: StudCourseExam) {
    this.service.deleteStudCourseExam(StudCourseExam.id).subscribe(
      res => this.handleSuccess(),
      err => this.handleErrors()
    );
  }


  private handleSuccess() {
    // this.getYearlyCoureExamList();
  }

  private handleErrors() {
  }


  // 





  editing = {};
  rows = [];

  ColumnMode = ColumnMode;


  dd(){
    // this.nameField.nativeElement.foc.focus();
  }


  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }





  initForm() {
    this.form = this.fb.group({
      id: [0],
      yearId: [],
      classId: [],
      yearlyCourseId: [0, [Validators.required]],
      examId: [0, [Validators.required]],
      termId: [0, [Validators.required]],
      studentId: [],
      mark: [0, [Validators.required]]
    })
  }

  updateValue(event, cell, rowIndex) {
    // this.nameField.nativeElement.foc.focus();
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);

    console.log('rowIndex' + rowIndex + ' cell :' + cell + '  this.rows[rowIndex][id] ' + this.rows[rowIndex]['id']);

    let upId = this.rows[rowIndex]['id'];
    let newVal = this.rows[rowIndex][cell];
    let oldVal = this.rows[rowIndex]['mark'];

    this.initForm();
   

    // this.service.getStudCoureExamById(upId).subscribe(res => {
    //   this.form = this.validator.patchForm(this.form, res[0]),
    //     console.log('1');


    // }

  
     


    // );
    console.log('1');
    this.service.getStudCoureExamById(upId).subscribe(res => {
      this.form.controls['id'].setValue(res[0].id);
      this.form.controls['yearId'].setValue(res[0].yearId);
      this.form.controls['classId'].setValue(res[0].classId);
      this.form.controls['yearlyCourseId'].setValue(res[0].yearlyCourseId);
      this.form.controls['examId'].setValue(res[0].examId);
      this.form.controls['termId'].setValue(res[0].termId);
      this.form.controls['studentId'].setValue(res[0].studentId);


      if (newVal != null) {
        this.form.controls['mark'].setValue(newVal);
      }
      else {
        this.form.controls['mark'].setValue(oldVal);
        this.getStudCourseExam();
      }


      if (!this.form.valid) {
        this.validator.markFormTouched(this.form);
        console.log('not validddddddddddd');
        this.getStudCourseExam();
        return;
      }

      this.service.updateStudCourseExam(upId, this.form.value).subscribe(
        res => {
          console.log('3');
        },
        err => console.log(err)
      );
      // this.form = this.validator.patchForm(this.form.value, res);
      console.log('mark -------::' + this.form.get('mark').value);
      console.log('res :' + res + res[0]);
      // this.form.setValue= res.mark;




    },
      err => console.log(err),

    );

    console.log('11');



    // console.log(this.reso + 'reso');
    // this.form = this.reso;



    // this.reso.forEach(element => {

    //   console.log(element + 'element');

    // });

    console.log('2');

    console.log('mark --before update -----::' + this.form.get('mark').value);
    // this.service.updateStudCourseExam(upId, this.form.value).subscribe(
    //   res => {
    //     console.log('3');
    //   },
    //   err => console.log(err)
    // );

    // if (!this.form.valid) {
    //   this.validator.markFormTouched(this.form);
    //   console.log('not validddddddddddd');

    //   return;
    // }
    // console.log(' mark inside 44444444   :' + this.form.get('mark').value);

    // console.log(' mark inside 555555   :' + this.form.get('mark').value);
    // this.updateStudCourseExam(upId);


  }



  patchForm() {

  }



  setupUpdate(eId: number, nval: number) {
    this.initForm();

    console.log('eId : ' + eId);
    console.log('nval :' + nval);

    // this.service.getStudCoureExamById(eId).subscribe(res => {
    //   console.log('after eid nval ');

    //   this.form = this.validator.patchForm(this.form, res[0]);
    //   this.form.controls['mark'].setValue(nval);
    //   console.log(' mark inside setupUpdate 1111  :' + this.form.get('mark').value);



    // }, err => {
    //   console.log(err)
    //   console.log('fffffffffffffffff');

    // }
    // );
    console.log(' yearId inside 333   :' + this.form.get('yearId').value);

    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      console.log('not validddddddddddd');

      return;
    }
    console.log(' mark inside 44444444   :' + this.form.get('mark').value);

    console.log(' mark inside 555555   :' + this.form.get('mark').value);
    this.updateStudCourseExam(eId);

  }



  submit(id) {

    console.log(' mark form submit :' + this.form.get('mark').value);
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }


    this.updateStudCourseExam(id);
  }



  updateStudCourseExam(iid: number) {
    console.log(' mark form updateStudCourseExam :' + this.form.get('mark').value);
    console.log('form value ' + this.form.value + '   iid :' + iid);

    this.service.updateStudCourseExam(iid, this.form.value).subscribe(
      res => {
      },
      err => console.log(err)
    );
  }

}
