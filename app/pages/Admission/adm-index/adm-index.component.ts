import { AdmParentComponent } from "./../adm-parent/adm-parent.component";
import { AdmDialogComponent } from "./../adm-dialog/adm-dialog.component";
import { regParents } from "./../../../Models/Reg/Parents/reg-parents";
import { RegParentService } from "./../../Reg/parents/reg-parent.service";
import { Admission } from "./../../../Models/Admission/admission";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdmService } from "../adm.service";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { LoginService } from "../../login/login.service";
import { users } from "src/app/Models/Users/users";
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { SchoolService } from '../../addLookups/schools/school.service';
  
@Component({
  selector: "app-adm-index",
  templateUrl: "./adm-index.component.html",
  styleUrls: ["./adm-index.component.scss"]
}) 
export class AdmIndexComponent implements OnInit {
  parentList: regParents[];
  filterParents: regParents[];
  ParentTable: regParents[];
  schoolList: any;
  loading = false;
  parentId: any;
  fatherName: any;
  selected: any;
  ///Father Data
  fatherFirstName: any;
  fatherSecondName: any;
  fatherFamilyName: any;
  idNumS:string;
  fatherReligionName: any;
  fatherNationalityName: any;
  fatherCityName: any;
  fatherAddress: any;
  fatherTel: any;
  fatherMobile: any;
  motherMobile: any;
  showSaveButton: boolean = false;
  showForm: boolean = false;
  classPrice: number;
  totalPrice: number;
  currentYear: any;
  currentYearId: number;
  schoolName: any;
  schoolId: any;
  smsMobile:string;
  parentTotalPrice: number;
  parentTotalDescount: number;
  parentNetTotalAmt: number;
 // idNum:string;
  parentFilterValue: any;
 public  todelete:regParents=null;

 public isret=false


  cols = [
    { field: 'id', header: '#' },
    { field: 'name', header: 'Student name'  },
    { field: 'birthDate', header: 'Birthdate', type: 'date' },
    { field: 'genderName', header: 'Gender' },
    { field: 'className', header: 'Class' },
    { field: 'classPrice', header: 'Study fees' },
    { field: 'classSeqName', header: "Division" },
    { field: 'tourName', header: "Region" },
    { field: 'tourTypeName', header: "Bus subscription type" },
    { field: 'tourPrice', header: "Bus fees" },
    { field: 'studentBrotherSeq', header: "order of children" },
    { field: 'discountType', header: "Discount type" },
    { field: 'discountRate', header: "Discount percentage" , type:"percent"},
    { field: 'totalPrice', header: "Amount required" },


    
  ];

  dataSource: MatTableDataSource<Admission> = new MatTableDataSource<
    Admission
  >();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols
    .map(col => col.field)
    .concat("actions");

  message: string;

  constructor(
    private service: AdmService,
    private parentService: RegParentService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private currentUserService: CurrentUserService,
    private schoolService: SchoolService
  ) {
    this.getParentList(1);
    this.getSchoolList();
  } 

  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }
  ngOnInit() {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.currentYearId = currentUser.yearId; 
    this.service.sCurrentYear = currentUser.yearName;
    this.currentYear = currentUser.yearName;
    this.service.sCurrentYearId = currentUser.yearId;
   // this.schoolId = currentUser.schoolId;

    this.parentFilterValue = null;
    //  this.dataSource.filterPredicate = (data: Admission, filter: string) => {
    //    return data.parentId == +filter;  };
   // this.getCurrentYear();
    //this.currentYear = this.service.sCurrentYear;
    this.service.currentMessage.subscribe(message => (this.message = message));
    this.service.currentParentIdParam.subscribe(p => (this.parentId = p));
  }

  getAdmList() {
    return this.service
      .admissionList()
      .subscribe(res => (this.dataSource.data = res));
  }

  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
      this.filterParents = this.parentList;
      
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }
 
getStudentsList(){
  this.service.getByParentAndSchool(this.parentId, this.schoolId).subscribe(res => {
    this.dataSource.data = res;
    console.log("parent and school",res);
   
  });
}

  onSchoolChanges(filterValue :string)
  {
    this.schoolId=filterValue;
    this.getStudentsList();

  }

  onParentChanged(filterValue: string) {
    this.selected = filterValue;
    this.service.sSelected = filterValue;
    this.parentId = filterValue;
    let x = this.service.changeParentId(this.parentId);
    this.service.sParentId = filterValue;

    this.getStudentsList();
  
    // this.service.getByParentAndSchool(this.parentId, this.schoolId).subscribe(res => {
    //   this.dataSource.data = res;
    //   console.log("parent and school",res);
     
    // });


    this.service.getStudParent(filterValue).subscribe(res => {
      if (res != null) {
   this.todelete=res
   this.isret=true;
        
      console.log('resStu : ',res);
      console.log('resStu : ',this.todelete);
        this.fatherName = res.fullName;
        this.parentId = res.id;
      this.fatherFirstName = res.firstName; 
        this.fatherSecondName = res.secondName;
        this.fatherFamilyName = res.familyName;
        this.fatherReligionName = res.religionName;
        this.fatherNationalityName = res.nationalityName;
        this.fatherCityName = res.cityName;
        this.fatherAddress = res.address;
        this.fatherTel = res.tel;
        this.fatherMobile = res.fatherMobile;
        this.motherMobile = res.motherMobile;
        this.parentTotalPrice = res.parentTotalPrice;
        this.parentTotalDescount = res.parentTotalDescount;
        this.parentNetTotalAmt = res.parentNetTotalAmt;
        this.idNumS=res.idNum;
        this.smsMobile=res.smsMobile

        this.service.sParentName = this.fatherName;
        this.showSaveButton = true;
      }
     
    });
  }

  //Dialog

  addNewStudent() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //   dialogConfig.position = {
    //     'top': '0',
    //     left: '0'
    // };
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, totalPrice: 0 };
    const dialogRef = this.dialog.open(AdmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // res != null ? this.onParentChanged(res.parentId) : "";
      this.calcDescount();
    });
  }

  updateStud(id, totalPrice, yearId: number, elementYear: number) {
    console.log("yearId=" + yearId + "  elementYear=" + elementYear);
    if (yearId != elementYear) return;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: id,
      // classPrice: classPrice,
      totalPrice: totalPrice
    };
    const dialogRef = this.dialog.open(AdmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // res != null ? this.onParentChanged(res.parentId) : "";
      this.calcDescount();
    });
  }
  addNewStudent2() {
    const dialogRef = this.dialog.open(AdmDialogComponent, {
      //data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }
  displayForm(show: boolean) {
    this.showForm = show;
  }

  onSave(data: Admission) {
    this.onParentChanged("" + data.parentId);
  }

  //Delete

  // openDeleteDialog(adm: Admission) {
  //   console.log('admId',adm.id);
    
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: {
  //       name: `${adm.firstName}`,
  //       // name: `${adm.yearId}`
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       this.deleteStudent(adm);
  //     }
  //   });
  // }

  // deleteStudent(adm: Admission) {
  //   this.loading = true;
    
  //   this.service.admDelete(adm.id).subscribe(
  //     res => {
  //       this.handleSuccess();
  //     },
  //     err => {
  //       this.handleErrors(), (this.loading = false);
  //     },
  //     () => (this.loading = false)
  //   );
  // }

  // this.parentId
  private handleSuccess() {
    // this.getAdmList();
    this.onParentChanged(this.parentId);
  }

  private handleErrors() { }

  // Add Parent

  addNewParent() {
    const dialogConfig = new MatDialogConfig();
    var parentName: any;

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //   dialogConfig.position = {
    //     'top': '0',
    //     left: '0'
    // };
    dialogConfig.direction = "rtl";
    // dialogConfig.data = { id: 0, classPrice: 0, totalPrice: 0 };
    const dialogRef = this.dialog.open(AdmParentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      parentName = res.firstName + " " + res.secondName + " " + res.familyName;
      console.log("id=" + res.id + "   parentName=" + parentName);
      this.getParentList(parentName);
      this.calcDescount();
    });
  }

  calcDescount() {
    this.service
      .calcDescount(this.parentId)
      .subscribe(res => this.onParentChanged(this.parentId));
  }

  sumClassPrice() {
    return this.dataSource.data
      .map(t => t.classPrice)
      .reduce((acc, value) => acc + value, 0);
  }
}
