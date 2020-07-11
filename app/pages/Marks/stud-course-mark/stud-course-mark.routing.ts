import { Routes } from '@angular/router';
import { StudCourseMarkIndexComponent } from './stud-course-mark-index/stud-course-mark-index.component';

export const studCourseMarkRoutes:Routes=[
    {path:'',children:[
        {path:'',redirectTo:'index',pathMatch:'full'},
        {path:'index',component:StudCourseMarkIndexComponent}
    ]}

]