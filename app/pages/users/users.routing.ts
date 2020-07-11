import { UserRoleComponent } from './sys-users/user-role/user-role.component';


import { Routes, RouterModule } from '@angular/router';
import { SysUsersComponent } from './sys-users/sys-users.component';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './sys-users/user-form/user-form.component';
import { UserSchoolComponent } from './sys-users/user-school/user-school.component';
import { SysRoleComponent } from './roles/sys-role/sys-role.component';
import { UsersReportsComponent } from './users-reports/users-reports.component';


export const usersRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    { path: 'index', component: SysUsersComponent },
    { path: 'add', component: UserFormComponent },
    { path: 'edit/:id', component: UserFormComponent },
    { path: 'editSchool/:id', component: UserSchoolComponent },
     {path: 'editRole/:id',component:UserRoleComponent},
     {path: 'authorization',component:SysRoleComponent},
     {path: 'userReports',component:UsersReportsComponent},
   
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
