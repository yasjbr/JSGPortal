import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectCheckAllComponent } from './mat-select-check-all.component';
import { MatSelectModule, MatCheckboxModule } from '@angular/material';

@NgModule({
 imports: [
    CommonModule, MatSelectModule, MatCheckboxModule
  ],
  exports: [
    MatSelectModule, MatCheckboxModule // , MatSelectCheckAllComponent
  ],
  // declarations: [MatSelectCheckAllComponent]
})
export class MatSelectCheckAllModule { }
