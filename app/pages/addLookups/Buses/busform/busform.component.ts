import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { BusService } from '../bus.service';
import { SchoolService } from '../../schools/school.service';
import { EmployeeService } from 'src/app/pages/Reg/Employee/employee.service';
import { MatTableDataSource } from '@angular/material';
import { LkpBus } from 'src/app/Models/addLookups/bus/lkpBus';

@Component({
  selector: 'app-busform',
  templateUrl: './busform.component.html',
  styleUrls: ['./busform.component.scss']
})
export class BusformComponent implements OnInit {
  dataSource: MatTableDataSource<LkpBus>;
  form: FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/buses/index';
  id: number;
  busesList: any;
  schoolsList :any;
  busList2: LkpBus[];

  schoolEmployeesList:any;
  constructor(
    private service: BusService,
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private route: ActivatedRoute,
   private  schoolService :SchoolService,
   private emplyeeService :EmployeeService
  ) {
    this.initForm();
    this.getbusList();
  }

  ngOnInit() {
    this.setupUpdate();
    this.getSchoolsList();
   // this.getbusList();

  }
 
  getbusList() {
     this.service.busList().subscribe(res =>{this.busList2 = res})
  }
  initForm() {
    this.form = this.fb.group({
      id: [0],
      sidNo: [null],
      driverName: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      morningSuper: [null],
      evningSuper: [null],
      schoolId: [null, [Validators.required]]
    });
  }
  public get name(): AbstractControl {
    return this.form.get('driverName');
  }


  getSchoolEmployeeList(schoolId){
    this.emplyeeService.GetAllEmployee(schoolId).subscribe(
      res=>{
        this.schoolEmployeesList=res
      }
    )
  }
  getSchoolsList(){
    this.schoolService.schoolList().subscribe( res=>{
      this.schoolsList=res
    }
      
    )
  }
  submit() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
    console.log(this.edit);
    this.edit ? this.updateSection() : this.addSection();
  }
  addSection() {
    this.service.addBus(this.form.value).subscribe(
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
      err => console.log('errror', err)
    );
  }
  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getBusById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res[0]);
      }, err => console.log(err),
        () => this.loading = false);
    });
  }
}
