import { Routes } from '@angular/router';
import { YearlyCourseExamIndexComponent } from './yearly-course-exam-index/yearly-course-exam-index.component';

export const yearlyCourseExamRoutes:Routes=[
    { path:'', children:[
        {path:'',redirectTo:'index',pathMatch:'full'},
        {path:'index',component:YearlyCourseExamIndexComponent}
    ]}

]