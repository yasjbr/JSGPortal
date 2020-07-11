// import { AdmService } from './../../../Admission/adm.service';
import { ClassService } from './../../../addLookups/classes/class.service';
import { RegStudService } from './../reg-stud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSelect } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RegParentService } from '../../parents/reg-parent.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { users } from 'src/app/Models/Users/users';
import { StudRegVw } from 'src/app/Models/Reg/YearlyStudReg/StudRegVw';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { Admission } from 'src/app/Models/Admission/admission';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { log } from 'util';


@Component({
  selector: 'app-reg-stud',
  templateUrl: './reg-stud.component.html',
  styleUrls: ['./reg-stud.component.scss']
})
export class RegStudComponent implements OnInit {




  public displayedColumns =
    ['id', 'firstName', 'className', 'nextSection', 'newClass', 'Division', 'nextClassPrice',
      'tourPrice', 'brotherDescountName', 'descountValue', 'brotherDescountType',
      'approvedId'].concat('actions');
  // public displayedColumns: string[] = this.cols
  // .map(col => col.field)
  // .concat("actions");
  public transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },
    { item: 'Sunscreen', cost: 4 },
    { item: 'Cooler', cost: 25 },
    { item: 'Swim suit', cost: 15 },
  ];

  public modeselect = 'شعبة أ';
  parentList: regParents[];
  filterParents: regParents[];
  parentId: any;
  loading = false;
  selected: any;
   
  classList: lkpClass[];
  newClass: any;
  ConfirmStudRegMsg: any;
  ConfirmStudRegId: any;
  currentYear: any;
  currentYearId: number;
  schoolName: any;
  schoolId: any;
  parentFilterValue: any;
  ParentTable: any;
  sectionList: LkpSection[];
  newClassList: lkpClass[];
  classSeq: Admission[];
  classId: number;
  classFee: any;
   public ssschool:number = 1;
  index: number;
  sectionId: number;
  schoolList: any;
  // cols = [
  //   { field: "id", header: "#" },
  //   { field: "firstName", header: "إسم الطالب " },
  //   { field: "className", header: "  الصف القديم" },
  //   { field: "newClassId", header: "  newClassId" },
  //   { field: "newClassName", header: "  الصف الجديد" },
  //   { field: "classPrice", header: "سعر الصف" },
  //   { field: "studExist", header: "StudExist" },
  //    { field: "tourName", header: " المنطقة" },
  //    { field: "tourTypeName", header: " إشتراك الباص" },
  //    { field: "tourPrice", header: "مبلغ الباص" },
  //    { field: "yearId", header: "yearId" },
  //   // { field: "studentBrotherSeq", header: "ترتيب الابناء" },
  // //  { field: "descountValue", header: "قيمة الخصم" },
  // //  { field: "yearIdx", header: "yearIdx", type: "hidden" },
  // //  { field: "totalPrice", header: "المبلغ المطلوب" },
  // ];
  dataSource: StudRegVw[]; // MatTableDataSource<StudReg>;// = new MatTableDataSource<StudReg>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // public displayedColumns: string[] = this.cols
  //   .map(col => col.field)
  //   .concat("actions");
  @ViewChild('index') employeeId: MatSelect;
  constructor(private service: RegStudService,
    private parentService: RegParentService,
    private classService: ClassService,
    private AdmService: AdmService,
    private schoolService: SchoolService,
    private sectionService: SectionService,
    private currentUserService: CurrentUserService) {

    const locale = localStorage.getItem('locale');

    let data: users;
    this.currentUserService.user.subscribe(user => data = user);

    
    this.schoolName = locale === 'ar' ? data.arSchoolName : data.enSchoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;

    this.getParentList(1);
    this.getClassList();
    this.dataSource = [];
    this.getSectionList();
    this.schoolId = data.schoolId;
    console.log('000000000000000000000 '+ this.schoolId);
    // this.getClassBySection(0);
    // this.getClassSeqList(0);

    // this.onParentChanged(3 + '');
  }

  ngOnInit() {
 
    this.parentFilterValue = null;
    this.getSchoolList();
    this.ssschool = this.schoolId;
    console.log('33333333333333333333333333 '+ this.ssschool);
  }



  getSchoolList() {
    return this.schoolService.schoolList().subscribe(result => this.schoolList = result);
  }

  onSchoolChanges(filterValue: string) {
    this.schoolId = filterValue;
    this.getSectionList();
    this.getData();

  }

  getSectionList() {

    return this.sectionService.sectionList().subscribe(res => {
      this.sectionList = res;
    });
  }

  getClassBySection(sectionId, index) {
    console.log('iii', index);
    this.dataSource[index].sectionId = sectionId;

    this.sectionId = sectionId;
    return this.classService.GetClassBySection(sectionId).subscribe(res => {
      this.newClassList = res;
      console.log(res);

      this.dataSource[index].newClass1 = this.newClassList;
      this.getClassSeqList(index);

    })

  }
  getClassSeqList(index) {


    return this.AdmService.GetStudSClassSeq().subscribe(res => {

      this.classSeq = res;
      this.dataSource[index].newClassSeq = this.classSeq;
    })


  }

  getClassFee(classId, index) {
    console.log('classid', classId, 'iiindex', index);

    //index for set classID
    this.dataSource[index].nextClassId = classId;
    this.dataSource[index].descountValue = 0;
    this.classId = classId;
    return this.service.getClassFee(classId).subscribe(res => {
      this.classFee = res;
      console.log('classfee', this.classFee.result.result.classFee);
      this.dataSource[index].nextClassPrice = this.classFee.result.result.classFee;
      this.dataSource[index].classPrice = this.classFee.result.result.classFee;

      console.log('price ss', this.dataSource[index].nextClassPrice);
      console.log('discount type', this.dataSource[index].brotherDescountType);
      if (this.dataSource[index].brotherDescountType != null) {
        this.dataSource[index].descountValue = this.dataSource[index].nextClassPrice * this.dataSource[index].brotherDescountType / 100;

      }
      console.log('discount value', this.dataSource[index].descountValue);

    })
  }
  // getParentChildrens() {
  //   return this.service.getParentChildrens(this.parentId).subscribe(res =>{
  //     console.log('res',res);

  //     this.dataSource = res
  //   } );
  // }

  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
      this.ParentTable = res;
      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }
  onParentChanged(filterValue: string) {
    this.selected = filterValue;
    this.parentId = filterValue;
    console.log('schoolllllll', this.schoolId);
    this.getData();


  }




  getData() {

    this.service.getParentChildrens(this.parentId, this.schoolId).subscribe(res => {
      console.log('res123', res);
      this.dataSource = res;

      for (let i = 0; i < res.length; i++) {
        this.dataSource[i].section = this.sectionList;

      }


    });
  }

  getClassList() {
    return this.classService
      .classList()
      .subscribe(res => (this.classList = res));
  }

  onClassChange(id: any) {
    const index = this.classList.findIndex(i => i.id === id);
    let xClass;
    if (index !== -1) {
      xClass = this.classList[index].id;
    }
    this.newClass = xClass;
  }
  classSeqId: number;
  onClassSeqChange(classSeqId, index) {
    this.dataSource[index].classSeqId = classSeqId;

  }
  // Confirm the Registration
  confirmStudReg(id, newClassId, index) {
    console.log('year', this.currentYearId);

    this.dataSource[index].studStatusId = 1140;
    console.log('rrrrr', newClassId.sectionId);
    console.log('bbbbb', newClassId.classSeqId, 'price', newClassId.nextClassPrice);
    console.log('new', this.dataSource[index], 'idddd', newClassId.classId);

    return this.service.ConfirmStudReg(id, this.currentYearId, newClassId.nextClassId, newClassId.sectionId, newClassId.classSeqId, newClassId.nextClassPrice, newClassId.descountValue).subscribe(res => {
      this.onParentChanged(this.selected);
    });
  }



  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  getTotalClassPrice() {
    return this.dataSource.map(t => t.nextClassPrice).reduce((acc, value) => acc + value, 0);
  }
  getTotalTourPrice() {
    return this.dataSource.map(t => t.tourPrice).reduce((acc, value) => acc + value, 0);
  }

  getDescountValue() {
    return this.dataSource.map(t => t.descountValue).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.getTotalClassPrice() + this.getTotalTourPrice() - this.getDescountValue();
  }



  // filterParents() {
  //   const ofParentTable = of(this.ParentTable);
  //   ofParentTable
  //     .pipe(
  //       map(x =>
  //         x.filter(
  //           y =>
  //             y.fatherName.includes(this.parentFilterValue) ||
  //             y.id.toString().includes(this.parentFilterValue)
  //         )
  //       )
  //     )
  //     .subscribe(resx => {
  //       (this.parentList = resx);
  //     });

  // }

}


export interface Transaction {
  item: string;
  cost: number;
}
