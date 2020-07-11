import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditToursComponent } from './edit-tours/edit-tours.component';
import { RouterModule } from '@angular/router';
import { Tour } from './Tours.routing';
import { ToursComponent } from './tours/tours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EditToursComponent ,ToursComponent],
  entryComponents:[EditToursComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
     SharedModule,
    RouterModule.forChild(Tour),
  ]
})
export class UpdateTourModule { }
