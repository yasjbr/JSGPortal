import { SchoolFormComponent } from './school-form/school-form.component';

import { Routes, RouterModule } from '@angular/router';
import { SchoolIndexComponent } from './school-index/school-index.component';

export const schoolRoutes: Routes = [
  {path:'',
  children:[
    {path:'', redirectTo:'index',pathMatch:'full'},
    {path:'index', component:SchoolIndexComponent },
    {path:'add',component:SchoolFormComponent, data: { breadcrumb: 'Add' }},
    { path: 'edit/:id', component: SchoolFormComponent, data: { breadcrumb: 'Edit' } },
    { path: 'view/:id', component: SchoolFormComponent, data: { breadcrumb: 'View' } }
  ]},
];

//export const schoolRoutes = RouterModule.forChild(schoolRoutes);
