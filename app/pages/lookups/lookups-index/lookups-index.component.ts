import { LkpLookupType } from "./../../../Models/Lookups/lkplookuptype";
import { LookupTypes } from "./../../../Models/Enum/SystemEnum";
import { LookupTypeApiService } from "./../lookup-type-api.service";
import { LookupsApiService } from "./../lookups-api.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Search } from "src/app/Models/search/search";
import { LookupsFilter } from "src/app/Models/Lookups/lookupsFilter";
import {
  MatTableDataSource,
  MatPaginator,
  PageEvent,
  MatDialog
} from "@angular/material";
import { Lkplookup } from "src/app/Models/Lookups/lkplookup";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { PaginatedResult } from "src/app/Models/search/PaginatedResult";

@Component({
  selector: "app-lookups-index",
  templateUrl: "./lookups-index.component.html",
  styleUrls: ["./lookups-index.component.scss"]
})
export class LookupsIndexComponent implements OnInit {
  loading: boolean;
  typeId: any;
  dataSource: MatTableDataSource<Lkplookup> = new MatTableDataSource<Lkplookup>();
  filterSearch: Lkplookup[];
  ConstantsStatus:any;
  dataSource2: any;
  filter: Search<LookupsFilter> = new Search<LookupsFilter>(10);

  cols = [
    { field: "id", header: "#" },
    { field: "name", header: "Name" },
    {field:"isActive", header:"الحالة", type: 'boolean'}

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols
    .map(col => col.field)
    .concat("actions");

  public typeList: any[];

  constructor(
    private service: LookupsApiService,
    private typeService: LookupTypeApiService,
    private dialog: MatDialog
  ) {
    
  }

  onChange(value: string) {
    console.log(value.trim().toLowerCase());

    this.dataSource.filter = value.trim().toLowerCase();
  
    console.log(value);
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.getTypes();

    if (this.service.sTypeId !=null)
    this.getLookupsOnInitiat();
      this.dataSource2 = this.dataSource;
  }
  
  public getTypes() {
    return this.typeService.LookupTypes().subscribe(
      get => {
       this.typeList=get;
       this.filterSearch=this.typeList;
        // console.log(get), (this.typeList = get,
        //   this.filterSearch=this.typeList);
        
      },
      err => console.log("error"),
      () => console.log("Complite")
    );
  }
  getLookupsOnInitiat() {
    this.service
      .getLookupsByType(this.service.sTypeId)
      .subscribe(res => (this.dataSource = res));
  }
  onLookupChanged(value) {
    this.typeId = value;
    this.service.sTypeId = value;
    this.service
      .getLookupsByType(value)
      .subscribe(res => (this.dataSource = res));
  }
  onLookupChangedStatus(value) {
    this.ConstantsStatus = value;
    this.service.sTypeId = value;
    this.service
      .getLookupsByType(value)
      .subscribe(res => (this.dataSource = res));
  }
  getLookup() {
    this.loading = true;
    this.service.ListLookups().subscribe(
      //get=>{console.log(get), this.lookup=get},
      result => {
        console.log(result), (this.dataSource.data = result); //new MatTableDataSource(result);
        this.dataSource2 = result;
        this.dataSource.paginator = this.paginator;

        this.dataSource2.paginator = this.paginator;
        console.log("Paginator");
        console.log(this.dataSource);
        // this.dataSource.sort = this.sort;
        // this.dataSource = new MatTableDataSource(result.data);
        this.paginator.length = result.length;
        //this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
      },
      error => console.log("error"),
      () => {
        console.log("Complite");
        this.loading = false;
      }
    );
  }

  /*
getLookup() {
    this.loading = true;
    this.service.ListLookupsx(this.filter).subscribe(result => {
        // this.dataSource.data = result;
        this.dataSource.data = result.data;
         this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        // console.log(this.dataSource); //prints the data correctly
    //  this.dataSource = new MatTableDataSource<PaginatedResult<Lkplookup>>(result.data);
     console.log(">>>");
     console.log(result.data);
      this.paginator.length = result.totalCount;
    }, error => this.handleErrors(),
      () => this.loading = false);

      
  }
*/

  getNext(event: PageEvent) {
    this.filter.pageNumber = event.pageIndex;
    this.getLookup();
  }

  openDeleteDialog(lookup: Lkplookup) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${lookup.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStore(lookup);
      }
    });
  }

  deleteStore(lookup: Lkplookup) {
    this.loading = true;
    this.service.deleteLookup(lookup.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors(), (this.loading = false);
      },
      () => (this.loading = false)
    );
  }

  private handleSuccess() {
    // this.getLookup();
    if (this.typeId != null) this.onLookupChanged(this.typeId);
    else this.getLookup();
  }

  private handleErrors() {}
}
