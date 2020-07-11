import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaStuDivisionComponent } from './chaStudivision/cha-division.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { division } from './cha-division.routing';
import { UpdateDivisionComponent } from '../../Reg/cha-division/update-division/update-division.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    ChaStuDivisionComponent, UpdateDivisionComponent,
  ],
  entryComponents:[UpdateDivisionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(division),
    
  ],
 
})
export class ChaDivisionModule { }
