import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { LkpBus } from 'src/app/Models/addLookups/bus/lkpBus';
import { BusService } from '../bus.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-bus-index',
  templateUrl: './bus-index.component.html',
  styleUrls: ['./bus-index.component.scss']
})
export class BusIndexComponent implements OnInit {

  cols = [
    { field: "id", header: "#" },
    { field: "sidNo", header: "Side number" },
    { field: "driverName", header: "Driver" },
    { field: "mobile", header: "Phone" },
    { field: "morningSuper", header: "Morning supervisor" },
    { field: "evningSuper", header: "Evening Supervisor" },
    { field: "schoolName", header: "School" }
  ]

  dataSource: MatTableDataSource<LkpBus>;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');


  constructor(
    private service: BusService,
    private dialog: MatDialog,
    ) {
    this.dataSource = new MatTableDataSource<LkpBus>();
    this.busList();

  }
  ngOnInit() {
  }
  busList() {
    return this.service.GetLKpBusAndSchoolName().subscribe(get => this.dataSource.data = get)
  }
  deleteBus(Bus: LkpBus) {
    this.loading = true;
    this.service.deleteBus(Bus.id).subscribe(
      res => this.handleSuccess(),
      err => {this.handleErrors(),this.loading = false},
      () => this.loading = false
    );
  }
  private handleSuccess() {
    this.busList();
  }
  
  private handleErrors() {
  }
  openDeleteDialog(model: LkpBus) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.id}|${model.driverName}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteBus(model);
      }
    });
  }

}
