import { RegtransportComponent } from './byregbus/regtransport/regtransport.component';
import { BynewStudentComponent } from './byregyear/bynew-student/bynew-student.component';
import { CountbysectionComponent } from './bysection/countbysection/countbysection.component';
import { RepNationalindexComponent } from './by-nationality/rep-nationalindex/rep-nationalindex.component';
import { Routes, RouterModule } from '@angular/router';
import { RepIndexComponent } from '../reports/students/rep-index/rep-index.component';
import { CardRepComponent } from './students/card-rep/card-rep.component';
import { RepClassIndexComponent } from './classes/rep-class-index/rep-class-index.component';
import { StudClassComponent } from './classes/stud-class/stud-class.component';
import { FinRepParamsComponent } from './financial/fin-rep-params/fin-rep-params.component';
import { StudstatusbyidComponent } from './status/studstatusbyid/studstatusbyid.component';
import { GetbrothersComponent } from './brothers/getbrothers/getbrothers.component';
import { RepSupplierComponent } from './rep-supplier/rep-supplier/rep-supplier.component';
import { StockRepComponent } from './stockRep/stock-rep/stock-rep.component';
import { invoucherRepComponent } from './inVoucherReport/inVoucherRep/invoucherRep.component';

import { ReportsNamesComponent } from './reports-names/reports-names.component';

import { CoustomerVoucherRepComponent } from './coustomer-voucher-Rep/coustomer-voucher-rep/coustomer-voucher-rep.component';

import { OutvoucherreportComponent } from './outvoucher/outvoucherreport/outvoucherreport.component';
import { RepDailtSaleComponent } from './rep-daily-sale/rep-dailt-sale/rep-dailt-sale.component';
import { PaypriceReportsComponent } from './payprice-reports/payprice-reports.component';
import { RepItemNotReceivedComponent } from './rep-item-not-received/rep-item-not-received.component';
import { IndexSupplierComponent } from '../supplier/index-supplier/index-supplier.component';
import { RepVoucherBySupplierComponent } from './rep-voucher-by-supplier/rep-voucher-by-supplier.component';
import { PayWithOutReceivingBooksComponent } from './pay-with-out-receiving-books/pay-with-out-receiving-books.component';



export const repRoutes: Routes = [
  { path:'',
  children:[ 
    {path:'', redirectTo:'index'},
    { path: 'index', component: RepIndexComponent },
    { path: 'cardRep/:id', component: CardRepComponent },
    { path: 'classIndex', component: RepClassIndexComponent },
    { path: 'classRep', component: StudClassComponent },
    {path:'finIndex', component:FinRepParamsComponent},
    {path:'NationalIndex',component:RepNationalindexComponent},
    {path:'CountIndex' , component:CountbysectionComponent},
    {path:'newStudentindex' , component:BynewStudentComponent},
    {path:'regtransportindex', component:RegtransportComponent},
    {path:'statusindex', component:StudstatusbyidComponent},
    {path:'brothersreport', component:GetbrothersComponent},
    {path:'StockReport',component:StockRepComponent},
    {path:'SupplierReport', component:RepSupplierComponent},
    {path:'stock', component:invoucherRepComponent},
    {path:'stock/:id', component:invoucherRepComponent},
    
    {path:'ReportsNames', component:ReportsNamesComponent},
    {path:'CustomerVoucher Report', component:CoustomerVoucherRepComponent},
    {path:'outvoucher', component:OutvoucherreportComponent},
    {path:'outvoucher/:id', component:OutvoucherreportComponent},
    {path:'dailySale', component:RepDailtSaleComponent},
    {path:'ItemPayPriceReports', component:PaypriceReportsComponent},
    { path: 'IndexSupplier', component: IndexSupplierComponent },
    {path:'Rep-itemNotRecevid', component:RepItemNotReceivedComponent},
    {path:'rep-VoucherBySupplier', component:RepVoucherBySupplierComponent},
    {path:'rep-VoucherBySupplier/:id', component:RepVoucherBySupplierComponent},

    {path:'PayWithOutReceivingBooks', component:PayWithOutReceivingBooksComponent},
    
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
    