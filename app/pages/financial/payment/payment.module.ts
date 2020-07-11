import { MAT_DATE_FORMATS } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PaymentIndexComponent } from './payment-index/payment-index.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { paymentRoutes } from './payment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { MatSelectModule, MatFormFieldModule, DateAdapter } from '@angular/material';
import { AppSettings } from 'src/app/app.settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';
import {  DateFormat, APP_DATE_FORMATS } from './date-format';
import { PrintPaymentComponent } from './print-payment/print-payment.component';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxComboBoxComponent } from 'jqwidgets-ng/jqxcombobox';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'; 
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxInputModule }    from 'jqwidgets-ng/jqxinput';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';


import {
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
  declarations: [
    PaymentIndexComponent,
    PaymentFormComponent,
    PaymentDialogComponent,
    PrintPaymentComponent,

  ],
  entryComponents: [
    PaymentDialogComponent, PaymentFormComponent, PrintPaymentComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(paymentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    // BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    jqxDropDownListModule,
    jqxButtonModule,
    jqxWindowModule,
    jqxInputModule,
    jqxDateTimeInputModule
  ],
  providers: [
    PaymentService, AppSettings, DatePipe,
    { provide: DateAdapter, useClass: DateFormat },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}

  ]
})
export class PaymentModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule);

