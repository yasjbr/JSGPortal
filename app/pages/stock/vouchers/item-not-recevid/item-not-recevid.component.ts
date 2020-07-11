import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StockService } from '../../stock.service';
import { VoucherService } from '../voucher.service';
import { Items } from 'src/app/Models/Stock/Items';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { MatDialog } from '@angular/material';
import { Admission } from 'src/app/Models/Admission/admission';
import { DialogOverviewExampleDialog } from 'src/app/pages/ui/dialog/dialog.component';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';

@Component({
  selector: 'app-item-not-recevid',
  templateUrl: './item-not-recevid.component.html',
  styleUrls: ['./item-not-recevid.component.scss']
})
export class ItemNotRecevidComponent implements OnInit {
  BookId:any;
  ItemList: any;
  StudStatusList:Admission[];
  ParentId:number=0;
  classId:number=0;
  sectionId:number=0;
  statusId:number=0;
  data:Items[];
  exist:boolean=false;
  bookList: any;
  xBookList: any[] = [];
  studBookList: any;
  schoolId: any;
  yearId: any;
  animal: string;
  studname:string ;
  studId:number;
  GrpId:number;
  sectionList: LkpSection[];
  ClassList:lkpClass[];
  groupList:Items[];
  constructor(
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private stockService: StockService,
    private service: VoucherService,
    private services:StockService,
    private Admservice: AdmService,
    public dialog: MatDialog,
    private sectionService: SectionService,
    private classService: ClassService,
    
    ) 
    
    { 
      let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.yearId = currentUser.yearId;
    }
  ngOnInit() {
  // this.getAllItemsList();
    this.getBookList(0);
    this.sectionListBySchool();
  }

  sectionListBySchool() {
   
    return this.sectionService.sectionListBySchool(this.schoolId)
    .subscribe(res => 
      {
      this.sectionList = res;
      console.log('section list: ',this.sectionList);
      });
}

getClassList(sectionId) {
  this.resetall();
  if(sectionId!=null){
    this.sectionId=sectionId;
  }
  this.classService.GetClassBySection(sectionId).subscribe(res =>{
    this.ClassList = res;
   console.log('Classbysection',this.ClassList);
  } );
  }
  resetall(){
    // this.ParentId=0;
    // this.classId=0;
    // this.sectionId=0;
  }

  print(div) {
    this.reportsService.print(div);
  }

  getBookList(classId) {
    const model = { termId: null, grpId: null, ItemTypeId: null, classId: null, schoolId: this.schoolId, yearId: this.yearId };
    this.service.getBooksList(model,classId).subscribe(res => {
      this.data = res;
      
    });
  }
// ameer(id){
//   console.log(id);
  
//   this.BookId=id;
// }

addItemToAnotherTabel(item){
item.yearId = 6;
item.schoolId = 1;
item.receivedDate = new Date();
item.statusId = 2340; 

this.stockService.addItemToAnotherTabel(item).subscribe(s => {
  // this.getBookList();
})

  }


}
