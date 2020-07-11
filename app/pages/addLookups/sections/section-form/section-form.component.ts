import { SectionService } from './../section.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../schools/school.service';
import { EmployeeService } from 'src/app/pages/Reg/Employee/employee.service';
import { employee } from 'src/app/Models/Employee/employee';
import { id } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  
  showSaveButton=true;
  EmployeeList: employee[];
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/sections/index';
  id: number;
  schoolList:any;
  schoolId: number;
  managerId:number;

  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: SectionService,
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private serviceEmp:EmployeeService
  ) { 
    this.getSchoolList();
    this.initForm();
      this.getEmployeeList();
  }

  ngOnInit() {
    this.setupUpdate();
   // this.getEmployeeList();
    this.viewSchool();
  }

  
  initForm() {
    this.form = this.fb.group({
      id: [0],
      sectionName: ['', [Validators.required]],
      email: [''],
      managerId: [''],
      nationalId:[''],
      schoolId: ['']
    });
  }

 

  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  getEmployeeList() {
    return this.serviceEmp.GetAllEmployee(1).subscribe(result => this.EmployeeList = result);
  }
    
  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
    this.edit ? this.updateSection() : this.addSection();
    
  }
 
  addSection() {
    console.log('add',this.form.value);
    
    this.service.addSection(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  updateSection() {
    this.service.updateSection(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  
  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.showSaveButton = true;
      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getSection(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }


  public get name(): AbstractControl {
    return this.form.get('sectionName');
  }
  viewSchool() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.showSaveButton = false;
      console.log('--------------------view secton------------');
      
     
    });
  }
}
