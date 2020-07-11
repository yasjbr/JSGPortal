import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { Suppliers } from 'src/app/Models/Stock/Suppliers';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SupplierdialogComponent } from '../supplierdialog/supplierdialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-supplier',
  templateUrl: './index-supplier.component.html',
  styleUrls: ['./index-supplier.component.scss']
})
export class IndexSupplierComponent implements OnInit {
  supplierList:Suppliers[];
  constructor(
    private service: SupplierService,
    public dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit() {
    this.GetSupplier();
  }
  addNewSupplier(){
    const dialogConfig = new MatDialogConfig();
    var SupName: any;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(SupplierdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // SupName =res.supplierName ;
      this.GetSupplier();
      // console.log("id=" + res.id + "   parentName=" + SupName);
    });
  }
  GetSupplier() {
return this.service.GetSupplier().subscribe(res=>{
  this.supplierList=res;
  console.log(res);
})
  }
  updateSupplier(id) {
    console.log("itemid=" + id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: id,
    };
    const dialogRef = this.dialog.open(SupplierdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetSupplier();
    });
    dialogRef.afterClosed();
  
  }
  AccountSupplier(index){
    console.log('i',index);
    let rep1Url = '/Stock/rep-VoucherBySupplier/' + index;
        this.router.navigateByUrl(rep1Url);
  }
}
