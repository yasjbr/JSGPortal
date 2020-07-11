import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersData } from './users.data';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { SysUsersComponent } from './sys-users/sys-users.component';
import { usersRoutes } from './users.routing';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { UsersService } from './users.service';
import { UserFormComponent } from './sys-users/user-form/user-form.component';
import { SysusersService } from './sys-users/sysusers.service';
import { UserSchoolComponent } from './sys-users/user-school/user-school.component';
import { UserRoleComponent } from './sys-users/user-role/user-role.component';
import { SysRoleComponent } from './roles/sys-role/sys-role.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { SuccessComponent } from './roles/success/success.component';
import { UsersReportsComponent } from './users-reports/users-reports.component';
import { AddUserReportComponent } from './users-reports/add-user-report/add-user-report.component';
import { SysRoleDialogComponent } from './roles/sys-roledialog/sys-role-dialog/sys-role-dialog.component';
//import { TesttComponent } from './sys-users/test3/testt/testt.component';
//import { SysRoleDialogComponent } from './sys-users/sys-role-dialog/sys-role-dialog.component';

export const routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent,
    SysUsersComponent,
    UserFormComponent,
    UserSchoolComponent,
    UserRoleComponent,
    SysRoleComponent,
    AddRoleComponent,
    SuccessComponent,
    UsersReportsComponent,
    AddUserReportComponent,
    // TesttComponent,
    // SysRoleDialogComponent
    SysRoleDialogComponent,
   
  ],
  entryComponents:[
    UserDialogComponent,
    AddRoleComponent,
    SuccessComponent,
    AddUserReportComponent,
    SysRoleDialogComponent
  ],
  providers:[UsersService]
})
export class UsersModule { }
