import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SysusersService } from '../../sys-users/sysusers.service';
import { userRoleService } from '../../sys-users/user-role/userRole.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { SuccessComponent } from '../../roles/success/success.component';
import { userReport } from 'src/app/Models/Users/UserRepor';
// import { userRoleService } from '../sys-users/user-role/userRole.service';
 
@Component({
  selector: 'app-add-user-report',
  templateUrl: './add-user-report.component.html',
  styleUrls: ['./add-user-report.component.scss']
})
export class AddUserReportComponent implements OnInit {
  usersList: any;
  durationInSeconds = 5;
  reportsList: any;
  public form: FormGroup;
  @Output() event = new EventEmitter<userReport>(true);

  constructor( private service: SysusersService, private userRoleService: userRoleService, private formbuilder: FormBuilder,
    public validator: ValidationBase,    private _snackBar: MatSnackBar, public dialogRef2: MatDialogRef<AddUserReportComponent>,) { }

  ngOnInit() {
    this.iniForm();
    this.getUserList();
  }


  iniForm() {

    this.form = this.formbuilder.group({
      UserId: [null, [Validators.required]],
      ReportId: [null, [Validators.required]],
    });
  }
   
  getUserList() {
    return this.service.getUsers().subscribe(res => {
      this.usersList = res;
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SuccessComponent, {
      duration: this.durationInSeconds * 1000,
      
    });
  }


  getReportsList(id) {
    console.log('userId',id);
    
    return this.userRoleService.GetAllUserUnGivenReports(id).subscribe(res => {
      this.reportsList = res;
      console.log(res);

    })
  }


  AddUserReport() {
    return this.userRoleService.AddUserReport(this.form.value).subscribe(res => {

      this.event.emit(this.form.value);
      this.dialogRef2.close(this.form.value);
      this.openSnackBar()
    },
      err => console.log(err)
    );
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
    this.AddUserReport();
  }


  closeDialog(): void {
    this.dialogRef2.close();
  }

}
