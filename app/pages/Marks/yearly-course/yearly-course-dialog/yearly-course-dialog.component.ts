import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { YearlyCourseService } from '../yearly-course.service';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { Course } from 'src/app/Models/Marks/Course';
import { CourseService } from '../../course/course.service';
import { ValidationBase } from 'src/app/validationBase';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
 
@Component({
  selector: 'app-yearly-course-dialog',
  templateUrl: './yearly-course-dialog.component.html',
  styleUrls: ['./yearly-course-dialog.component.scss']
})
export class YearlyCourseDialogComponent implements OnInit {
  //vars
  public form: FormGroup;
  public yearsList: LkpYear[];
  public classList: lkpClass[];
  schoolList: any;
  sectionsList: any;
  edit = false;
  id: number;
  schoolId: any;
  public coursesList: Course[];
  //constructor
  constructor(
    private yearService: YearService,
    private service: YearlyCourseService,
    private classService: ClassService,
    private courseService: CourseService,
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private sectionService: SectionService,
    public validator: ValidationBase,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<YearlyCourseDialogComponent>) { }

  ngOnInit() {
    this.schoolId = this.service.SelectedSchoolId;
    console.log('--------------------------------- ' + this.service.SelectedSchoolId);
    this.initForm();
    this.getYearsList();
    this.getSchoolList();
    this.getSectionsList();
    this.getClassList();

    this.getCourseList();

    this.setupUpdate();

  }

  getSchoolList(){
    console.log('schoooooooooo' + this.schoolId);
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }


  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);

  }

  getSectionsList() {
    console.log('this.data.schoolId ' + this.schoolId);

    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  getClassBySection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);
  }

  getClassList() {
    this.classService.classList().subscribe(res => this.classList = res);

  }

  getYearsList() {
    this.yearService.getYearsList().subscribe(res => this.yearsList = res);
  }

  getCourseList() {
    this.courseService.getCourseList().subscribe(res => this.coursesList = res);
  }

  closeDialog1() {
    this.dialogRef.close(); 
  }


  closeDialog(): void {
    console.log('---------------8888---close');
    this.dialogRef.close();
  }



  submit() {
    console.log('sssssssube');
    if (!this.form.value) {
      this.validator.markFormTouched(this.form);
      console.log('nooooo');
      return;
    }
    console.log('dsdsdsds');
    this.edit ? this.updateYearlyCourse() : this.addYearlyCourse();
    this.dialogRef.close(this.form.value);
  }

  addYearlyCourse() {
    this.service.addYearlyCourse(this.form.value).subscribe();
  }


  setupUpdate() {
    console.log(this.data.id + '------------000000 ');

    if (!this.data.id) return;
    this.id = this.data.id;
    this.edit = true;
    this.service.getYearlyCourseById(this.id).subscribe(res => {
    this.form = this.validator.patchForm(this.form, res);
    console.log();
    
    },
      err => console.log(err)
    )
  }


  updateYearlyCourse() {
    console.log('update');

    this.service.updateYearlyCourse(this.id, this.form.value).subscribe(res => {
      this.dialogRef.close(this.form.value);
      console.log('updatdde');
    },
      err => console.log(err)
    );
  } 



  
  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
   this.getSectionsList();
   //this.onSearch();

  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      yearId: [Number(this.service.selectedYearId), [Validators.required]],
      schoolId: [Number(this.schoolId), [Validators.required]],
      sectionId: [0, [Validators.required]],
      classId: [0, [Validators.required]],
      courseId: [0, Validators.required],
      inGpa: ['1', Validators.required],
      maxMark: [100, [Validators.min(100), Validators.max(240), Validators.required]]
      // maxMark:[0]
    });

  }


}
