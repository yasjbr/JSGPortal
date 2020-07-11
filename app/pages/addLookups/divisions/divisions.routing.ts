

import { Routes, RouterModule } from '@angular/router';
import { AdddivisionComponent } from './adddivision/adddivision.component';
import { ClassdivisionComponent } from './classdivision/classdivision.component';


export const divisionRoutes: Routes = [
  {path:'',
  children:[
    {path:'', redirectTo:'index',pathMatch:'full'},
    {path:'index', component:ClassdivisionComponent },
    {path:'add',component:AdddivisionComponent, data: { breadcrumb: 'Add' }},
  
  ]},
];

