import { AdmFormComponent } from './adm-form/adm-form.component';
import { Routes, RouterModule } from '@angular/router';
import { AdmIndexComponent } from './adm-index/adm-index.component';
import { StudentStatusComponent } from './student-status/student-status.component';
import { studentyear } from 'src/app/Models/Reg/Reports/studentyear';
import { StudyYearComponent } from '../dashboard/study-year/study-year.component';

export const admRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    {path:'index', component:AdmIndexComponent},
    {path: 'add', component: AdmFormComponent },
    {path:'edit/:id', component: AdmFormComponent},
    {path:'index/status', component: StudentStatusComponent},
    {path:'StudyYear', component:StudyYearComponent}
    
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
