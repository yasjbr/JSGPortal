import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Marks/Course';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { CourseService } from '../course.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent implements OnInit {
  datasource: MatTableDataSource<Course>;

  cols = [ 
    { field: "id", header: "#" },
    { field: "arDescription", header: "arDescription" },
    // { field: "laDescription", header: "laDescription" }
  ]

  public displayedColumns: string[] = this.cols.map(colscol => colscol.field).concat('actions');

  constructor(private service: CourseService,
    private dialog: MatDialog) {
    this.datasource = new MatTableDataSource<Course>();
  }

  getCourseList() {

    console.log('--------getCourseList executed----------');

    this.service.getCourseList().subscribe(result => {
      this.datasource.data = result;
    },
      err => console.log("error in getCourseList"),
      () => console.log("complete")

    );
  }


  public dataFilter = (value: string) => {
    this.datasource.filter = value.trim().toLocaleLowerCase();
  }


  //Course Operations

  openDeleteCourseDialog(model: Course) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { name: `${model.arDescription}` } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCourse(model);
      }
    });
  }


  deleteCourse(course: Course) {
    this.service.deleteCourse(course.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleError();
      }
    )

  }



  handleError() {

  }
  handleSuccess() {
    this.getCourseList();
  }
  openAddNewCourseDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl"
    dialogConfig.data = { id: 0, };

    console.log('-----beforeClosed------');
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {

      this.getCourseList()

    }
    );

  }


  openUpdateDialog(courseId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: courseId };

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {

      this.getCourseList()

    }
    );
  }


  ngOnInit() {
    this.getCourseList();
  }

}
