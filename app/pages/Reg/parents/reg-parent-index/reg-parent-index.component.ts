import { RegParentService } from './../reg-parent.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, PageEvent, MatTableDataSource } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reg-parent-index',
  templateUrl: './reg-parent-index.component.html',
  styleUrls: ['./reg-parent-index.component.scss']
})
export class RegParentIndexComponent implements OnInit {

  totalSize = 10;
  pageSizeDefault = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  dataSource: any;

  form: FormGroup;

  loading = false;
  cols = [
    { field: 'id', header: 'Parent No' },
    { field: 'fullName', header: 'Parent name' },
    { field: 'nationalityName', header: 'Nationality' },
    { field: 'cityName', header: 'City' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: RegParentService,
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getParentList();
  }

  getParentList() {
    if (!this.pageNumber.value) {
      this.pageNumber.setValue(0);
    }
    if (!this.pageSize.value) {
      this.pageSize.setValue(this.pageSizeDefault);
    }

    this.service.getParentsByFilter(this.form.value).subscribe(res => {
    console.log('ddd',this.form.value);
    console.log('name',res.data);
    
      
      this.dataSource = res.data;
      
      this.totalSize = res.totalCount;
    },
      _err => { },
      () => {
        this.paginator.length = this.totalSize;
        this.dataSource = new MatTableDataSource<any[]>(this.dataSource);
        // this.parents.sort = this.sort;
      });
  }

  pageChanged(value) {
    this.pageNumber.setValue(value.pageIndex);
    this.pageSize.setValue(value.pageSize);
    this.getParentList();
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.textSearch.setValue(filterValue);
    this.getParentList();
  }

  // Delete


  deleteParent(parent: regParents) {
    this.loading = true;
    this.service.deleteParent(parent.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false; },
      () => this.loading = false
    );
  }


  openDeleteDialog(model: regParents) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.firstName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteParent(model);
      }
    });
  }

  private handleSuccess() {
    this.getParentList();
  }

  private handleErrors() {
  }


  private initForm() {
    this.form = this.fb.group({
      pageNumber: [],
      pageSize: [],
      textSearch: []
    });
  }

  get pageNumber() {
    return this.form.get('pageNumber');
  }

  get pageSize() {
    return this.form.get('pageSize');
  }

  get textSearch() {
    return this.form.get('textSearch');
  }

}
