import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/pages/Reg/Employee/employee.service';
import { employee } from 'src/app/Models/Employee/employee';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Items } from 'src/app/Models/Stock/Items';
import { StockService } from '../../stock.service';
import { ValidationBase } from 'src/app/validationBase';

@Component({
  selector: 'app-borrow-abook-by-employee',
  templateUrl: './borrow-abook-by-employee.component.html',
  styleUrls: ['./borrow-abook-by-employee.component.scss']
})
export class BorrowABookByEmployeeComponent implements OnInit {
  EmployeeList: employee[];
  schoolId: number;
  yearId: number;
  err = false;
  BookList: Items[];
  public form: FormGroup;
  bookDtl: FormArray;
  loading = false;
  @Output() event = new EventEmitter<Items>(true);
  constructor(
    private service: EmployeeService,
    private currentUserService: CurrentUserService,
    private fb: FormBuilder,
    private StockService: StockService,
    public validator: ValidationBase,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.yearId = currentUser.yearId;
  }

  ngOnInit() {
    this.iniForm();
    this.getEmployeeList();
    this.addForm();
  }
  iniForm() {
    this.form = this.fb.group({
      id:(0),
      EmployeeId: [0, Validators.required],
      schoolId: this.schoolId,
      yearId: this.yearId,
      employeeDeatil: this.fb.array([])
    })
    this.newForm();
  }
  newForm(): FormGroup {
    return this.fb.group({
      employeeDeatil: this.fb.array([]).push(this.fb.group({
       
       
        BookId: [null, [Validators.required]],
        

      })
     
      )
    })

  }

  addForm() {
    if (this.form.valid) {
      this.err = true;
      this.FormArr.push(this.fb.group({
     
        BookId: [null, [Validators.required]],
      }));
    }
    else {
      this.err = false;
    }
  }


  get FormArr(): FormArray {
    return this.form.get('employeeDeatil') as FormArray
  }
  removeForm(empIndex: number) {
    this.FormArr.removeAt(empIndex);
    this.err = true;
  }


  getValid() { this.err = true }

  submit2() {
    if (!this.form.valid) {
      this.err = false;
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
    this.save();
    this.iniForm();
    this.addForm();

  }
  save() {
    if (this.form.valid) {
      return this.service.AddItems(this.form.value).subscribe(res => {

      })
    } else {
      this.err = false
    }

  }

  getBookList() {
    return this.StockService.GetItemListForPrice().subscribe(res => {
      this.BookList = res;
      console.log('items', this.BookList);
    })
  }


  getEmployeeList() {
    return this.service.GetAllEmployee(this.schoolId).subscribe(res => {
      this.EmployeeList = res;
    })
  }
}
