import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { userRoleService } from '../../sys-users/user-role/userRole.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { users } from 'src/app/Models/Users/users';
import { SysRoleComponent } from '../sys-role/sys-role.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  public form: FormGroup;
  durationInSeconds = 5;
  returnUrl = "/users/authorization";
  @Output() event = new EventEmitter<users>(true);
  screenList: any;
  GrpUserList: any;
  loading = false;
  constructor(
    public dialogRef2: MatDialogRef<AddRoleComponent>,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private serviceRole: userRoleService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.iniForm();
    // this.getScreenListr();
    this.getUserGrp();
  }
  iniForm() {

    this.form = this.formbuilder.group({
      RoleId: [null, [Validators.required]],

      FormId: [null, [Validators.required]],
    });
  }


  getUserGrp() {
    return this.serviceRole.getRoleList().subscribe(res => {
      this.GrpUserList = res;
      console.log(res);

    })
  }

  getScreenList(id) {
    console.log('userId',id);
    
    return this.serviceRole.getScreenList(id).subscribe(res => {
      this.screenList = res;
      console.log(res);

    })
  }


  AddScreen() {
    return this.serviceRole.AddScreen(this.form.value).subscribe(res => {

      this.event.emit(this.form.value);
    //  this.dialogRef2.close(this.form.value);
      this.openSnackBar()
    },
      err => console.log(err)
    );
  }

  
  openSnackBar() {
    this._snackBar.openFromComponent(SuccessComponent, {
      duration: this.durationInSeconds * 100,
      
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
   // this.loading = true;
    this.AddScreen();
  }

  closeDialog(): void {
    this.dialogRef2.close();
  }
}
