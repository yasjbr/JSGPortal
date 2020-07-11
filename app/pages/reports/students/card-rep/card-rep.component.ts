import { RepService } from './../../rep.service';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { users } from 'src/app/Models/Users/users';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { StudentFeeService } from 'src/app/pages/financial/student-fee/student-fee.service';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { PaymentService } from 'src/app/pages/financial/payment/payment.service';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-card-rep',
  templateUrl: './card-rep.component.html',
  styleUrls: ['./card-rep.component.scss']
})
export class CardRepComponent implements OnInit {

  schoolName: any;
  schoolLName: any;
  id: any;   
  loading = false;
  yearId: any;
  image: any;
  schoolId: any;
  name: string;
  DateAndTime = new Date();
  selectedStudData: any = StudCardData;
  studFeesList: any = StudentFee;
  PaymentList: StudentFee[];
  FinStudCardByStudList: finStudCard;

  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private service: RepService,
    private schoolService: SchoolService,
    private finService: StudentFeeService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
  private paymentService: PaymentService) {
    this.PaymentList = [];
    // this.FinStudCardByStudList=[]

    const locale = localStorage.getItem('locale');
    let data: users;
   
    this.currentUserService.user.subscribe(user => data = user);
    this.name = data.username;
    // this.loginService.sUserId = data.id;
    // this.loginService.sSchoolId = data.schoolId;
    // this.loginService.sSchoolName = data.schoolName;
     this.schoolId = data.schoolId;
    this.schoolName = locale === 'ar' ? data.arSchoolName : data.enSchoolName;
    this.schoolName = locale === 'ar' ? data.arSchoolName : data.enSchoolName;
    // this.currentYear = data.yearName;
    this.yearId = data.yearId;
    // let currentUser: users;
    // this.name = currentUser.username;
   }

  ngOnInit() {
    this.getStudData();
  }

  print(div) {
    this.reportsService.print(div);
  }

  //Get Student Data
  getStudData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = +params.id;
      this.service.getStudCardDataVw(this.yearId, this.id).subscribe(res => {
        this.selectedStudData = res;
     console.log(res);
      }, err => console.log(err),
      () => this.loading = false);

      //get Fees
      this.getImage();
      this.GetPaymentList(this.id);
      this.FinStudCardByStud(this.id);
      //this.finService.GetStudFeesDtl(this.yearId, this.id).subscribe(res=>this.studFeesList=res )
    });
  }

  
  GetPaymentList(studId) {
    return this.paymentService
      .GetPaymentList(this.yearId,studId)
      .subscribe(res => { this.PaymentList = res});
  }

   
  FinStudCardByStud(studId) {
    return this.paymentService
      .FinStudCardByStud(this.yearId,studId)
      .subscribe(res => {
        this.FinStudCardByStudList = res[0];      
  });
  }


  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      // this.schoolForm = this.validator.patchForm(this.schoolForm, res);
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
