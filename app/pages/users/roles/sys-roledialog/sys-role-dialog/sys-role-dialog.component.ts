import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {  FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
//import { userRoleService } from '../../sys-users/user-role/userRole.service';
import {  MatSnackBar } from '@angular/material';
import { userRoleService } from '../../../sys-users/user-role/userRole.service';
import { users } from 'src/app/Models/Users/users';
import { SuccessComponent } from '../../success/success.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sys-role-dialog',
  templateUrl: './sys-role-dialog.component.html',
  styleUrls: ['./sys-role-dialog.component.scss']
})
export class SysRoleDialogComponent implements OnInit {


  public form: FormGroup;
  durationInSeconds = 5;
  returnUrl = "/users/authorization";
  @Output() event = new EventEmitter<users>(true);
  screenList: any;
  GrpUserList: any;
  roleList:any;
  dataList:users[];
  id:any;
 
  constructor(
    private router: Router,
    public dialogRef2: MatDialogRef<SysRoleDialogComponent>,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private _snackBar: MatSnackBar,
    private serviceRole: userRoleService,

  ) {
   }

  ngOnInit() {
    this.iniForm();
  }

  iniForm() {
    this.form = this.formbuilder.group({
      name: ['', [Validators.required]],
    });
  }



  addsystemRole() {
    this.serviceRole.addsysRole(this.form.value).subscribe(
      res => {
        // this.router.navigateByUrl(this.returnUrl);
        this.closeDialog();
        this.openSnackBar();
      },
      err => console.log(err)
    );
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SuccessComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }




  submit1() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.addsystemRole();
  }

  closeDialog(): void {
    this.dialogRef2.close();
  }

}
