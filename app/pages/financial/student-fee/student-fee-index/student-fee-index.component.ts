
import { regParents } from './../../../../Models/Reg/Parents/reg-parents';
import { Component, OnInit, ViewChild } from "@angular/core";
import { StudentFee } from "src/app/Models/financial/student-fee";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { FinItemService } from "../../fin-item/fin-item.service";
import { FinItem } from "src/app/Models/financial/fin-item";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { StudentFeeService } from "../student-fee.service";
import { RegParentService } from "src/app/pages/Reg/parents/reg-parent.service";
import { users } from 'src/app/Models/Users/users';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: "app-student-fee-index",
  templateUrl: "./student-fee-index.component.html",
  styleUrls: ["./student-fee-index.component.scss"]
})
export class StudentFeeIndexComponent implements OnInit {
  dataSource: MatTableDataSource<StudentFee>;
  dataSourceDtl: MatTableDataSource<StudentFee>;
  dataSourceFinstudCard: MatTableDataSource<finStudCard>;
  dataSource2: any;
  loading = false;
  finItemList: any;

  parentList: regParents[];

  filterParents: regParents[];

  selected: any;
  parentId: any;
  studName: any;
  parentName: any;

  currentYear: any;
  currentYearId: number;
  schoolName: any;
  schoolId: any;
  parentFilterValue: any;
  ngxParentList: regParents[];

  cols = [
    { field: "studentId", header: "#" },
    //{ field: "studentName", header: "  الطالب    " },
    { field: "debit", header: "عليه  " },
    { field: "credit", header: " له " },
    { field: "total", header: "  المجموع   " }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');


  colsDtl = [
    { field: "finItemName", header: "  البند المالي " },
    { field: "debit", header: "عليه  " },
    { field: "credit", header: " له " },
  ];
  @ViewChild(MatPaginator) paginatorDtl: MatPaginator;
  public displayedColumnsDtl: string[] = this.colsDtl.map(col => col.field);

 
  colsCard = [
    { field: "firstName", header: "إسم الطالب" },
    // { field: "s9", header: "  الخصومات (إذا وجدت) " },
    { field: "brotherDescountRate", header: "نسبة الخصم" ,type: "percent" },
    { field: "brotherDescountName", header: "نوع الخصم"},
    { field: "s10", header: "الرصيد السابق  " },
    { field: "s6", header: "  رسوم التسجيل " },
    { field: "s7", header: "  الرسوم الدراسية " },
    { field: "s8", header: " رسوم الباص " },
    { field: "sumDepit", header: "  مجموع الرسوم " },
    { field: "sumCredit", header: "  مجموع المدفوعات " },
    { field: "amtRemainder", header: "  المبلغ المتبقي " }


  ];
  @ViewChild(MatPaginator) paginatorCard: MatPaginator;
  public displayedColumnsCard: string[] = this.colsCard.map(col => col.field).concat('actions');

  constructor(
    private service: StudentFeeService,
    private dialog: MatDialog,
    private studentFeeService: StudentFeeService,
    private parentService: RegParentService,
    private currentUserService: CurrentUserService

  ) {
    this.getParentList(1);
    this.dataSource = new MatTableDataSource<StudentFee>();
    this.dataSourceDtl = new MatTableDataSource<StudentFee>();
    this.dataSourceFinstudCard = new MatTableDataSource<finStudCard>();



    const locale = localStorage.getItem('locale');
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.schoolName = locale === 'ar' ? currentUser.arSchoolName : currentUser.enSchoolName;
    this.currentYearId = currentUser.yearId;
    this.currentYear = currentUser.yearName;

    // this.studentFeeService.sYearId = currentUser.yearId;
    // this.studentFeeService.selectedYearId = this.currentYearId;

  }

  getStudentFeeList() {
    this.service.getStudentFeeList().subscribe(
      result => {
        (this.dataSource.data = result), (this.dataSource2 = result);
      },
      err => console.log("error in getStudentFeeList"),
      () => console.log("Comlit getStudentFeeList")
    );
  }

  GetStudFeesListByParent(id) {
    return this.service
      .GetStudFeesListByParent(this.currentYearId, id)
      .subscribe(res => {
        this.dataSource.data = res;

      });
  }

  GetStudFeesDtl(studId, studName) {
    return this.service
      .GetStudFeesDtl(this.currentYearId, studId)
      .subscribe(res => {
        this.dataSourceDtl.data = res

        let name = studName + " " + this.parentName
        this.studName = name;

      });
  }

  getFinStudCard() {
    return this.service.FinStdCard(this.currentYearId, this.parentId).subscribe(res => this.dataSourceFinstudCard.data = res);
  }


  // getParentList() {
  //   return this.parentService.getParentsList().subscribe(res => {
  //     this.parentList = res;
  //     this.ngxParentList = res;

  //   });
  // }


  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
      // this.ParentTable = res;
      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }

  onParentChanged(filterValue) {
    this.selected = filterValue;
    this.parentId = filterValue;
    this.getFinStudCard();
    this.service.GetStudFeesListByParent(this.currentYearId, filterValue).subscribe(res => {
      this.dataSource.data = res;
      let index = this.parentList.findIndex(p => p.id === this.parentId)
      this.parentName = this.parentList[index].fatherName;
      // let name=res[0].studentName+" "+this.parentName
      this.GetStudFeesDtl(res[0].studentId, "")
      console.log("index=" + index + "  parentId=" + this.parentId + "  name=" + name)
    });
  }

  deleteStudentFee(studentFee: StudentFee) {
    this.loading = true;
    this.service.deleteStudentFee(studentFee.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors(), (this.loading = false);
      },
      () => (this.loading = false)
    );
  }

  openDeleteDialog(model: StudentFee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.finItemId}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStudentFee(model);
      }
    });
  }

  onLookupChanged(filterValue: string) {
    this.dataSource.filter = filterValue + "";
  }

  private handleSuccess() {
    this.getStudentFeeList();
  }

  private handleErrors() { }

  ngOnInit() {
    this.parentFilterValue = null;
    // this.getStudentFeeList();
  }


  // filterParents() {
  //   const ngxParentTable = of(this.ngxParentList);
  //   console.log(this.parentFilterValue);
  //   console.log(ngxParentTable);
  //   ngxParentTable.pipe(
  //     map(p => p.filter(x => x.fatherName.includes(this.parentFilterValue) ||
  //       x.id.toString().includes(this.parentFilterValue)))
  //   ).subscribe(res=>this.parentList=res)

  // }
}
