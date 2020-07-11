import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { ValidationBase } from 'src/app/validationBase';
import { YearlyCourseService } from '../../yearly-course/yearly-course.service';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { YearlyCourseExamService } from '../../yearly-course-exam/yearly-course-exam.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YearlyCourseExamDialogComponent } from '../../yearly-course-exam/yearly-course-exam-dialog/yearly-course-exam-dialog.component';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { users } from 'src/app/Models/Users/users';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { Student } from 'src/app/Models/Reg/Students/students';
import { StudCourseExamService } from '../stud-course-exam.service';
import { StudCourseExam } from 'src/app/Models/Marks/StudCourseExam';

@Component({
  selector: 'app-stud-course-exam-dialog',
  templateUrl: './stud-course-exam-dialog.component.html',
  styleUrls: ['./stud-course-exam-dialog.component.scss']
})
export class StudCourseExamDialogComponent implements OnInit {

  form: FormGroup;
  // searchForm: FormGroup;
  yearsList: any;
  classList: lkpClass[];
  yearlyCourseList: YearlyCourse[];
  edit = false;
  schoolId: any;
  studentsList: Student[];
  // classList: lkpClass[];
  examsList: StudCourseExam[];
  termsList: Lkplookup[];
  id: number;
  loading: boolean;
  @Output() event = new EventEmitter<StudCourseExam>(true);
  constructor(
    // public validator: ValidationBase,
    private yearlyCourseService: YearlyCourseService,
    private fb: FormBuilder,
    private yearService: YearService,
    private classService: ClassService,
    private currentUserService: CurrentUserService,
    private service: StudCourseExamService,
    private lookup: LookupsApiService,
    private studentService: StudentService,
    public validator: ValidationBase,
    public dialogRef: MatDialogRef<YearlyCourseExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;

  }


  addStudCourseExam() {
    this.service.addStudCourseExam(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      },
      err => console.log('errrrrrr' + err)
    );
  }

  updateStudCourseExam() {
    console.log('update');
    this.service.updateStudCourseExam(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
        //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  submit() {
    console.log('----------------submit begin');

    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    console.log('------------submit 2');

    // this.loading = true;
    this.edit ? this.updateStudCourseExam() : this.addStudCourseExam();
    this.getStudCourseExamsByParam();
  }


  onSearch() {
    //this.initSearchForm();
    this.getYealyCourseList();
    this.getStudentList();
    this.getStudCourseExamsByParam();
  }

  closeDialog(): void {
    this.dialogRef.close();
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
      mark: []
    })
  }


  getYealyCourseList() {
    this.yearlyCourseService.getYearlyCourseByParam(this.form.value).subscribe(res => this.yearlyCourseList = res)
  }

  getYearsList() {
    this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }
  getClassList() {
    return this.classService.GetClassBySchool(this.schoolId).subscribe(res => this.classList = res);
  }



  getStudentList() {
    // console.log('searchForm '+this.searchForm.value);
    this.studentService.getStudentByParam(this.form.value).subscribe(res => {
      this.studentsList = res;
      console.log('resssss', res);
    })
  }


  setupUpdate() {
    // this.route.params.subscribe(params => {
    //   if (!params.id) {
    //     return;
    //   }
    console.log(this.data);

    console.log('this.data.id' + this.data.id);

    if (!this.data.id) return;
    //  this.id = +params.id; 
    this.id = this.data.id;
    this.edit = true;
    // this.loading = true;
console.log(this.id+'this.ididididididi');

    this.service.getStudCoureExamById(this.id).subscribe(res => {
      this.form = this.validator.patchForm(this.form, res[0]);
      console.log('mark -------::' + this.form.get('mark').value);
      console.log('res :'+ res + res[0]);
      
      // this.initSearchForm()
      // console.log('20102022' + this.form.get('yearId').value);

      //this.getYealyCourseList();

    }, err => console.log(err),  
      () => this.loading = false);
    //  });
  }



  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        // case LookupTypes.Exam:
        //   this.examsList = element;
        // break;
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


  getStudCourseExamsByParam() {

    console.log('20102022:' + this.form.get('yearId').value);
    console.log('20102022:' + this.form.get('classId').value); 
    console.log('20102022:' + this.form.get('yearlyCourseId').value);
    this.service.getStudCoureExamByParam(this.form.value).subscribe(res => {
      this.examsList = res,
      console.log('20102022   :  ' +res)
    }
      );
   
  }

  ngOnInit() {

    // this.initSearchForm();
    this.initForm();
    this.getLookups();
    this.getClassList();
    this.getYearsList();
    // this.getYealyCourseList();
    this.setupUpdate();
  }

}
