
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusIndexComponent } from './bus-index/bus-index.component';
import { busRoutes } from './bus.routing';
import { BusformComponent } from './busform/busform.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BusIndexComponent,
    BusformComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(busRoutes)
  ]
})
export class BusModule { }
