import { AddInVoucherComponent } from './add-in-voucher/add-in-voucher.component';
import { InVoucherDtl } from './../../../../Models/Stock/inVoucherDtl';
import { Suppliers } from './../../../../Models/Stock/Suppliers';
import { VoucherService } from './../voucher.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { jqxComboBoxComponent } from 'jqwidgets-ng/jqxcombobox';
import { MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { AppSettings } from 'src/app/app.settings';
import { RouterLink, Router } from '@angular/router';
import { SupplierdialogComponent } from 'src/app/pages/supplier/supplierdialog/supplierdialog.component';

@Component({
  selector: 'app-in-voucher',
  templateUrl: './in-voucher.component.html',
  styleUrls: ['./in-voucher.component.scss']
})
export class InVoucherComponent implements OnInit {
  @ViewChild('jqxComboBoxSupplier') jqxComboBoxSupplier: jqxComboBoxComponent;

  supplierList: Suppliers[];
  vouchList: InVoucherDtl[];
  schoolId: number;
  yearId: number;
  
  sourceId: number;
  dir = 'center';
  public Adapter;

  cssHeader(header) {
    header.css("font-weight", "bold");
    header.css("font-size", "14px");
    // header.css('color','black');
  }

  public Fields = [
    { name: 'masterId', type: 'string' },
    { name: 'voucherDate', type: 'date' },
    { name: 'className', type: 'string' },
    { name: 'grpName', type: 'string' },
    // { name: 'itemName', type: 'string' },
    { name: 'qty', type: 'number' },
    { name: 'costPrice', type: 'number' },
    // { name: 'payPrice', type: 'number' },

    // {
    //   text: '', datafield: 'Edit',width:50,  columntype: 'button',
    //   cellsrenderer: (): string => {
    //   return 'التفاصيل';
    //   },
    //   buttonclick: (row: number) => {
    //     this.jqxButtonClick(row);
    //   }
    //   , rendered: (header) => { this.cssHeader(header) }
    // }
    // {
    //   name: 'Action', width: "70px", cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: null, cellsRenderer: function (row, column, Action) {
    //     // render custom column.
    //     return "<button data-row='" + row + "' style='font-size: large;' class='removeButtons fa fa-edit custom-fa' #buttonReference ></button> <i margin-left: 15px;' data-row='" + row + "' style='font-size: large;' class='fa fa-trash-o custom-fa'></i>";
    //   }
    // }
  ];



  public Columns: any[] = [
    { text: 'رقم الفاتورة ', datafield: 'masterId', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'تاريخ الفاتورة  ', datafield: 'voucherDate', cellsformat: "dd/MM/yyyy", align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'الصف  ', datafield: 'className', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'المجموعة  ', datafield: 'grpName', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    // { text: 'الصنف  ', datafield: 'itemName', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'الكمية  ', datafield: 'qty', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    { text: 'قيمة الفاتورة ', datafield: 'costPrice', align: this.dir, cellsalign: this.dir,aggregates: ["sum"], rendered: (header) => { this.cssHeader(header) } ,aggregate: [{ 'Total':
    function (aggregatedValue, currentValue, column, record) {
        return '<span id="totalAggregates"></span>';
    }
}], aggregatesrenderer: function (aggregates, column, element) {
    return aggregates.Total;
} },
    // { text: 'سعر البيع  ', datafield: 'payPrice', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    // { text: 'الإجراءات', datafield: 'Action', align: this.dir, cellsalign: this.dir, rendered: (header) => { this.cssHeader(header) } },
    {
      text: 'الإجراءات', datafield: 'Edit', width: 50, columntype: 'button',
      cellsrenderer: (): string => {
        return 'طباعة';
      },
      buttonclick: (row: number) => {
        this.jqxButtonClick(row);
      }
      , rendered: (header) => { this.cssHeader(header) }
    }
    
    
  ]


  constructor(private service: VoucherService,
    private currentUserService: CurrentUserService,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    private router: Router) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.yearId = currentUser.yearId;
  }

  ngOnInit() {

    this.getSupplierList();
  }

  getSupplierList() {
    return this.service.getSupplierList().subscribe(res => {
      this.supplierList = res;
    });
  }
  
sumCostPrice:number = 0;
  getInVoucherList() {
    this.sumCostPrice=0;
    let sourceTypeId = 1332;
    this.sourceId = this.jqxComboBoxSupplier.getSelectedItem().value;
    return this.service.getInVouchersList(this.schoolId, this.yearId, sourceTypeId, this.sourceId)
      .subscribe(res => {
        
       res.map(m => this.sumCostPrice +=m.costPrice);//.costPrice
       let c = new InVoucherDtl();
       c.masterId="مجموع الفواتير"
       c.costPrice= this.sumCostPrice;
       res.push(c);
       this.vouchList = res; 
       this.fxGridData(res);
      })
  }


  
  fxGridData(res) {
    let source: jqwidgets.GridSource = {
      localdata: res,
      datafields: this.Fields,
      datatype: "json"
    }
    this.Adapter = new jqx.dataAdapter(source);
  }

  addNewItem() {
    let xSourceName = this.jqxComboBoxSupplier.getSelectedItem().label;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.autoFocus = true;
    dialogConfig.data = { yearId: this.yearId, schoolId: this.schoolId, sourceId: this.sourceId, SourceName: xSourceName };
    const dialogRef = this.dialog.open(AddInVoucherComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.getInVoucherList();
    });
  }

  //



  jqxButtonClick(row) {

    let masterId = this.vouchList[row].masterId
    console.log("row=" + row)
    console.log('MasterId', masterId);

    let rep1Url = '/reports/stock/' + masterId;
    this.router.navigateByUrl(rep1Url);


    // let studId = row.args.row.studentId;
    // console.log('studId'+studId)
    // let dataRecord = this.jqxgridFinStudCard.getrowdata(row);
    // let studid = this.dataSourceFinstudCard[row].studentId;
    // let studId = this.jqxgridFinStudCard.getrowdata(row).studentId;
    // this.GetPaymentList(studId);
    //console.log("row=" + row+"   studId="+studId+"   S7="+dataRecord.s7);
  }
  addNewSupplier(){
    const dialogConfig = new MatDialogConfig();
    var SupName: any;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(SupplierdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
   
    });
  }
}
