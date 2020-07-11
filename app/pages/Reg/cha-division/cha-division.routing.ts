import { ChaStuDivisionComponent } from './chaStudivision/cha-division.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const division: Routes = [{
  path:'',
  children:[
      {path:'',redirectTo:'index'},
      {path:'index',component:ChaStuDivisionComponent},
  ]
}];

