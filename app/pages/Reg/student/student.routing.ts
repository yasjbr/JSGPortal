import { StudentFormComponent } from './student-form/student-form.component';

import { Routes } from '@angular/router';
import { StudentIndexComponent } from './student-index/student-index.component';
import { ParentFormComponent } from '../parents/parent-form/parent-form.component';



export const studentRoute:Routes=[
{

    path:'',
    children:[
        {path:'',redirectTo:'index'},
        {path:'index',component:StudentIndexComponent},
        {path:'add', component:StudentFormComponent},
        { path: 'edit/:id', component: StudentFormComponent }//,
       // {path:'addParent', component:ParentFormComponent}
       // {path:'view/:id',component:ParentViewComponent}
    ]
}


]