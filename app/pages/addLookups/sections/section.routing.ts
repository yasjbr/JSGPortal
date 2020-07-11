import { SectionFormComponent } from './section-form/section-form.component';
import { SectionIndexComponent } from './section-index/section-index.component';

import { Routes, RouterModule } from '@angular/router';

export const sectionRoutes: Routes = [
  { path:'',
children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:SectionIndexComponent },
  {path:'add', component:SectionFormComponent},
  {path:'edit/:id',component:SectionFormComponent},
  { path: 'view/:id', component: SectionFormComponent, data: { breadcrumb: 'View' } }

]},
];

//export const SectionRoutes = RouterModule.forChild(routes);
