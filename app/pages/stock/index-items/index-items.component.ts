import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { SectionService } from '../../addLookups/sections/section.service';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { ClassService } from '../../addLookups/classes/class.service';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { ThrowStmt } from '@angular/compiler';
import { Items } from 'src/app/Models/Stock/Items';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { AdmDialogComponent } from '../../Admission/adm-dialog/adm-dialog.component';

@Component({
  selector: 'app-index-items',
  templateUrl: './index-items.component.html',
  styleUrls: ['./index-items.component.scss']
})
export class IndexItemsComponent implements OnInit {
  name: string;
  showForm: boolean = false;
  schoolName: any;
  schoolId:any;
  SectionId:any;
  yearId: any;
  exist:boolean=false;
  classId:number;
  sectionList: LkpSection[];
  ClassList:lkpClass[];
  groupList:Items[];
  data:Items[];
  constructor(
    public dialog: MatDialog,
    private sectionService: SectionService,
    private currentUserService: CurrentUserService,
    private classService: ClassService,
    private service:StockService,

    )
     { 
      let currentUser: users;
      this.currentUserService.user.subscribe(user => (currentUser = user));
      this.name = currentUser.username;
      this.schoolId = currentUser.schoolId;
      this.schoolName = currentUser.arSchoolName;
      this.yearId = currentUser.yearId;
     }

  ngOnInit() {
   this.sectionListBySchool();
  }
  
  addNewItem(){
    const dialogConfig = new MatDialogConfig();
    var ItemName: any;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(AddItemComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      ItemName =res.ItemName ;
      console.log("id=" + res.id + "   parentName=" + ItemName);
    });
  }
  sectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.schoolId)
    .subscribe(res => 
      {
      this.sectionList = res;
      console.log('section list: ',this.sectionList);
      });
  }
  getClassList(sectionId) {
    this.classService.GetClassBySection(sectionId).subscribe(res =>{
      this.ClassList = res;
     console.log('Classbysection',this.ClassList);
    } );
    }
getGroupList(ClassId){
  this.initial();
  this.classId=ClassId;
  return this.service.getGroupList(ClassId).subscribe(res=>{
    if(res.length==0){
      this.exist=true;
    }
    else{
      this.groupList=res;
      this.exist=false;
    }
  });
}


 getItemList(groupId){
  return this.service.getItemList(this.classId , groupId).subscribe(res=>{
    console.log('group',res);
    if(res.length==0){
      this.exist=true;
    }
    else{
      this.data=res;
      this.exist=false;
    }
  }); 
 }
 initial(){
this.classId=0;
this.data=null;
this.groupList=null;
 }

 updateItem(id) {
  console.log("itemid=" + id);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.direction = "rtl";
  dialogConfig.data = {
    id: id,
  };
  const dialogRef = this.dialog.open(AddItemComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(res => {
    this.getItemList(0);
  });
  dialogRef.afterClosed();
this.getItemList(0);
}
// addNewStudent2() {
//   const dialogRef = this.dialog.open(AdmDialogComponent, {
//     //data: {issue: issue }
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result === 1) {
//       // After dialog is closed we're doing frontend updates
//       // For add we're just pushing a new row inside DataService
//       // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
//       // this.refreshTable();
//     }
//   });
// }
// displayForm(show: boolean) {
//   this.showForm = show;
// }
}
