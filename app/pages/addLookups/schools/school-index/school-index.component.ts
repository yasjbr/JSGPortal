import { LkpSchool } from './../../../../Models/addLookups/schools/lkpSchool';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SchoolService } from './../school.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from 'src/app/shared/file-upload-dialog/file-upload-dialog.component';
import { MessageService } from 'src/app/shared/messages/message.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styleUrls: ['./school-index.component.scss']
})
export class SchoolIndexComponent implements OnInit {

  public dataSource: MatTableDataSource<LkpSchool>; // =new MatTableDataSource<LkpSchool>();
  loading = false;
  view = false;
  // filter: Search<StoresFilter> = new Search<StoresFilter>(10);

  cols = [
    { field: 'id', header: '#' },
    { field: 'name', header: 'Name' },
    { field: 'city', header: 'City' },

    { field: 'description', header: 'Description' },
    // {field:"imageFile", header:"LOGO",type:"image"},
    // {field:"mobile",header:"الموبايل"},
    // {field:"fax",header:"فاكس"},
    // {field:"address", header:"العنون"},
    // {field:"webPage", header:"الصفحة الالكترونية"},
    // {field:"faceBook", header:"الوصف"},

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  cityList: any;
  constructor(private service: SchoolService,
    private dialog: MatDialog,
    private toaster: MessageService,
    private currentUser: CurrentUserService
  ) {
    this.dataSource = new MatTableDataSource<LkpSchool>();

  }

  getSchools() {
    this.service.schoolList().subscribe(
      result => {
        console.log(result);
        
        this.dataSource.data = result;
      },
      error => { console.log('error'); }
    );
  }

  openUploadDialog(school: LkpSchool) {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      data: {
        title: 'Add school image',
        multipleCount: 1
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.uploadImage(school.id, result[0].data).subscribe((res: any) => {
          const imageObj = `data:image/${res.data[0].extention};base64,` + res.data[0].data;
          // localStorage.setItem('userImage', imageObj);
          this.currentUser._userImage.next(imageObj);

          // this.showImageSuccess();

        },
          _err => { this.showImageError(); this.loading = false; });
      }
    });
  }

  openDeleteDialog(school: LkpSchool) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${school.name}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSchool(school);
      }
    });
  }

  getCity() {
    this.service.cityList().subscribe(
      get => this.cityList = get,
      err => console.log('get city list error'),
      () => console.log('comlite')
    );

  }


  deleteSchool(school: LkpSchool) {
    this.loading = true;
    this.service.deleteSchool(school.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false; },
      () => this.loading = false
    );
  }


  private handleSuccess() {
    this.getSchools();
  }

  private handleErrors() {
  }
  ngOnInit() {
    this.getSchools();
  }

  private showImageSuccess() {
    this.loading = false;
    this.toaster.showLoadError();
  }

  private showImageError() {
    this.loading = false;
    this.toaster.showLoadError();
  }
}
