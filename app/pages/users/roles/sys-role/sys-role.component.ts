import { Component, OnInit, ViewChild } from '@angular/core';
import { userRoleService } from '../../sys-users/user-role/userRole.service';
import { User } from '../../user.model';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { users } from 'src/app/Models/Users/users';
import { SysusersService } from '../../sys-users/sysusers.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { SysRoleDialogComponent } from '../sys-roledialog/sys-role-dialog/sys-role-dialog.component';

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss']
})
export class SysRoleComponent implements OnInit {
  dataSource:MatTableDataSource<users>;
  id:any;
  roleList:any;
  dataList:users[];
  loading = false;

  cols=[
    {field:"id", header:"#"},
    {field:"title", header:"المسمى الوظيفي  بالانجليزية"},
    {field:"titleAr",header:"المسمى الوظيفي بالعربية"},
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  constructor(
    private serviceRole:userRoleService,
    private dialog: MatDialog,
    private service:SysusersService
  ) { 
    this.dataSource=new MatTableDataSource<users>();
    this.getUserType();
  }
  public dataFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
   

  ngOnInit() {
    this.getUserType();
  }

  getUserType(){
    return this.serviceRole.getRoleList().subscribe(res=>{
    this.roleList=res;
    console.log('res',res);
    })
  }
  getForms(id){
    this.id=id;
    return this.serviceRole.getSysForms(id).subscribe(res=>{
      this.dataSource.data=res;
    })
  }


  
//delete 

delete(screenId) {
  console.log('screenid',screenId);
  
  this.loading = true;
  this.serviceRole.deleteScreen(screenId).subscribe(
    res => this.handleSuccess(),
    err => { this.handleErrors(), this.loading = false },
    () => this.loading = false
  );
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
private handleSuccess() {

  if(this.id !=null){
    console.log('this.id',this.id);
      this.getForms(this.id);
  }
// else if (id !=null){
//   console.log('id',id);
//   this.getForms(id);
// }
}
private handleErrors() {
}

//Add-Role
addNewRole(){
  const dialogConfig = new MatDialogConfig();
 
  dialogConfig.autoFocus = true;
  dialogConfig.direction = "rtl";
  const dialogRef = this.dialog.open(AddRoleComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(res => {
    this.handleSuccess();
  });
}

addsysname(){
  const dialogConfig = new MatDialogConfig();
 
  dialogConfig.autoFocus = true;
  dialogConfig.direction = "rtl";
  const dialogRef = this.dialog.open(SysRoleDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(res => {
    this.handleSuccess();
  });
}

}
