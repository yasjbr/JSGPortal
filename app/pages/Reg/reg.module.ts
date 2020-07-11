import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegRoutingModule } from './reg-routing.module';
import { UpdateTourModule } from './update-tour/update-tour.module';

@NgModule({
  imports: [
    CommonModule,
    RegRoutingModule, 
    UpdateTourModule 
  ]
})
export class RegModule { }
