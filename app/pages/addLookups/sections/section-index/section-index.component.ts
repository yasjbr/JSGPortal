import { LkpSection } from './../../../../Models/addLookups/sections/lkpSection';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../section.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SchoolService } from '../../schools/school.service';
import { id } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'app-section-index',
  templateUrl: './section-index.component.html',
  styleUrls: ['./section-index.component.scss']
})
export class SectionIndexComponent implements OnInit {

dataSource:MatTableDataSource<LkpSection>;
dataSource2:any;
loading=false;
schoolList:any;
GetSection:any;

  cols=[
    {field:"id", header:"#"},
    {field:"sectionName", header:"Section"},
    {field:"employeeName",header:"Headmaster"},
    {field:"email",header:"Email"},
    {field:"nationalId",header:"National No"},
    {field:"schoolName", header:"School"},
  ] 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  constructor(private service:SectionService,
    private dialog: MatDialog,
    private schoolService: SchoolService,) {
    this.dataSource=new MatTableDataSource<LkpSection>();
    this.getSchoolList();
   }


   
  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  getSections(id){
    console.log('id',id);
    
    this.service.sectionListBySchool(id).subscribe(result=>{
      this.dataSource.data=result,
    this.dataSource2=result},
      err=>console.log("error in getSetions"),
      ()=>console.log("Comlit getSections")
    )
  }

  
deleteSchool(school: LkpSection){
  this.loading = true;
  this.service.deleteSection(school.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}

openDeleteDialog(model: LkpSection) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.sectionName}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteSchool(model);
    }
  });
}

onLookupChanged(filterValue: string){

  this.dataSource.filter = filterValue+"";
   
}
private handleSuccess() {
  this.getSections(0);
  
}

private handleErrors() {
}


  ngOnInit() {
    this.getSections(0);
    this.dataSource.filterPredicate = (data: LkpSection, filter: string) => {
     return data.schoolId == +filter;
    };


    // this.dataSource.filterPredicate = (data: Element, filter: string) => {
    //   return data.name == filter;
    //  };
  }



}
