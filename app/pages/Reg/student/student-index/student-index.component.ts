import { FormBuilder, FormGroup } from '@angular/forms';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { Student } from 'src/app/Models/Reg/Students/students';
import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';

import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { element } from '@angular/core/src/render3';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';

 
@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {

  dataSource:any;
  loading=false;
  cols=[
    //{field:"index", header:"index"},
    {field:"studId", header:"#"},
   // {field:"studNo", header:"رقم الطالب"},
    //{field:"firstName", header:"إسم الطالب"},
    //{field:"parentId", header:"ولي الامر"},
    { field: "studFullName", header:"إسم الطالب" },
    { field: "sectionName", header: "القسم" },
    {field:"className", header:"الصف"}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  parentList: regParents[];
  filterParents: regParents[];

  sectionList: LkpSection[];
  classList: lkpClass[];

  schoolId: any;
  yearId: any;
  selected: any;
  parentId: any;
  schoolList: any;
  isSuper:any;
  
  
  formGroup: FormGroup;


  constructor(private service: StudentService,
    private parentService: RegParentService,
    private classService: ClassService,
    private sectionService: SectionService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private admService: AdmService,
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService) {
    
      let currentUser: users;
      this.currentUserService.user.subscribe(user => currentUser = user);
      this.yearId = currentUser.yearId;
      this.isSuper= currentUser.isSuperAdmin
     // this.schoolId = currentUser.schoolId;
     this.getSchoolList();
     }


      
  ngOnInit() {
    this.getSectionList();
    // this.getStudentList();
    this.getParentList(1);
    this.iniForm();
  }

  getStudentList(){
    return this.service.getStudentList().subscribe(res => {
      this.dataSource = res; 
     
    });
  }


//Delete
deleteStudent(parent: Student) {
  this.loading = true;
  this.service.deleteStudnt(parent.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}


openDeleteDialog(model: Student) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.firstName}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteStudent(model);
    } 
  });
}
private handleSuccess() {
  this.getStudentList();
}

private handleErrors() {
}


onSchoolChanges(filterValue :string)
{
  this.schoolId=filterValue;
   this.getSectionList();

}

getSchoolList(){
  return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
}

  getSectionList() {
    this.sectionService.sectionListBySchool(this.schoolId).subscribe(res => this.sectionList = res);
  }
  
  getParentList(parentName) {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
      this.filterParents = res;
      console.log('filterList',this.filterParents);
      
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }

  getClassList(sectionId) {
    this.classService.GetClassBySection(sectionId).subscribe(res => this.classList = res);
  }
  search() {
    
    this.formGroup.get("parentId").setValue('');
    console.log(this.formGroup.value);
    
    this.service.getStudentByParam(this.formGroup.value).subscribe(res => {
      console.log('resssss',res);
      
      this.dataSource = res;
    })
  }
  
  iniForm() {
    this.formGroup = this.fb.group({
      sectionId: [null],
      classId: [null],
      parentId:[null]
    });
  }

 
  onParentChanged(filterValue: string) {

    this.formGroup.get('sectionId').setValue("");
    this.formGroup.get('classId').setValue("");

    this.selected = filterValue;
    //this.service.sSelected = filterValue;
    this.parentId = filterValue;
    this.admService.getdataByParentAndSchool(filterValue, this.schoolId).subscribe(res => {
      this.dataSource = res;
      console.log('eeee',res);
      
    });
  }


  
  routToAddParent() {
    this.service.sAddParent = true;
    let url = '/parents/add';
    this.router.navigateByUrl(url);
  }

  
  // routToUpdateParent(parentId) {
  //   this.service.sAddParent = true;    
  //   let url = '/parents/edit/' + parentId ;
  //   this.router.navigateByUrl(url);
  // }


}
