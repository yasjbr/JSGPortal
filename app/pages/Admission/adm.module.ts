import { AppSettings } from './../../app.settings';
import { Payment } from './../../Models/financial/payment';
import { DateFormat, APP_DATE_FORMATS } from './../financial/payment/date-format';
import { PaymentDialogComponent } from './../financial/payment/payment-dialog/payment-dialog.component';
import { AdmIndexComponent } from './adm-index/adm-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdmService } from './adm.service';
import { admRoutes } from './adm.routing';
import { AdmFormComponent } from './adm-form/adm-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmDialogComponent } from './adm-dialog/adm-dialog.component';
import { LoginService } from '../login/login.service';
import { AdmParentComponent } from './adm-parent/adm-parent.component';
import {
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { StudentStatusComponent} from './student-status/student-status.component';
import { DialogOverviewExampleDialog } from '../ui/dialog/dialog.component';
import { StudyYearComponent } from '../dashboard/study-year/study-year.component';

//import { studentyear } from 'src/app/Models/Reg/Reports/studentyear';

@NgModule({
  declarations: [
   AdmIndexComponent,
   AdmFormComponent,
   AdmDialogComponent,
    AdmParentComponent,
    StudentStatusComponent,
    DialogOverviewExampleDialog,
   // MatSnackBarModule,
    StudyYearComponent
    // studentyear,
    
  ],
  entryComponents:[
    AdmDialogComponent,
    AdmParentComponent,
    StudentStatusComponent,
    DialogOverviewExampleDialog,
  ],
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(admRoutes),
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    // ,
   

  ],
  providers:[AdmService,LoginService, DatePipe,   
    // { provide: DateAdapter, useClass: DateFormat }
     AppSettings, DatePipe,
    { provide: DateAdapter, useClass: DateFormat },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}

  
  ]
  
})
export class AdmModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}
