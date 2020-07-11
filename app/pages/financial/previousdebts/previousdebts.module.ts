import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviousdebtsComponent } from './previousdebts.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { previousdebtsRoutes } from './previousdebts.routing';
@NgModule({
  declarations: [PreviousdebtsComponent],
  imports: [
    CommonModule,
   
    SharedModule,
    RouterModule.forChild(previousdebtsRoutes),
  ]
})
export class PreviousdebtsModule { }
