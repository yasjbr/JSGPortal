import { Routes, RouterModule } from '@angular/router';
import { BusIndexComponent } from './bus-index/bus-index.component';
import { BusformComponent } from './busform/busform.component';


export const busRoutes: Routes = [
  { path:'',
children:[
  {path:'',redirectTo:"index"},
  {path:'index',component:BusIndexComponent},
  {path:'add', component:BusformComponent},
  {path:'edit/:id',component:BusformComponent},
  { path: 'view/:id', component: BusformComponent, data: { breadcrumb: 'View' } }

]
},
];

//export const BusRoutes = RouterModule.forChild(routes);
