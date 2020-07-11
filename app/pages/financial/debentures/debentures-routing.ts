import { ReceiptComponent } from './receipt/receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routesRecipt: Routes = [
  {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:ReceiptComponent },
]},
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DebenturesRoutingModule { }
