import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admission } from 'src/app/Models/Admission/admission';
import { SectionService } from '../../addLookups/sections/section.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { ClassService } from '../../addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { RegParentService } from '../../Reg/parents/reg-parent.service';
import { Parents } from 'src/app/Models/Reg/Parents/parents';
import { AdmService } from '../adm.service';
import { status } from 'src/app/Models/Admission/status';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { DialogOverviewExampleDialog } from '../../ui/dialog/dialog.component';
import { MatSelect } from '@angular/material';
import { SchoolService } from '../../addLookups/schools/school.service';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-student-status',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.scss']
})
export class StudentStatusComponent implements OnInit {
  @ViewChild('_sectionId') _sectionId: MatSelect;
  @ViewChild('_ClassId') _ClassId: MatSelect;
  @ViewChild('_ParentId') _ParentId: MatSelect;
  @ViewChild('_statusId') _statusId: MatSelect;

  statusList: status[];
  exist: boolean = false;
  ParentId: number = 0;
  classId: number = 0;
  sectionId: number = 0;
  statusId: number = 0;
  StudStatusList: Admission[];
  sectionList: LkpSection[];
  ClassList: lkpClass[];
  parentList: regParents[];
  name: string;
  schoolId: any;
  schoolName: any;
  schoolList: any;
  yearId: any;
  cancelyear: Date;
  animal: string;
  studname: string;
  studId: number;

  defaultSchoolId:number;
  constructor(
    private currentUserService: CurrentUserService,
    private sectionService: SectionService,
    private classService: ClassService,
    private ParentService: RegParentService,
    private Admservice: AdmService,
    public dialog: MatDialog,
    private schoolService: SchoolService
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    // this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.defaultSchoolId = Number(currentUser.schoolId);
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
  }

  ngOnInit() {
    this.getSchoolList();
    this.sectionListBySchool();
    this.getClassList();
    this.getParentList();
    this.getStatusList();
  }

  onSchoolChanges(filterValue: string) {
    this.schoolId = filterValue;
    this.getStudStatus();
    this.sectionListBySchool();
  }

  getSchoolList() {
    return this.schoolService.schoolList().subscribe(result => this.schoolList = result);
  }

  sectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.schoolId).subscribe(res => {
      this.sectionList = res;
    });
  }

  getClassList() {
    this.resetall();
    if (this._sectionId.value != null && this._sectionId.value != 0) {
      this.sectionId = this._sectionId.value;
    }
    else {
      this.sectionId = 2;
    }
    this.classService.GetClassBySection(this.sectionId).subscribe(res => {
      this.ClassList = res;
      console.log('Classbysection', this.ClassList);
    });
  }

  getParentList() {

    if (this._ClassId.value != null) {
      this.classId = this._ClassId.value;
    }
    this.ParentService.GetParentByClass(this.classId).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.parentList = res;
      }
    });
  }

  getStatusList() {
    if (this._ParentId.value != null) {
      this.ParentId = this._ParentId.value;
    }
    this.Admservice.GetStatus().subscribe(res => {
      this.statusList = res;
    })
  }
  getStudStatus() {
    if (this._statusId.value != null) {
      this.statusId = this._statusId.value;
    }
    console.log('test', "* parentId =" + this.ParentId + "classId  =" + this.classId + "schoolId = ", this.schoolId + "statusId = " + this.statusId + "sectionId :-" + this.sectionId + "this.exist", this.exist);

    this.Admservice.GetStudStatus(this.statusId, this.schoolId, this.ParentId, this.classId, this.sectionId).subscribe(res => {
      console.log('reslength', res.length);
      if (res.length == 0) {
        this.exist = true;
      }
      else {
        this.exist = false;
      }
      console.log("* parentId =" + this.ParentId + "classId  =" + this.classId + "schoolId = ", this.schoolId + "statusId = " + this.statusId + "sectionId :-" + this.sectionId + "this.exist", this.exist);
      if (res != null) {
        this.StudStatusList = res;

      }

    })
  }
  WithdrowStudentbyId() {
    this.Admservice.WithdrowStudentbyId(this.studId, this.yearId, this.animal).subscribe(res => {
      this.getStudStatus();
    });
  }
  resetall() {
    this.ParentId = 0;
    this.classId = 0;
    this.sectionId = 0;
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { animal: this.animal },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
        this.animal = result;
        this.studId = id;
        this.WithdrowStudentbyId();
        console.log('reson is : ', this.animal);
        console.log('id is : ', id);
      }
    });
  }
}
