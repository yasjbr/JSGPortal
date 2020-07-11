import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RemanderFeesFilter } from 'src/app/Models/financial/Reports/RemanderFeesFilter';
import { RemanderFees } from 'src/app/Models/financial/Reports/RemanderFees';
import { FinReportService } from 'src/app/pages/financial/finReport.service';
import { ReportsService } from '../../reports.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { finStudCard } from 'src/app/Models/financial/finStudCard';

@Component({
  selector: 'app-stud-balance',
  templateUrl: './stud-balance.component.html',
  styleUrls: ['./stud-balance.component.scss']
})
export class StudBalanceComponent implements OnInit {

  loading = false;

  totalOldBalance: any;
  totalS6: any;
  totalS7: any;
  totalS8: any;
  totalSumCredit: any;
  totalSumDepit: any;
  totalAmtRemainder: any;
  totalClassPrice: any;

  @Input() parametersForm: RemanderFeesFilter;

  dataSource: finStudCard[];
  schoolId: any;
  schoolName: any;
  schoolLName: any;
  yearId: any;
  yearName: any;
  image: any;

  repName = 'ذمم الطلبة';

  constructor(private finReportService: FinReportService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService) {


    let currentUser: users;
    this.currentUserService.user.subscribe(res => currentUser = res);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;

  }

  ngOnInit() {
    this.getImage();
    this.getRemanderFees();

  }

  sectionName: any;
  className: any;
  index = -1;
  getRemanderFees() {
    // console.log(this.parametersForm);
    return this.finReportService.GetFinStudCardSummaryReport(this.parametersForm).subscribe(res => {
      this.dataSource = res;
      this.sectionName = res[0] ? res[0].sectionName : "";
      this.className = res[0] ? res[0].className : "";

      this.index++;

      // console.log(res);
      this.getTotalS7();

    });
  }

  print(div) {
    this.reportsService.print(div);
  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      const objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.getRemanderFees();
  }



  getTotalS7() {

   // this.totalClassPrice = this.dataSource[val].studInfo.map(t => t.classPrice).reduce((acc, value) => acc + value, 0);
    //  this.totalOldBalance = this.dataSource[val].studInfo.map(t => t.s10).reduce((acc, value) => acc + value, 0);
    // this.totalS8 = this.dataSource[val].studInfo.map(t => t.s8).reduce((acc, value) => acc + value, 0);
    // this.totalS6 = this.dataSource[val].studInfo.map(t => t.s6).reduce((acc, value) => acc + value, 0);
    // this.totalS7 = this.dataSource[val].studInfo.map(t => t.s7 - t.s6).reduce((acc, value) => acc + value, 0);
    // this.totalSumCredit = this.dataSource[val].studInfo.map(t => t.sumCredit).reduce((acc, value) => acc + value, 0);
    // this.totalAmtRemainder = this.dataSource[val].studInfo.map(t => t.amtRemainder).reduce((acc, value) => acc + value, 0);
    // this.totalSumDepit = this.dataSource[val].studInfo.map(t => t.sumDepit).reduce((acc, value) => acc + value, 0);
    // return this.totalS7;
  }
}
