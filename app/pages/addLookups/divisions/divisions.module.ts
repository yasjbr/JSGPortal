import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { divisionRoutes } from './divisions.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassdivisionComponent } from './classdivision/classdivision.component';
import { AdddivisionComponent } from './adddivision/adddivision.component';

@NgModule({
  declarations: [ClassdivisionComponent,AdddivisionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(divisionRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
 

})
export class DivisionsModule { }
