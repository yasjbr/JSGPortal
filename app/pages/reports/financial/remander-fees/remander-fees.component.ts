import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { RemanderFeesFilter } from 'src/app/Models/financial/Reports/RemanderFeesFilter';
import { FinReportService } from 'src/app/pages/financial/finReport.service';
import { ReportsService } from '../../reports.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { RemanderFees } from 'src/app/Models/financial/Reports/RemanderFees';
import { pipe, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { element, getHostElement, getComponent } from '@angular/core/src/render3';

@Component({
  selector: 'app-remander-fees',
  templateUrl: './remander-fees.component.html',
  styleUrls: ['./remander-fees.component.scss']
})
export class RemanderFeesComponent implements OnInit {

  @Input() parametersForm: RemanderFeesFilter;
  @ViewChild('pageRemanderFees') content: ElementRef;

  dataSource: finStudCard[];
  schoolId: any;
  schoolName: any;
  schoolLName: any;
  sectionName: any;
  className: any;
  yearId: any;
  yearName: any;
  image: any;


  totalS7: any;
  totalS8: any;
  totalSumCredit: any;
  totalSumDepit: any;
  totalAmtRemainder: any;

  page: any;

  meta: Meta;

  repName = "تقرير الاقساط المتبقية";

  constructor(private finReportService: FinReportService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
    private _elementRef: ElementRef) {


    let currentUser: users;
    this.currentUserService.user.subscribe(res => currentUser = res);
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;

  }

  ngOnInit() {
    this.getImage();
    // this.getRemanderFees();

  }

  // arr: finStudCard[];

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


  getTotalS7() {
    this.totalS8 = this.dataSource.map(t => t.s8).reduce((acc, value) => acc + value, 0);
    this.totalS7 = this.dataSource.map(t => t.s7).reduce((acc, value) => acc + value, 0);
    this.totalSumCredit = this.dataSource.map(t => t.sumCredit).reduce((acc, value) => acc + value, 0);
    this.totalAmtRemainder = this.dataSource.map(t => t.amtRemainder).reduce((acc, value) => acc + value, 0);
    this.totalSumDepit = this.dataSource.map(t => t.sumDepit).reduce((acc, value) => acc + value, 0);

  }

  print() {

    // let xDiv = document.getElementsByTagName("pageRemanderFees").namedItem("pageRemanderFees") as HTMLElement;
    //console.log(div);
    // let x = angular.element("#testDiv");
    // let domElement = this._elementRef.nativeElement.querySelector(`pageRemanderFees`);
    // console.log(domElement);
    // this.reportsService.print(domElement);
    let div = this.content.nativeElement;
    // console.log(div);
    this.reportsService.print(div);
  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getRemanderFees();
  }



}
