import { Routes } from '@angular/router';
import { StudCourseExamIndexComponent } from './stud-course-exam-index/stud-course-exam-index.component';

export const studCourseExamRoutes:Routes=[
    {path:'',children:[
        {path:'',redirectTo:'index',pathMatch:'full'},
        {path:'index',component:StudCourseExamIndexComponent}
    ]}

] 