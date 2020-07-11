import { PaymentChequeService } from './../payment-cheque.service';
import { PaymentService } from './../payment.service';
import { RepService } from './../../../reports/rep.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { users } from 'src/app/Models/Users/users';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { DomSanitizer } from '@angular/platform-browser';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { PaymentCheque } from 'src/app/Models/financial/payment-cheque';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-print-payment',
  templateUrl: './print-payment.component.html',
  styleUrls: ['./print-payment.component.scss']
})
export class PrintPaymentComponent implements OnInit {


  constructor(private reportService: ReportsService,
    private sanitizer: DomSanitizer,
    private schoolService: SchoolService,
    private repService: RepService,
    private feesService: PaymentService,
    private paymentDetailedService: PaymentChequeService,
    private currentUserService: CurrentUserService,
    @Inject(MAT_DIALOG_DATA) public studentFee: StudentFee) {

    this.copyNo = ['نسخة ولي الامر', 'نسخة المالية'];

    let data = JSON.parse(localStorage.getItem('token')) as users;

    // //===========in development Mode=====================
    // this.schoolId = data.schoolId;
    // this.schoolName = data.arSchoolName;
    // this.schoolLName = data.schoolLName;
    // this.yearName = data.yearName;
    // this.yearId = data.yearId;
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.schoolLName = currentUser.enSchoolName;
    this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;

  }


  schoolName: any;
  schoolLName: any;
  id: any;
  loading = false;
  yearId: any;
  yearName: any;
  image: any;
  schoolId: any;
  className: any;
  classSeqName: any;
  repId: any;
  repName: any = ' سند قبض'
  newStudList: any[] = [];
  selectedStudData: StudCardData;
  checked1: any = true;
  checked2: any = false;
  checked3: any = false;
  checked4: any = false;
  copyNo: any;
  numberToWord: any;
  orignalCopy: any;


  PaymentList: any;

  ngOnInit() {
    this.getStudData();
  }

  print(div) {
    this.reportService.print(div);
  }

  //Get Student Data

  getStudData() {

    console.log('print');
    console.log(this.studentFee);
    this.id = this.studentFee.studentId;
    console.log(this.studentFee.id);
    this.getImage();

    this.repService.getStudCardDataVw(this.yearId, this.id).subscribe(res => {
      this.selectedStudData = res;
      console.log(res);
    });
    this.GetPaymentList(this.id);

    this.numberToWord = this.studentFee.credit;
    this.orignalCopy = this.feesService.orignalCopy;
    this.GetPaymentMethods();

  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      // this.schoolForm = this.validator.patchForm(this.schoolForm, res);
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  GetPaymentList(studId) {
    console.log('GetPayment studId=' + studId);
    return this.feesService
      .FinStudCardByStud(this.yearId, studId)
      .subscribe(res => { this.PaymentList = res[0] });
  }


  GetPaymentMethods() {

    this.checked1 = false;
    this.checked2 = false;
    this.checked3 = false;
    this.checked4 = false;

    this.paymentDetailedService.getChequesListByPaymentId(this.studentFee.id).subscribe(res => {
      res.map(p => {
        if (p.paymentMethodId === 1200) {
          this.checked1 = true;
        }
        if (p.paymentMethodId === 1201) {
          this.checked2 = true;
        }
        if (p.paymentMethodId === 1203) {
          this.checked3 = true;
        }
        if (p.paymentMethodId === 1202) {
          this.checked4 = true;
        }
      });


      // res.forEach(p => {
      //   if (p.paymentMethodId === 1200) {
      //     this.checked1 = true;
      //   }
      //   if (p.paymentMethodId === 1201) {
      //     this.checked2 = true;
      //   }
      //   if (p.paymentMethodId === 1203) {
      //     this.checked3 = true;
      //   }
      //   if (p.paymentMethodId === 1202) {
      //     this.checked4 = true;
      //   }
      // });
    });

  }



}
