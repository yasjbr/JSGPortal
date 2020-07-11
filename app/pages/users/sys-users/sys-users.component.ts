import { forEach } from '@angular/router/src/utils/collection';
// import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { UsersService } from './../users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { User } from '../user.model';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SysusersService } from './sysusers.service';
import { users } from 'src/app/Models/Users/users';
import { usersSchool } from 'src/app/Models/Users/usersSchool';
import { id } from '@swimlane/ngx-charts/release/utils';
import { SchoolService } from '../../addLookups/schools/school.service';

@Component({
  selector: 'app-sys-users',
  templateUrl: './sys-users.component.html',
  styleUrls: ['./sys-users.component.scss']
})
export class SysUsersComponent implements OnInit {
  datasource: MatTableDataSource<users>;

  cols = [
    { field: "id", header: "#" },
    { field: "username", header: "username" },
    { field: "password", header: "password" },
    { field: "schoolName", header: "School" }
  ]
  public displayedColumns: string[] = this.cols.map(colscol => colscol.field).concat('actions');
  dataSource2: users[] = [];
  loading = false;
  schoolList:any;
  schoolId:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: SysusersService, 
    private schoolService: SchoolService,
    private dialog: MatDialog,
    private xService: UsersService,
    // private studService: StudentService
  ) {
    this.getSchoolList();
    this.datasource = new MatTableDataSource<users>();
   }

  ngOnInit() {
    this.getSchoolList();
   // this.getUserList();
  }

 getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }


  public dataFilter = (value: string) => {
    this.datasource.filter = value.trim().toLocaleLowerCase();
  }


     getUserList(UserId) {
      return this.service.getUserAndSchool(UserId).subscribe(res => {
      this.datasource.data = res;
    })
  }
 

  //Delete
  delete(parent: User) {
    this.loading = true;
    this.service.deleteUser(parent.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false },
      () => this.loading = false
    );
  }
 


  openDeleteDialog(model: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.username}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(model);
      }
    });
  }

  private handleSuccess() {



    if(this.schoolId !=null){
      this.getUserList(this.schoolId);
    }
  
  }

  private handleErrors() {
  }




  
}
