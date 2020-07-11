import { Component, OnInit, ViewChild } from '@angular/core';
import { VoucherService } from 'src/app/pages/stock/vouchers/voucher.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../../reports.service';
import { coustmservice } from '../../coustomer-voucher-Rep/coustomer-voucher-rep/coustmservice';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { StudentFeeFilter } from 'src/app/Models/financial/student-Fee-Filter';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { users } from 'src/app/Models/Users/users';
@Component({
  selector: 'app-rep-dailt-sale',
  templateUrl: './rep-dailt-sale.component.html',
  styleUrls: ['./rep-dailt-sale.component.scss']
})
export class RepDailtSaleComponent implements OnInit {
  dataSource: any[];
  loading = false;
  date: any;
  err=true;
  coustmservice: coustmservice[];
  StudentFeeFilter: StudentFeeFilter[]
  yearId: number = 0;
  Id: number;
  parentName: string;
  public DateAndTime = new Date();
  parentId: any;
  selected: any;
  image: any;
  schoolId: any;
  name: string;
  Total: number;
  Total2: number;
  constructor(
    private VoucherService: VoucherService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private dialog: MatDialog,
  ) {
    // this.dataSource = new MatTableDataSource<coustmservice>();
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
  }
  ngOnInit() {
 this.GetCustmVoucherbyyears(new Date());
    // this.GetCustmVoucherbyyears(null,null);
    this.getImage();


  }



  GetCustmVoucherbyyears(voucherDate) {
    this.date = voucherDate.toISOString();

 this.Total2=null;
 this.err=true;
    return this.VoucherService.GetCustmVoucherbyyears(this.date).subscribe(res => {
      this.StudentFeeFilter = res;
      if(this.StudentFeeFilter.length>0){
        console.log('ff',  this.StudentFeeFilter);
        this.err=false;
        this.StudentFeeFilter = res;
        this.Total2=this.getTotal();
      }
  
    }, err => {
      console.log("err");
    });
  }



getTotal(){
  let Total=0;
  for(let i =0 ; i< this.StudentFeeFilter.length;i++){
     Total += this.StudentFeeFilter[i]["totalAmount"]
  }
  return Total;
}
  print(div) {
    this.reportsService.print(div);
  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
