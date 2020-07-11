import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { YearlyCourseService } from '../../yearly-course/yearly-course.service';
import { YearlyCourse } from 'src/app/Models/Marks/YearlyCourse';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { ValidationBase } from 'src/app/validationBase';
import { YearlyCourseExamService } from '../yearly-course-exam.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { YearlyCourseExam } from 'src/app/Models/Marks/YearlyCourseExam';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';

@Component({
  selector: 'app-yearly-course-exam-dialog',
  templateUrl: './yearly-course-exam-dialog.component.html',
  styleUrls: ['./yearly-course-exam-dialog.component.scss']
})
export class YearlyCourseExamDialogComponent implements OnInit {

  yearlyCourseList: YearlyCourse[]; 

  searchForm: FormGroup;
  form: FormGroup;
  yearsList: any;
  schoolId: any;
  classList: lkpClass[];
  examList: Lkplookup[];
  termsList: Lkplookup[];
  schoolList: any;
  sectionsList: any;
  edit = false;
  loading: boolean;
  id: number;
  @Output() event = new EventEmitter<YearlyCourseExam>(true);
  constructor(private yearlyCourseService: YearlyCourseService,
    private fb: FormBuilder,
    private yearService: YearService,
    private classService: ClassService,
    private currentUserService: CurrentUserService,
    private service: YearlyCourseExamService,
    private lookup: LookupsApiService,
    public validator: ValidationBase,
    private schoolService: SchoolService,

    private sectionService: SectionService,
    public dialogRef: MatDialogRef<YearlyCourseExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
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




  initSearchForm() {

    console.log('----year from form----' + this.form.get('yearId').value);
    console.log('----classId from form----' + this.form.get('classId').value);

    this.searchForm = this.fb.group({
      yearId: [this.form.get('yearId').value],
      classId: [this.form.get('classId').value]
    })
  }


  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        case LookupTypes.Exam:
          this.examList = element;
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



  submit() {
    console.log('----------------submit begin');

    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    console.log('------------submit 2');
 
    // this.loading = true;
    this.edit ? this.updateYearlyCourseExam() : this.addYearlyCourseExam();
  }

  addYearlyCourseExam() {
    this.service.addYearlyCourseExam(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      },
      err => console.log('errrrrrr' + err)
    );
  }

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
   this.getSectionsList();
   //this.onSearch();

  }


  updateYearlyCourseExam() {
    console.log('update');
    this.service.updateYearlyCourseExam(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
        //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
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
    this.loading = true;

    this.service.getYearlyCoureExamById(this.id).subscribe(res => {
      this.form = this.validator.patchForm(this.form, res[0]);
      console.log('res-----------' + res[0].className + this.form.get('yearId').value);
      this.initSearchForm()
      console.log('20102022' + this.form.get('yearId').value);

      this.getYealyCourseList();

    }, err => console.log(err),
      () => this.loading = false);
    //  });
  }


  closeDialog(): void {
    this.dialogRef.close(true);
  }


  onNoClick(): void {
    this.dialogRef.close();
    }

  onSearch() {
    this.initSearchForm();
    this.getYealyCourseList();

  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      yearId: [Number(this.service.selectedYearId), [Validators.required]],
      schoolId: [Number(this.schoolId), [Validators.required]],
      sectionId: [0, [Validators.required]],
      classId: [0, [Validators.required]],
      yearlyCourseId: [0, [Validators.required]],
      examId: [0, [Validators.required]],
      examWeight: [0, [Validators.required]],
      examEntryDateFrom: [],
      examEntryDateTo: []
    })
  }
  ngOnInit() {
    // this.initSearchForm();
    this.initForm();
    this.getLookups();
    this.getSchoolList();
    this.getSectionsList();
    this.getClassList();
    this.getYearsList();
    // this.getYealyCourseList();
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

}
