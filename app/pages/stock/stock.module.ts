import { VoucherService } from './vouchers/voucher.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexItemsComponent } from './index-items/index-items.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { stockRoutes } from './stock.routing';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InVoucherComponent } from './vouchers/in-voucher/in-voucher.component';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { AddInVoucherComponent } from './vouchers/in-voucher/add-in-voucher/add-in-voucher.component'; 
import { jqxComboBoxModule }    from 'jqwidgets-ng/jqxcombobox';
import { OutVoucherComponent } from './vouchers/out-voucher/out-voucher.component';
import { RepModule } from '../reports/rep.module';
import { ItemPayPriceComponent } from './item-pay-price/item-pay-price.component';
import { ItemNotRecevidComponent } from './vouchers/item-not-recevid/item-not-recevid.component';
import { ReturnedVoucherComponent } from './vouchers/returned-voucher/returned-voucher.component';
import { IndexSupplierComponent } from '../supplier/index-supplier/index-supplier.component';
import { SupplierdialogComponent } from '../supplier/supplierdialog/supplierdialog.component';
import { SupplierModule } from '../supplier/supplier.module';
import { BorrowABookByEmployeeComponent } from './vouchers/borrow-abook-by-employee/borrow-abook-by-employee.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
 //import { invoucherRepComponent } from '../reports/inVoucherReport/inVoucherRep/invoucherRep.component';

@NgModule({
  declarations: [IndexItemsComponent,
     AddItemComponent, 
     InVoucherComponent,
     ItemNotRecevidComponent,
    AddInVoucherComponent,
    SupplierdialogComponent,
    OutVoucherComponent,
    ItemPayPriceComponent,
    ReturnedVoucherComponent,
    BorrowABookByEmployeeComponent,
    ReturnBooksComponent
  ],
  
  entryComponents:[
    AddItemComponent,
    AddInVoucherComponent,
    SupplierdialogComponent,
   
  
  ],

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SupplierModule,
     RouterModule.forChild(stockRoutes),
    jqxDropDownListModule,
    RepModule],
    
  providers: [VoucherService] 
  
   
})
export class StockModule { }
