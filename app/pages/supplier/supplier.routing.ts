import { Routes } from '@angular/router';
import { IndexSupplierComponent } from './index-supplier/index-supplier.component';

export const SupplierRoutes: Routes = [
    { path:'',
    children:[ 
      {path:'Stock', redirectTo:'index'},
      { path: 'IndexSupplier', component: IndexSupplierComponent },
     
    ]
   },
  ];