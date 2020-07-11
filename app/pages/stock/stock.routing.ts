import { InVoucherComponent } from './vouchers/in-voucher/in-voucher.component';
import { IndexItemsComponent } from './index-items/index-items.component';
import { Routes } from '@angular/router';
import { OutVoucherComponent } from './vouchers/out-voucher/out-voucher.component';
import { invoucherRepComponent } from '../reports/inVoucherReport/inVoucherRep/invoucherRep.component';
import { OutvoucherreportComponent } from '../reports/outvoucher/outvoucherreport/outvoucherreport.component';
import { ItemPayPriceComponent } from './item-pay-price/item-pay-price.component';
import { ItemNotRecevidComponent } from './vouchers/item-not-recevid/item-not-recevid.component';
import { ReturnedVoucherComponent } from './vouchers/returned-voucher/returned-voucher.component';
import { IndexSupplierComponent } from '../supplier/index-supplier/index-supplier.component';
import { BorrowABookByEmployeeComponent } from './vouchers/borrow-abook-by-employee/borrow-abook-by-employee.component';
import { ReturnBooksComponent } from './return-books/return-books.component';

export const stockRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'index' },
      { path: 'ItemsStock', component: IndexItemsComponent },
      { path: 'InVoucher', component: InVoucherComponent },
      { path: 'OutVoucher', component: OutVoucherComponent },
      { path: 'ItemNotRecevid', component: ItemNotRecevidComponent },
      { path: 'stock/:id', component: invoucherRepComponent },
      { path: 'outvoucher/:id', component: OutvoucherreportComponent },
      { path: 'ItemPayPrice', component: ItemPayPriceComponent },
      { path: 'returnedVoucher', component: ReturnedVoucherComponent },
      { path: 'IndexSupplier', component: IndexSupplierComponent },
      { path: 'BorrowABookByEmployee', component:BorrowABookByEmployeeComponent },
      { path: 'ReturnBooks', component:ReturnBooksComponent},
       
    ]
  },
];
