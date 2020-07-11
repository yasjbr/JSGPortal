
// import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { FinItemService } from 'src/app/pages/financial/fin-item/fin-item.service';
// import { StudentFeeService } from 'src/app/pages/financial/student-fee/student-fee.service';
// import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
// import { users } from 'src/app/Models/Users/users';
// import { DomSanitizer } from '@angular/platform-browser';
// import { ReportsService } from '../../reports.service';
// import { StudentFeeFilter } from 'src/app/Models/financial/student-Fee-Filter';
// import { FormGroup, ControlContainer } from '@angular/forms';
// import { startWith, map, filter } from "rxjs/operators";
// import { CurrentUserService } from 'src/app/shared/services/current-user.service';
// import { CalcFinReport } from 'src/app/Models/financial/Reports/CalcFinReport';

// @Component({
//   selector: 'app-fin-rep',
//   templateUrl: './fin-rep.component.html',
//   styleUrls: ['./fin-rep.component.scss']
// })


// export class FinRepComponent implements OnInit, OnChanges {




//   studentFeesDataSource:CalcFinReport[];
//   ChequeStudentFeesDataSource: any
//   sFinItemId: any
//   @Input() finItemId: number;
//   @Input() studentFeeFilter1: StudentFeeFilter;
//   @Input() parametersForm: StudentFeeFilter;
//   // @Input() finItemDesc: string;


//   schoolId: any;
//   schoolName: any;
//   schoolLName: any;
//   yearId: any;
//   yearName: any;
//   image: any;
//   x: number;
//   studentFeeFilter: StudentFeeFilter;
//   totalChequeValue: any;
//   totalCashValue: any;
//   totalVisaValue: any;

//   repName = "كشف حساب مالي";

//   constructor(private finItemService: FinItemService,
//     private studentFeeService: StudentFeeService,
//     private schoolService: SchoolService,
//     private sanitizer: DomSanitizer,
//     private currentUserService: CurrentUserService,
//     private reportsService: ReportsService) {

//       let currentUser: users;
//     this.currentUserService.user.subscribe(user => currentUser = user);
//     this.schoolId = currentUser.schoolId;
//     this.schoolName = currentUser.arSchoolName;
//     this.yearId = currentUser.yearId;
//     this.yearName = currentUser.yearName;

//     // let data = JSON.parse(localStorage.getItem("token")) as users;
//     // this.schoolId = data.schoolId;
//     // this.schoolName = data.arSchoolName;
//     // this.yearName = data.yearName;
//     // this.yearId = data.yearId;
//   }

//   ngOnInit() {
//     this.sFinItemId = this.finItemService.sFinItemId
//     this.getImage();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     this.getStudentFees()
//   }

//   print(div) {
//     this.reportsService.print(div);
//   }

//   getStudentFees() { 

//   getStudentFees() {
//     console.log("this.parametersForm");
//     console.log(this.parametersForm);


//     this.studentFeeService.GetStudentFeesByParam(this.parametersForm).subscribe(
//       res => {
//         this.studentFeesDataSource = res,
//         //  console.log(res);
//         //   this.ChequeStudentFeesDataSource = this.studentFeesDataSource.filter(fee => fee.paymentMethodId == '1201')
//          console.log(this.studentFeesDataSource);
//          console.log('this.studentFeesDataSource');

//         console.log('this.studentFeesDataSource');
//         console.log(this.studentFeesDataSource);


//         this.totalCashValue = this.studentFeesDataSource
//           .filter(fee => fee.paymentMethodId === 1200)
//           .map(fee => fee.credit)
//           .reduce((acc, value) => acc + value, 0);

//         this.totalChequeValue = this.studentFeesDataSource
//           .filter(fee => fee.paymentMethodId === 1201)
//           .map(fee => fee.credit)
//           .reduce((acc, value) => acc + value, 0);


//         this.totalVisaValue = this.studentFeesDataSource
//           .filter(fee => fee.paymentMethodId === 1202)
//           .map(fee => fee.credit)
//           .reduce((acc, value) => acc + value, 0);

//        // console.log('totalChequeValue');
//         //console.log(this.totalChequeValue);

//       }

//     )
//   }

//   getImage() {
//     this.schoolService.getSchool(this.schoolId).subscribe(res => {
//       let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
//       this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
// })
//   }

// }
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FinItemService } from 'src/app/pages/financial/fin-item/fin-item.service';
import { StudentFeeService } from 'src/app/pages/financial/student-fee/student-fee.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { users } from 'src/app/Models/Users/users';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from '../../reports.service';
import { StudentFeeFilter } from 'src/app/Models/financial/student-Fee-Filter';
import { FormGroup, ControlContainer } from '@angular/forms';
import { startWith, map, filter } from "rxjs/operators"; 
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-fin-rep',
  templateUrl: './fin-rep.component.html',
  styleUrls: ['./fin-rep.component.scss']
})


export class FinRepComponent implements OnInit, OnChanges {
  DateAndTime = new Date();
  name: string;
  constructor(private finItemService: FinItemService,
    private studentFeeService: StudentFeeService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private reportsService: ReportsService,
    private currentUserService: CurrentUserService) {

    let currentUser: users;
    this.currentUserService.user.subscribe(res => currentUser = res);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;


    this.name = currentUser.username;

  }




  studentFeesDataSource: any
  RepStudentFeesByPaymentMethodList: any;
  ChequeStudentFeesDataSource: any
  sFinItemId: any
  @Input() finItemId: number;
  @Input() studentFeeFilter1: StudentFeeFilter;
  @Input() parametersForm: StudentFeeFilter;
  // @Input() finItemDesc: string;


  schoolId: any;
  schoolName: any;
  schoolLName: any;
  yearId: any;
  yearName: any;
  image: any;
  x: number;
  studentFeeFilter: StudentFeeFilter;
  totalChequeValue: any;
  totalCashValue: any;
  totalVisaValue: any;

  repName = "كشف حساب مالي حسب البند المالي";



  totalPaymentMethod: any;

  ngOnInit() {
    this.sFinItemId = this.finItemService.sFinItemId
    this.getImage(); 
    //console.log('reportType='+this.parametersForm.reportType+' -  '+this.parametersForm.payMethod);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('reportType=' + this.parametersForm.reportType + '   finItemId=  ' + this.parametersForm.finItemId);
    if (this.parametersForm.reportType === 1) {
      this.repName = "كشف حساب مالي حسب البند المالي";
      this.getStudentFees();
    }
    if (this.parametersForm.reportType === 4) {
      this.repName = "كشف حساب مالي حسب  طريقة القبض";
      this.RepStudentFeesByPaymentMethod();
    }
  }

  print(div) {
    this.reportsService.print(div);
  }

  getStudentFees() {
    this.studentFeeService.GetStudentFeesByParam(this.parametersForm).subscribe(
      res => {
        this.studentFeesDataSource = res,
          this.totalCashValue = res
            //  .map(fee => fee.credit)
            .reduce((total, value) => total + value.credit, 0);
      }
    );
  }

  RepStudentFeesByPaymentMethod() {
    this.studentFeeService.RepStudentFeesByPaymentMethod(this.parametersForm).subscribe(
      res => {
        this.RepStudentFeesByPaymentMethodList = res;
        this.totalPaymentMethod = res
          //.map(fees => fees.credit)
          .reduce((a, v) => a + v.credit, 0);
      });
  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
