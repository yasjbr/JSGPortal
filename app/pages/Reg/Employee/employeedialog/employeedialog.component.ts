//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { employee } from 'src/app/Models/Employee/employee';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ValidationBase } from 'src/app/validationBase';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SchoolFeeService } from 'src/app/pages/financial/school-fee/school-fee.service';
import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from "src/app/Models/Enum/SystemEnum";
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { StockService } from 'src/app/pages/stock/stock.service';

@Component({
  selector: 'app-employeedialog',
  templateUrl: './employeedialog.component.html',
  styleUrls: ['./employeedialog.component.scss']
})
export class EmployeedialogComponent implements OnInit {
  loading = false;
  schoolId:any;
  schoolName:any;
  yearId:any;
  edit = false;
  
  selectedSchool:any;
  selectedSpec:any;
  selectdJob:any;
  public form: FormGroup;
  schoolList: LkpSchool[];
  ItemList: Lkplookup[];
  employee: employee[];
  // returnUrl = "/Supplier/IndexSupplier";
  id: number=0;
  
  @Output() event = new EventEmitter<employee>(true);

  MajorsList: Lkplookup[];
  JobList:Lkplookup[];
  constructor(
    private EmployeeServices: EmployeeService,
    private formbuilder: FormBuilder,
    private service: SchoolFeeService,
    private schoolService: SchoolService,
    public validator: ValidationBase,
    private currentUserService: CurrentUserService,
    public dialogRef: MatDialogRef<EmployeedialogComponent>,
    private lookup: LookupsApiService,
    private services: StockService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;


    this.iniForm();
   }

  ngOnInit() {
    this.getLookups();
    this.getSchoolList();
    this.setupUpdate(this.id);
  }
  iniForm() {
    console.log("id=" + this.id);
    this.form = this.formbuilder.group({
      id: [this.id],
      empName: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
      specId: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      isActive: [true],
    });
  }
   
  Addemployee() {
    this.EmployeeServices.Addemployee(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
        //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  public get errName(): AbstractControl {
    return this.form.get("empName");
  }

  getSchoolList() {
    this.schoolService.schoolList().subscribe(res => this.schoolList = res);
  }


  GetAllEmployee() {
    return this.EmployeeServices.GetAllEmployee(this.schoolId)
    .subscribe(res => 
      {
      this.employee = res;
      console.log(this.employee);
      });
    
  }




  submit() {
    //null;
  }
  submit2() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    let item = this.form.value as employee
    this.loading = true;
    this.edit ? this.employeeUpdate(item) : this.Addemployee();
  }


  closeDialog(): void {
    this.dialogRef.close();
    
  }

////////

private fillLookups(res: any) {
  res.forEach((element: Lkplookup[]) => {
    let defVal;
    let value;
    // console.log("Loop");
    switch (element[0].typeId) {
      
      case LookupTypes.Majors:
        this.MajorsList = element;
        break;

        case LookupTypes.Job:
        this.JobList = element;
        break;

      default:
        break;
    }
  });
}

private getLookups() {
  this.lookup
    .getLookupsByType2([
     
      LookupTypes.Majors,
      LookupTypes.Job,

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
 
setupUpdate(id) {
  console.log('ammer23');
  
  if (!this.data.id) return;
  console.log('iiiiiid',this.data.id);
  this.id = this.data.id; // +params.id;
  this.edit = true;
  this.loading = true;
  this.EmployeeServices.getEmployeeById(this.id).subscribe(
    res => {
      // this.selectedSchool=res[this.id].schoolId;
      // this.selectedSpec=res[this.id].specId;
      // this.selectdJob=res[this.id].jobId;
      console.log('===============setUp',res);
      this.form = this.validator.patchForm(this.form,res);
      console.log('formGtrup',this.form);
    },
    err => console.log(err),
    () => (this.loading = false)
  );
  //   });
}
employeeUpdate(item) {
  console.log('ameeer');
  
  //var id = this.data.id != null?this.data.id:"";
  this.EmployeeServices.employeeUpdate(this.id, item).subscribe(
    res => {
      this.dialogRef.close(this.form.value);
      // this.router.navigateByUrl(this.returnUrl);
    },
    err => console.log(err)
  );
}
}


