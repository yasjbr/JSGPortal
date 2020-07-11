import { Routes } from '@angular/router';
import { DisplayCorsesTeacherComponent } from './display-corses-teacher/display-corses-teacher.component';

import { DialogCorsesTeachersComponent } from './dialog-corses-teachers/dialog-corses-teachers.component';

export const CorsesTeacherRouting: Routes = [
    { path:'',
    children:[
      {path:'', redirectTo:'index'},
      {path:'index', component:DisplayCorsesTeacherComponent},
      {path:'add',component: DialogCorsesTeachersComponent},
      {path:'edit/:id',component:DialogCorsesTeachersComponent},
    ]
   },
  ];