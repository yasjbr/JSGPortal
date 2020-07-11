import { ClassPriceComponent } from './../class-price/class-price.component';
import { LkpSchool } from './../../../../Models/addLookups/schools/lkpSchool';
import { SchoolService } from './../../schools/school.service';
import { ClassService } from './../class.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ifError } from 'assert';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SectionService } from '../../sections/section.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';

@Component({
  selector: 'app-class-index',
  templateUrl: './class-index.component.html',
  styleUrls: ['./class-index.component.scss']
})
export class ClassIndexComponent implements OnInit {

  schoolList: LkpSchool[];

  cols = [
    { field: "id", header: "#" },
    { field: "sectionName", header: "Section" },
    { field: "name", header: "Class Name" },
    { field: "capacity", header: "Class Capacity" },
    { field: "age", header: "Registration age" },
  ];

  dataSource: MatTableDataSource<lkpClass> = new MatTableDataSource<lkpClass>();
  loading = false;
  schoolId: any;
  sectionsList:LkpSection[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');



  constructor(private service: ClassService, private schoolService: SchoolService,
    private sectionService: SectionService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getSchoolList();
    this.getSectionsList();
    // this.getClassList();
    if (this.service.sSchoolId != null) {
      this.onSchoolListChange(this.service.sSchoolId);
    }
  }


  onSchoolChanges(filterValue: string) {
    this.schoolId = filterValue;
    return this.getSectionsList();

  }
  getSchoolList() {
    return this.schoolService.schoolList().subscribe(res => {
      this.schoolList = res;
      
    });
  }

  // getSectionsList(){
  //   return this.sectionService.sectionList(this.schoolId).subscribe(res=>{
  //   this.sectionsList=res;
  //   console.log('res',res);
  //   })
  // }

  getSectionsList() {
    return  this.sectionService.sectionBySchoolList(this.schoolId).subscribe(result => this.sectionsList = result);
  }
  getClassList() {
    return this.service.classList().subscribe(res => this.dataSource.data = res,
      error => { console.log("error Class"); this.dataSource.data = null; },
      () => console.log("Complit"));
  }
  onSchoolListChange(sectionId) {
    this.service.sSchoolId = sectionId;
    this.schoolId = sectionId;

    return this.service.GetClassBySections(sectionId).subscribe(res => {
      this.dataSource.data = res;

    },
      error => {
        console.log("error"); this.dataSource.data = null;
        return false;
      },
      () => console.log("Complit"));
  }

  // Delete
  delete(parent: lkpClass) {
    this.loading = true;
    this.service.deleteClass(parent.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false; },
      () => this.loading = false
    );
  }
 

  openDeleteDialog(model: lkpClass) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.name}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(model);
      }
      this.onSchoolListChange(this.service.sSchoolId);
    });
  }

  private handleSuccess() {
    this.onSchoolListChange(this.service.sSchoolId);
  }

  private handleErrors() {
  }


  openPriceDialog(PclassId, PClassName) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, classId: PclassId, className: PClassName };

    const dialogRef = this.dialog.open(ClassPriceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.handleSuccess();
      // res != null ? this.onParentChanged(res.parentId) : "";
      //  this.calcDescount();
    });


  }

  // addNewStudent() {
  //   const dialogConfig = new MatDialogConfig();

  //   //dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   //   dialogConfig.position = {
  //   //     'top': '0',
  //   //     left: '0'
  //   // };
  //   dialogConfig.direction = "rtl";
  //   dialogConfig.data = { id: 0, totalPrice: 0 };
  //   const dialogRef = this.dialog.open(AdmDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(res => {
  //     // res != null ? this.onParentChanged(res.parentId) : "";
  //     this.calcDescount();
  //   });
  // }


}
