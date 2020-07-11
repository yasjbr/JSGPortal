import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { CorsesTeacherServiceService } from '../corses-teacher-service.service';
import { ActivatedRoute } from '@angular/router';
import { DialogCorsesTeachersComponent } from '../dialog-corses-teachers/dialog-corses-teachers.component';
import { Teacher } from 'src/app/Models/CorseTeacher/Teacher';

@Component({
  selector: 'app-display-corses-teacher',
  templateUrl: './display-corses-teacher.component.html',
  styleUrls: ['./display-corses-teacher.component.scss']
})
export class DisplayCorsesTeacherComponent implements OnInit {
  dir: any;
  displayby:number;
  loading = false;
  length: number;
  squre: number;
  half: number;
  private getDirection() {
    this.dir = this.appsettings.settings.rtl ? "rtl" : "ltr";
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Teacher>;

  displayedColumns: string[] = [
    "id",
    "Teacher",
    "ClassDivisions",
    "Corse",
    "action",
  ];

  constructor(

    private appsettings: AppSettings,
    public  CorsesTeacherService: CorsesTeacherServiceService,
    private route:ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.getDirection();
  }

  ngOnInit() {
    this.getCorseTeacher();
   
        
    
  }

  getCorseTeacher() {
    this.loading = true;
    this.CorsesTeacherService.listCorseTeacher().subscribe(
      (res) => {
        console.log('resss====>',res);
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.length = res.length;
        
        this.squre = Math.ceil(this.length * 0.25);
        this.half = Math.floor(this.length * 0.5);
        console.log(this.length, this.squre, this.half);
      },
      (err) => {},
      () => (this.loading = false)
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
