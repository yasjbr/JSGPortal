import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudMarkIndexComponent } from './stud-mark-index/stud-mark-index.component';
import { StudCertificateComponent } from './Stud-certificate/stud-certificate.component';
 

export const studMarkRoutes: Routes = [
  {
    path:'',
    children: 
    [
      {path:'',redirectTo:'index',pathMatch:'full'},
      {path:'index',component:StudMarkIndexComponent},
      {path:'certificate/:id',component:StudCertificateComponent}
    ]
  }  
];

 