import { Routes } from '@angular/router';
import { ToursComponent } from './tours/tours.component';


export const Tour: Routes = [{
  path:'',
  children:[
      {path:'',redirectTo:'index'},
      {path:'Tours',component:ToursComponent},
  ]
}];

