import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupplierRoutes } from './supplier.routing';
import { IndexSupplierComponent } from './index-supplier/index-supplier.component';
import { SupplierdialogComponent } from './supplierdialog/supplierdialog.component';
import { StockModule } from '../stock/stock.module';

@NgModule({
  declarations: [IndexSupplierComponent ],
  entryComponents:[
    IndexSupplierComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,

    RouterModule.forChild(SupplierRoutes),
  ]
})
export class SupplierModule { }
