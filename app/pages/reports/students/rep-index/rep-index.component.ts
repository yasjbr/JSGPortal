import { StudentService } from './../../../Reg/student/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { RepService } from '../../rep.service';
import { Student } from 'src/app/Models/Reg/Students/students';

@Component({
  selector: 'app-rep-index',
  templateUrl: './rep-index.component.html',
  styleUrls: ['./rep-index.component.scss']
})
export class RepIndexComponent implements OnInit {
 
  filterParents: regParents[];
  parentList: regParents[];
  parentId: any;
  selected: any;
  
  dataSource: MatTableDataSource<Student>=new MatTableDataSource<Student>();
  loading=false;
  cols=[
    //{field:"index", header:"index"},
    {field:"id", header:"#"},
   // {field:"studNo", header:"رقم الطالب"},
    //{field:"firstName", header:"إسم الطالب"},
   // {field:"parentId", header:"ولي الامر"},
    {field:"studFullName", header:"Student name"}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: StudentService, private parentService: RegParentService,
    private repService: RepService)
  { }

  ngOnInit() {
  //  this.dataSource.paginator=this.paginator;
    this.getParentList(1);
   // this.getStudentList();
    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      return data.parentId == +filter;
      
     };
  }

  
  
  getParentList(parentName) {
 
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
     
      this.filterParents = this.parentList;
      let index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }
    });
  }

  onParentChanged(parentId: string) {
   console.log('parentId='+ parentId)
    this.repService.sParentId= this.parentId;
    this.dataSource.filter = parentId+"";
  }


  
  getStudentList(){
    return this.service.getStudentList().subscribe(res=>this.dataSource.data=res);
  }

}
