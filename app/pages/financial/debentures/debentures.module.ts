import { routesRecipt } from './debentures-routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptComponent } from './receipt/receipt.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ReceiptComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesRecipt),
    FormsModule,
    ReactiveFormsModule

  ],
 
})
export class DebenturesModule { }
