import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { Teacher } from 'src/app/Models/CorseTeacher/Teacher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { MatDialogRef, MatSelect, MatSnackBar } from '@angular/material';
import { YearlyCourseService } from '../../Marks/yearly-course/yearly-course.service';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { YearService } from '../../addLookups/years/year.service';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { SectionService } from '../../addLookups/sections/section.service';
import { SchoolService } from '../../addLookups/schools/school.service';
import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';
import { ClassService } from '../../addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { EmployeeService } from '../../Reg/Employee/employee.service';
import { DivisionService } from '../../Reg/cha-division/division.service';
import { ClassDivisionService } from '../../addLookups/divisions/classDivision.Service';
import { lkpClassDivision } from 'src/app/Models/addLookups/classes/LkpClassDivision';
import { CorsesTeacherServiceService } from '../corses-teacher-service.service';
import { employee } from 'src/app/Models/Employee/employee';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dialog-corses-teachers',
  templateUrl: './dialog-corses-teachers.component.html',
  styleUrls: ['./dialog-corses-teachers.component.scss']
})
export class DialogCorsesTeachersComponent implements OnInit {
  schoolList: LkpSchool[];
  yearsList: any;
  schoolName: String;
  teachers: employee[];
  divisionList: lkpClassDivision[];
  sectionList: LkpSection[];
  name: string;
  yearlyCourseList: YearlyCourse[];
  loading = false;
  edit = false;
  id: number = 0;
  currentUser: users;
  schoolId: number;
  yearId: number;
  customerList: Teacher[];
  ClassList: lkpClass[];
  statusList: Teacher[];
  Date = new Date();
  Total: string;
  boolean = false;
  public formGetCourse: FormGroup;
  public formAddCourseDivisionTeacher: FormGroup;
  identity:number;
  //@ViewChild('School') School: MatSelect;
  //@ViewChild('section') section: MatSelect;
  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private classService: ClassService,
    private schoolService: SchoolService,
    private yearlyCourseService: YearlyCourseService,
    public validator: ValidationBase,
    private emplyeeService: EmployeeService,
    private division: ClassDivisionService,
    private currentUserService: CurrentUserService,
    private yearService: YearService,
    private service: CorsesTeacherServiceService,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute

  ) {
    this.currentUserService.user.subscribe(user => this.currentUser = user);
    this.name = this.currentUser.username;
    this.schoolId = +this.currentUser.schoolId;
    this.yearId = +this.currentUser.yearId;

  }
  ngOnInit() {
    this.getYearsList();
    this.getSchoolList();
    this.initForm();
    this.sectionListBySchool();
    this.getTeacherbyschool();

    this.route.params.subscribe(params=>{
      if(!params.id)
        this.identity=null;
        this.identity=params.id
        console.log(this.identity);
    });
    this.setupUpdate();
  }
  initForm() {
    this.formGetCourse = this.fb.group({
      yearId: [this.yearId, [Validators.required]],
      schoolId: [this.schoolId, [Validators.required]],
      sectionId: [null, [Validators.required]],
      classId: [null, [Validators.required]]
    });
    this.formAddCourseDivisionTeacher = this.fb.group({
      id: [this.id],
      courseId: [null, [Validators.required]],
      classDivisionId: [null, [Validators.required]],
      teacherId: [null, [Validators.required]]
    });
  }
  // ====================================
  // =========First form builder==========
  // ========================================
  getYearsList() {
    this.yearService.getYearsList().subscribe(result => {
      this.yearsList = result
    });
  }
  getSchoolList() {
    this.schoolService.schoolList().subscribe(res => {
      this.schoolList = res
    }, (err) => {
      console.log(err);
    });
  }
  sectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.formGetCourse.value.schoolId).subscribe(res => {
      this.sectionList = res;
      console.log('section list=====>', res);
    });
  }
  getClassListBySection() {
    this.classService.GetClassBySection(this.formGetCourse.value.sectionId).subscribe(res => {
      this.ClassList = res;
      console.log('ClassList list=====>', res);
    });
  }
  // ====================================
  // =========second form builder==========
  // ========================================
  getTeacherbyschool() {
    this.emplyeeService.GetAllEmployee(this.formGetCourse.value.schoolId).subscribe(res => {
      this.teachers = res;
    }, (err) => {
      console.log("teacher", err);
    });
  }
  getClassDivision() {
    this.division.getDivisionsByForm(this.formGetCourse.value).subscribe(res => {
      if (res.length > 0) {
        this.divisionList = res;
        console.log('division list=====>', res);

      } else
        this.divisionList = null;
    }, (err) => console.log(err)
    )
  }
  getYearlycourse() {
    this.yearlyCourseService.getYearlyCourseByParam(this.formGetCourse.value).subscribe(res => {
      if (res.length > 0) {
        this.yearlyCourseList = res;
      } else
        this.yearlyCourseList = null;
      this.getClassDivision();
    })
  }


  resetInitForm() {
    this.initForm();
    // this.formCorse.get("schoolId").setValue(null);
    // this.formCorse.get("yearId").setValue(null);
  }

  setupUpdate() {
    if (!this.identity) return;
    this.edit = true;
    this.loading = true;
    this.service.getTeacherCoursebyId(this.identity).subscribe(
      (res) => {
        console.log('res123====>',res);
        
        this.formAddCourseDivisionTeacher = this.validator.patchForm(this.formAddCourseDivisionTeacher, res);
      },
      (err) => console.log(err),
      () => (this.loading = false)
    );
  }


  submit() {
    if (!this.formGetCourse.valid) {
      this.validator.markFormTouched(this.formGetCourse);
      return;
    }
    this.loading = true;
    this.edit ? this.updateTeacher() :this.addTeacher();
  }
  addTeacher() {
    return this.service.addCourseTeacher(this.formAddCourseDivisionTeacher.value).subscribe(res => {
      this.openSnackBar('تمت العملية بنجاح', 'X');
      this.initForm();
    }, (err) => {
      console.log('err', (err));
    });
  }
  updateTeacher() {
    this.service.updateTeacher(this.id, this.formAddCourseDivisionTeacher.value).subscribe(
      (res) => {
      
      },
      (err) => console.log(err)
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,

    });
  }



}
