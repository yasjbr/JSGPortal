import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Student } from 'src/app/Models/Reg/Students/students';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { RepService } from 'src/app/pages/reports/rep.service';
//import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { coustmservice } from 'src/app/pages/reports/coustomer-voucher-Rep/coustomer-voucher-rep/coustmservice';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { VoucherService } from 'src/app/pages/stock/vouchers/voucher.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { DialogOverviewExampleDialog } from 'src/app/pages/ui/dialog/dialog.component';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-returned-voucher',
  templateUrl: './returned-voucher.component.html',
  styleUrls: ['./returned-voucher.component.scss']
})
export class ReturnedVoucherComponent implements OnInit {
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
  ParentId:number=0;
  exist:boolean=false;
  schoolName:any;
  cancelyear:Date;
  studname:string ;
  studId:number;
  
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private service: StudentService, private parentService: RegParentService,
    private repService: RepService,
    private YearService: YearService,
    private VoucherService: VoucherService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private Admservice: AdmService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    public dialog: MatDialog,
  ){
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name= currentUser.username;
    this.schoolId = currentUser.schoolId;
   }

  ngOnInit() {
    this.getParentList();
    this.getImage();
   
  }
  getParentList() {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
    });
  }

  print(div) {
    this.reportsService.print(div);
  }

  getYearsList(dateId) {

    this.yearId=dateId;
    return this.YearService.getYearsList().subscribe(res =>
      {
        this.LKpYear = res;
        console.log('yearId', this.yearId);
      });
  }

  GetCustmVoucherbyparentname(id) {
 this.getYearsList(0);
    return this.VoucherService.GetCustmVoucherbyparentname(id,this.yearId).subscribe(res => {
      this.coustmservice = res;
     
      
      this.parentName = this.coustmservice[0].parentName;
      this.parentId = this.coustmservice[0].parentId;
    //  this.Total=this.getTotal();
    },err=>{
      console.log("err");
    });
  }
    getStatusList(parentid){
      if(parentid!=null){
        this.ParentId=parentid;
      }
      this.VoucherService.GetVoucherStatus().subscribe(res=>{
        
        this.coustmservice=res;
         
        //  console.log('parentID='+this.ParentId)
      
      })
    }


    returnedVoucher(x){
    //console.log('yearid',this.yearId);
    this.GetCustmVoucherbyparentname(0);
    //console.log('xin html',x.voucherId);
  //  console.log('id ameer',this.Id);

    this.VoucherService.returnedVoucher(x.voucherId).subscribe(res=>{
    });
    this.GetCustmVoucherbyparentname(0);
  }


  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
