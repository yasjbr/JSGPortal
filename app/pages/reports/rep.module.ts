import { RegtransportComponent } from './byregbus/regtransport/regtransport.component';
import { BynewStudentComponent } from './byregyear/bynew-student/bynew-student.component';
import { CountbysectionComponent } from './bysection/countbysection/countbysection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudClassComponent } from './classes/stud-class/stud-class.component';
import { RepIndexComponent } from './students/rep-index/rep-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepService } from './rep.service';
import { repRoutes } from './rep.routing';
import { CardRepComponent } from './students/card-rep/card-rep.component';
import { RepClassIndexComponent } from './classes/rep-class-index/rep-class-index.component';
import { RepFinIndexComponent } from './financial/rep-fin-index/rep-fin-index.component';
import { FinRepParamsComponent } from './financial/fin-rep-params/fin-rep-params.component';
import { FinRepComponent } from './financial/fin-rep/fin-rep.component';
import { RemanderFeesComponent } from './financial/remander-fees/remander-fees.component';
import { StudBalanceComponent } from './financial/stud-balance/stud-balance.component';
import { RepNationalindexComponent } from './by-nationality/rep-nationalindex/rep-nationalindex.component';
import { StudstatusbyidComponent } from './status/studstatusbyid/studstatusbyid.component';
import { GetbrothersComponent } from './brothers/getbrothers/getbrothers.component';
import { RepSupplierComponent } from './rep-supplier/rep-supplier/rep-supplier.component';
import { StockRepComponent } from './stockRep/stock-rep/stock-rep.component';
import { invoucherRepComponent } from './inVoucherReport/inVoucherRep/invoucherRep.component';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';



import { CoustomerVoucherRepComponent } from './coustomer-voucher-Rep/coustomer-voucher-rep/coustomer-voucher-rep.component';

import { OutvoucherreportComponent } from './outvoucher/outvoucherreport/outvoucherreport.component';
import { ReportsNamesComponent } from './reports-names/reports-names.component';
import { RepDailtSaleComponent } from './rep-daily-sale/rep-dailt-sale/rep-dailt-sale.component';
import { PaypriceReportsComponent } from './payprice-reports/payprice-reports.component';
import { RepItemNotReceivedComponent } from './rep-item-not-received/rep-item-not-received.component';
import { RepVoucherBySupplierComponent } from './rep-voucher-by-supplier/rep-voucher-by-supplier.component';
import { SupplierModule } from '../supplier/supplier.module';
import { PayWithOutReceivingBooksComponent } from './pay-with-out-receiving-books/pay-with-out-receiving-books.component';



@NgModule({
  declarations: [
    RepIndexComponent,
    CardRepComponent,
    RepClassIndexComponent,
    StudClassComponent,
    RepFinIndexComponent,
    FinRepParamsComponent,
    FinRepComponent,
    RepNationalindexComponent,
    CountbysectionComponent,
    BynewStudentComponent,
    RegtransportComponent,
    RemanderFeesComponent,
    StudBalanceComponent,
    StudstatusbyidComponent,
    GetbrothersComponent,
    RepSupplierComponent,
    StockRepComponent,
    invoucherRepComponent,
    RepItemNotReceivedComponent,
    RepVoucherBySupplierComponent,
    ReportsNamesComponent,
    CoustomerVoucherRepComponent,
    OutvoucherreportComponent,
    RepDailtSaleComponent,
    PaypriceReportsComponent,
    PayWithOutReceivingBooksComponent,
    

    

  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    SharedModule,
      SupplierModule,
    RouterModule.forChild(repRoutes),
    ReactiveFormsModule

  ],
  providers: [RepService]
})
export class RepModule { }
