import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/Models/Employee/employee';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { EmployeeService } from '../employee.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
//import { SupplierdialogComponent } from 'src/app/pages/supplier/supplierdialog/supplierdialog.component';
import { EmployeedialogComponent } from '../employeedialog/employeedialog.component';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';

@Component({
  selector: 'app-index-employee',
  templateUrl: './index-employee.component.html',
  styleUrls: ['./index-employee.component.scss']
})
export class IndexEmployeeComponent implements OnInit {
  employee: employee[];
  schoolId: any;
  yearId: any; 
  schoolName: any;
  currentYearId: number;
  schoolList: any;

  constructor(
    private currentUserService: CurrentUserService,
    private EmployeeServices: EmployeeService,
    public dialog: MatDialog,
    private schoolService: SchoolService
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
   }
  ngOnInit() {
    this.getSchoolList();
    this. GetAllEmployee()
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.currentYearId = currentUser.yearId;
    this.schoolId = currentUser.schoolId;
  }
  addNewemployee(){
    const dialogConfig = new MatDialogConfig();
    var SupName: any;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(EmployeedialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllEmployee();
    });
  }

  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  GetAllEmployee() {
    return this.EmployeeServices.GetAllEmployee(this.schoolId)
    .subscribe(res => 
      {
      this.employee = res;
      console.log(this.employee);
      });
    
  }

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
    this.GetAllEmployee();

  }
  employeeUpdate(id) {
    console.log("itemid=" + id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: id,
    };
    const dialogRef = this.dialog.open(EmployeedialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllEmployee();
    });
    dialogRef.afterClosed();
  
  }



}
