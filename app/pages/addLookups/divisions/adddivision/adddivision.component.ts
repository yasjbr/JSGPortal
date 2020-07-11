import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClassdivisionComponent } from '../classdivision/classdivision.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { YearlyCourseService } from 'src/app/pages/Marks/yearly-course/yearly-course.service';
import { YearService } from '../../years/year.service';
import { ClassService } from '../../classes/class.service';
import { SchoolService } from '../../schools/school.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear'; 
import { SectionService } from '../../sections/section.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { ChaStuDivService } from 'src/app/pages/Reg/cha-division/cha-stu-div.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { ClassDivisionService } from '../classDivision.Service';
 
@Component({ 
  selector: 'app-adddivision',
  templateUrl: './adddivision.component.html',
  styleUrls: ['./adddivision.component.scss']
})
export class AdddivisionComponent implements OnInit {
  form: FormGroup;
  yearsList: LkpYear[];
  sectionsList:LkpSection[];
  schoolList: any;
  schoolId:any;
  edit = false;
  classList:lkpClass[];

  divisionList:any[];
  // edit = false;
  id: number;
  constructor(
    private yearService: YearService,
    private classService: ClassService,
   private serviceDivision: ClassDivisionService,
    private schoolService: SchoolService,
    private sectionService: SectionService,
    private ChaStuDivServices:ChaStuDivService,
    private fb: FormBuilder,
    private lookup: LookupsApiService,
    public validator: ValidationBase,
    private service: YearlyCourseService,
    private admservice: AdmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClassdivisionComponent>
  ) { }

  ngOnInit() {
    this.schoolId=this.classService.sSchoolId;
    this.getYearsList();
    // this.getSectionsList();
    
    this.getDivisionsList();
    this.getSchoolList();
    // console.log(this.classService.sSchoolId+'  ---------schoooool');
    this.initForm();
    this.getSectionsList();
    this.getClassList();
    
  }


  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
      this.getSectionsList();
  
  }

  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  getDivisionsList() {
    this.admservice.GetStudSClassSeq().subscribe(res => {
      this.divisionList = res;
      
      
    });
  }
  onChangeSection(selectedSection) {
    this.classService.GetClassBySection(selectedSection).subscribe(res => this.classList = res);

  }
  getYearsList() {
    this.yearService.getYearsList().subscribe(res => this.yearsList = res);
  }

  getSectionsList() {
    this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }

  getClassList() {
    this.classService.classList().subscribe(res => this.classList = res);

  } 

  initForm() {
    this.form = this.fb.group({
      id: [0],
      schoolId: [Number(this.schoolId), [Validators.required]],
      yearId: [Number(this.classService.sYearId), [Validators.required]],
      sectionId: [0, [Validators.required]],
      classId: [0, [Validators.required]],
      divisionId: [0, Validators.required],
    });

  }
  closeDialog(): void {
    this.dialogRef.close();
  }


  // submit() {
    
  //     this.service.addYearlyCourse(this.form.value).subscribe();
    
  
  // }



  submit() {
   
    if (!this.form.value) {
      this.validator.markFormTouched(this.form);
      return;
    }
    // this.edit ? this.updateClassDivision() :
    this.addDivision();
    this.dialogRef.close(this.form.value);
  }

  
  addDivision() {
    console.log('Division',this.form.value);
    
    this.serviceDivision.addDivisionforClass(this.form.value).subscribe();
  }

  // setupUpdate() {
  //   if (!this.data.id) return;
  //   this.id = this.data.id;
  //   this.edit = true;
  //   this.service.getYearlyCourseById(this.id).subscribe(res => {
  //   this.form = this.validator.patchForm(this.form, res);
  //   console.log();
    
  //   },
  //     err => console.log(err)
  //   )
  // }
  // updateClassDivision() {
  //   console.log('update');
  //   this.service.updateYearlyCourse(this.id, this.form.value).subscribe(res => {
  //     this.dialogRef.close(this.form.value);
  //     console.log('updatdde');
  //   },
  //     err => console.log(err)
  //   );
  // }
}
