import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../../Reg/Employee/employee.service';
import { employeeDtl } from 'src/app/Models/Employee/employeeMaster';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { StockService } from '../stock.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material';


@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss']
})
export class ReturnBooksComponent implements OnInit {
  @ViewChild('employeeId')employeeId:MatSelect;
  @ViewChild('itemId')itemId: MatSelect;
  @ViewChild('statusId')statusId: MatSelect;
  
  exist=false;
  dataList: employeeDtl[];
  statusList: employeeDtl[];
  employeeList: any;
  itemList: any;
  public form: FormGroup;
  schoolId: any;

  constructor(
    private service: EmployeeService,
    private StockService: StockService,
    private fb: FormBuilder,
    private currentUserService: CurrentUserService,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.schoolId = currentUser.schoolId;

  }

  ngOnInit() {
    // this.iniForm();
  
  this.inivalue();
    this.GetFilterEmployee();
    this.GetItemList();
    this.Getstatus();
    this.GetEmployee();
  }
  // iniForm() {
  //   this.form = this.fb.group({
  //     employeeId: [0],
  //     itemId: [0],
  //     statusId: [0]
  //   });
  // }
  inivalue(){
    this.employeeId.value=0;
    this.itemId.value=0;
    this.statusId.value=0;
  }
  GetFilterEmployee() {
    return this.service.GetAllEmployee(this.schoolId).subscribe(res => {
      this.employeeList = res;
    })
  }

  GetItemList() {
    return this.StockService.GetItemListForPrice().subscribe(res => {
      this.itemList = res;
    })
  }

  Getstatus() {
    return this.service.GetEmployeeByBorrow(0, 0, 0).subscribe(res => {
      this.statusList = res[0].statusIdUniq;
    })
  }
  GetEmployee() {
    return this.service.GetEmployeeByBorrow(this.employeeId.value,this.itemId.value,this.statusId.value).subscribe(res => {
      console.log(res);
      
      if(res.length>0 ){
        this.exist=false;
        this.dataList = res;
       
      }else{
        this.dataList=null;
        this.exist=true;
      }
     
    })
  }
  
  returnBook(id) {
    console.log('index', id);
    return this.service.returnBook(id).subscribe(res => {
      this.GetEmployee();
    });

  }

}
