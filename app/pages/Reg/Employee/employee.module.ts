import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexEmployeeComponent } from './index-employee/index-employee.component';
import { EmployeedialogComponent } from './employeedialog/employeedialog.component';
import { RouterModule } from '@angular/router';
import { employee } from './employee.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    IndexEmployeeComponent,
    EmployeedialogComponent,



],
  imports: [
    CommonModule,
    RouterModule.forChild(employee),
    CommonModule,
    SharedModule,

    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class EmployeeModule { 



}