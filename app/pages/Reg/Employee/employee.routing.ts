import { Routes } from '@angular/router';
import { IndexEmployeeComponent } from './index-employee/index-employee.component';
import { EmployeedialogComponent } from './employeedialog/employeedialog.component';


export const employee:Routes=[
{
    path:'',
    children:[
        {path:'', redirectTo:'AddEmployee',pathMatch:'full'},
        {path:'AddEmployee',component:IndexEmployeeComponent},
        {path:'AddEmployee',component:EmployeedialogComponent},
    ]
}


]