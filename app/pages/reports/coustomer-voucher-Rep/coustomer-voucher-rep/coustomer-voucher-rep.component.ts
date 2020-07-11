import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Models/Reg/Students/students';
import { RepService } from '../../rep.service';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { coustmservice } from './coustmservice';
import { VoucherService } from 'src/app/pages/stock/vouchers/voucher.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../../reports.service';
@Component({
  selector: 'app-coustomer-voucher-rep',
  templateUrl: './coustomer-voucher-rep.component.html',
  styleUrls: ['./coustomer-voucher-rep.component.scss']
})
export class CoustomerVoucherRepComponent implements OnInit {
  yearId: number=0;
  Id:number;
  parentName: string;
  filterParents: regParents[];
  public DateAndTime=new Date(); 
  parentList: regParents[];
  LKpYear: LkpYear[];
  coustmservice: coustmservice[];
  parentId: any;
  selected: any;
  image: any;
  schoolId: any;
  name: string;
  Total:number;
  
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private service: StudentService, private parentService: RegParentService,
    private repService: RepService,
    private YearService: YearService,
    private VoucherService: VoucherService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
  ){
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name= currentUser.username;
    this.schoolId = currentUser.schoolId;
   }

  ngOnInit() {
    this.getParentList(1);
    this.getImage(); 
  }
  getParentList(id) {
this.Id=id;
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
console.log('pppppp',res);
    });
  }

  print(div) {
    this.reportsService.print(div);
  }

  getYearsList(id) {
    // this.getini();
    this.yearId = id;
    return this.YearService.getYearsList().subscribe(res =>
      {
        this.LKpYear = res;
        console.log('yearId', this.yearId);
      });
  }

  GetCustmVoucherbyparentname() {
    this.getini();
    console.log('yyyyyyyy',this.yearId);
    return this.VoucherService.GetCustmVoucherbyparentname(this.Id,this.yearId).subscribe(res => {
      this.coustmservice = res;
      this.parentName = this.coustmservice[0].parentName;
      this.parentId = this.coustmservice[0].parentId;
      this.Total=this.getTotal();
    },err=>{
      console.log("err");
    });
  }
  getini(){
    this.parentName=' ';
    this.parentId=0;
    this.coustmservice=[];
  }


  getTotal() {
    let total = 0;
    for (let i = 0; i < this.coustmservice.length; i++) {
      // console.log("res = ", this.StudentCountList[i].studCount);
      total += this.coustmservice[i].amount;  
    }
    return total;
  }



  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  

}






