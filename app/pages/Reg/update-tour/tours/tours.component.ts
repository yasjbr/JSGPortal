import { Component, OnInit, ViewChild } from '@angular/core';
import { RegParentService } from '../../parents/reg-parent.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { ChaStuDivService } from '../../cha-division/cha-stu-div.service';
import { MatTableDataSource, MatSelect, MatDialogConfig, MatDialog } from '@angular/material';
import { Admission } from 'src/app/Models/Admission/admission';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { UpdateDivisionComponent } from '../../cha-division/update-division/update-division.component';
import { EditToursComponent } from '../edit-tours/edit-tours.component';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
@ViewChild('_parentId')_parentId:MatSelect;
  parentList: any;
  filterParents: regParents[];
  parentId: any;
  selected: any;
  schoolId: any;
  studTourList:any;
  currentYearId: number;
  filterTour: any[];
  dataSource: MatTableDataSource<Admission[]> = new MatTableDataSource<Admission[]>();
  loading = false;
  cols = [
    { field: "idYearly", header: "#" },
    { field: "studName", header: "Student name" },
    { field: "tourName", header: "Tour Place" },
    { field: "tourType", header: "Tour Type" },
    { field: "tourPrice", header: "CostPrice" }
  ];
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('Actions');

  constructor(
    private parentService: RegParentService,
    private ChaStuDivServices: ChaStuDivService,
    private serviceby: AdmService,
    private currentUserService: CurrentUserService,
    private lookup: LookupsApiService,
    public dialog: MatDialog,
  ) { }



  ngOnInit() {
    this.getParentList(1);
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.currentYearId = currentUser.yearId;
    this.schoolId = currentUser.schoolId;
  }

  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;

      // console.log('resault parent', res);

      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      // if (index != -1) {
      //   this.selected = this.parentList[index].id;
      //   // this.onParentChanged( this.selected);
      // }
    });
  }


  getStudTour() {
    return this.lookup.getLookupsByType(35).subscribe(res => {
      this.studTourList = res;
      this.filterTour= this.studTourList;
      console.log('filterTour =', this.filterTour);
      let index = this.studTourList.findIndex(i => i.classSeqName === this._parentId.value);
      if (index != -1) {
        //  this.DivSelectedName=this.DivisionList[index].id;
        // this.onDivisionChanged(this.DivSelectedId);
      }
    });
  }

  onParentChanged() {
    console.log('parentId=' + this._parentId.value);
    this.ChaStuDivServices.sParentId = this._parentId.value;
    this.dataSource.filter = this._parentId.value + "";
    this.getStudentList(this._parentId.value, this.schoolId);
  }
  getStudentList(parentId: any, schoolId: number) {
    this.parentId = parentId;
    return this.serviceby.getdataByParentAndSchool(parentId, schoolId).subscribe(res => {
      this.dataSource = res;
      console.log("parent and school" + res);
    });

  }

  Edite(studId) {
    console.log("studentId=" + studId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      studentId: studId,
    };
    const dialogRef = this.dialog.open(EditToursComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.handleSuccess();
      console.log("Division Id = ", studId);
      this.getStudentList(this._parentId.value, this.schoolId);

    });
    dialogRef.afterClosed();
  }
   
  private handleSuccess() {
   // this.onParentChanged(this.parentId);
  }
}
