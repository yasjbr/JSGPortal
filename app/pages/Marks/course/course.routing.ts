import { Routes } from '@angular/router';
import { CourseIndexComponent } from './course-index/course-index.component';

export const courseRoutes:Routes=[
    {path:'',children:[
        {path:'',redirectTo:'index'},
        {path:'index',component:CourseIndexComponent}
    ]}
]