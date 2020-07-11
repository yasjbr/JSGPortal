import { Routes } from '@angular/router';
import { YearlyCourseExamIndexComponent } from '../yearly-course-exam/yearly-course-exam-index/yearly-course-exam-index.component';
import { YearlyCourseIndexComponent } from './yearly-course-index/yearly-course-index.component';

export const yearlyCourseRoutes:Routes=[
    {path:'',children:[
        {path:'',redirectTo:'index',pathMatch:'full'},
        {path:'index',component:YearlyCourseIndexComponent}
    ]}

]