import { Component, OnInit } from '@angular/core';
import { userRoleService } from '../sys-users/user-role/userRole.service';
import { SysusersService } from '../sys-users/sysusers.service';
import { userReport } from 'src/app/Models/Users/UserRepor';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddUserReportComponent } from './add-user-report/add-user-report.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({ 
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrls: ['./users-reports.component.scss']
})
export class UsersReportsComponent implements OnInit {
  userId:any;
  usersList: any;
  givenReports: any;
  //dataList:any;
  constructor(
    private userRoleService: userRoleService,
    private service: SysusersService,
    private dialog: MatDialog  ) { }

  ngOnInit() {
    this.getUserList();
  }




  getUserList() {
    return this.service.getUsers().subscribe(res => {
      this.usersList = res;
    });
  }



  getAllUserGivenReports(userId: number) {
    this.userId=userId;
    return this.userRoleService.GetAllUserGivenReports(userId).subscribe(res => {
      this.givenReports = res
      console.log( JSON.stringify(res));
      
    }
    )
  }



  addNewReport(){
    const dialogConfig = new MatDialogConfig();
   
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(AddUserReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.handleSuccess();
    });
  }
  

  private handleSuccess() {

    if(this.userId !=null){
      console.log('this.id',this.userId);
        this.getAllUserGivenReports(this.userId);
    }
}




openDeleteDialog(id) {
  console.log('id',id.title);
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: id.title
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      console.log('id',id);
      this.delete(id.id);
    }
  });
}





//delete 

delete(reportId) {
  
  ///this.loading = true;
  this.userRoleService.DeleteUserReport(reportId).subscribe(
    res => this.handleSuccess(),
    err => { this.handleErrors()
     // this.loading = false 
    },
  //  () => this.loading = false
  );
}


private handleErrors() {
}

}