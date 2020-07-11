import { Router } from '@angular/router';
import { LandingModule } from './../../../landing/landing.module';
import { languages } from './../../../../shared/i18n/languages.model';
import { Component, OnInit, ViewChild, Input, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { Payment } from 'src/app/Models/financial/payment';
import { PaymentService } from '../payment.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { StudentFeeService } from '../../student-fee/student-fee.service';
import { users } from 'src/app/Models/Users/users';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { of, from } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { finStudCard } from 'src/app/Models/financial/finStudCard';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { PrintPaymentComponent } from '../print-payment/print-payment.component';
import { jqxComboBoxComponent } from 'jqwidgets-ng/jqxcombobox';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { FormBuilder, FormArray } from '@angular/forms';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
//

import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { FormGroup } from '@angular/forms';
import { FinItemService } from '../../fin-item/fin-item.service';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { RepService } from 'src/app/pages/reports/rep.service';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons';
// import { PrintPaymentComponent } from '../print-payment/print-payment.component';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.scss']
})


export class PaymentIndexComponent implements OnInit {
  constructor(
    private router: Router,
    public appSettings: AppSettings,
    // private paymentService: PaymentService,
    private studentFeeService: PaymentService,
    private parentService: RegParentService,
    private dialog: MatDialog,
    private yearService: YearService,
    private currentUserService: CurrentUserService,
    private fb: FormBuilder,
    private lookupService: LookupsApiService,
    private finItemService: FinItemService,
    private admService: AdmService,
    private repService: RepService,
    private changeDetectorRefs: ChangeDetectorRef

  ) {
    this.studentFeesDataSource = new MatTableDataSource<StudentFee>();
    this.studentFeesDtlDataSource = new MatTableDataSource<StudentFee>();
    this.dataSourceFinstudCard = [];



    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.currentYearId = currentUser.yearId;
    // this.service.sCurrentYear = currentUser.yearName;
    this.yearName = currentUser.yearName;
    this.studentFeeService.sYearId = currentUser.yearId;
    this.schoolId = currentUser.schoolId;

  }

  get getChequeDetails() {
    return this.PaymentformGroup.get('PaymentDetail') as FormArray;
  }

  @ViewChild('jqxComboBoxParent') jqxComboBoxParent: jqxComboBoxComponent;
  @ViewChild('jqxgridFinStudCard') jqxgridFinStudCard: jqxGridComponent;
  @ViewChild('jqxgridPaymentList') jqxgridPaymentList: jqxGridComponent;

  @ViewChild('parentDropDownList') parentDropDownList: jqxDropDownListComponent;
  @ViewChild('myWindow') myWindow: jqxWindowComponent;
  @ViewChild('parentName') parentName: ElementRef;
  @ViewChild('sectionName') sectionName: jqxInputComponent;
  @ViewChild('className') className: jqxInputComponent;
  @ViewChild('classSeqName') classSeqName: jqxInputComponent;
  @ViewChild('studId') studId: jqxInputComponent;
  @ViewChild('xparentName') xparentName: ElementRef;
  @ViewChild('jqxFinItemList') jqxFinItemList: jqxDropDownListComponent;
  @ViewChild('jqxVoucherDate') jqxVoucherDate: jqxInputComponent;
  @ViewChild('jqxNote') jqxNote: jqxInputComponent;
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('jqxSumCredit') jqxSumCredit: jqxInputComponent;
  @ViewChild('jqxChequeWoner') jqxChequeWoner: jqxInputComponent;
  //
  @ViewChild('jqxPaymentMethodId') jqxPaymentMethodId: jqxDropDownListComponent;
  @ViewChild('jqxBankId') jqxBankId: jqxDropDownListComponent;
  @ViewChild('submitButton') submitButton: jqxButtonComponent;
  // submitButton
  // jqxNote
  @ViewChild('studentDropDownList') studentDropDownList: jqxDropDownListComponent;



  @Output() event = new EventEmitter<Payment>(true);

  studentFeesDataSource: MatTableDataSource<StudentFee>;
  studentFeesDtlDataSource: MatTableDataSource<StudentFee>;
  dataSourceFinstudCard: finStudCard[];
   public PaymentList: StudentFee[]=[];

  loading = false;
  parentList: regParents[];
  filterParents: regParents[];
  yearsList: any;
  parentId: any;
  currentYearId: number;
  currentYear: any;
  schoolName: any;
  schoolId: any;
  selected: any;
  parentFilterValue: any;
valid:string=null;

  // ngxParentList: regParents[];



  public FinStudCardDataAdapter;
  // PaymentList
  public PaymentListAdapter;

  dir = 'center';
  public FinStudCardFields = [
    { name: 'studentId', type: 'number' },
    { name: 'firstName', type: 'string' },
    { name: 'brotherDescountName', type: 'string' }, // , map: '1'
    { name: 'brotherDescountRate', type: 'number' },
    { name: 's10', type: 'number' },
    { name: 's6', type: 'number' },
    { name: 's7', type: 'number' },
    { name: 's8', type: 'number' },
    { name: 'sumDepit', type: 'number' },
    { name: 'sumCredit', type: 'number' },
    { name: 'amtRemainder', type: 'number' },
  ];
 

  public FinStudCardColumns: any[] = [
    {
      text: 'رقم الطالب', datafield: 'studentId', align: this.dir, cellsalign: this.dir,
      rendered: (header) => { this.cssHeader(header); }
    },
    
    {
      text: 'إسم الطالب ', datafield: 'firstName', align: this.dir, cellsalign: this.dir,
      rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'نوع الخصم ', datafield: 'brotherDescountName', align: this.dir,
      cellsalign: this.dir, rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'نسبة الخصم ', datafield: 'brotherDescountRate', align: this.dir,
      cellsalign: this.dir, rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'الرصيد السابق  ', datafield: 's10', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'رسوم التسجيل   ', datafield: 's6', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'الرسوم الدراسية    ', datafield: 's7', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'رسوم الباص     ', datafield: 's8', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'مجموع الرسوم', datafield: 'sumDepit', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'مجموع الدفعات', datafield: 'sumCredit', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'المبلغ المتبقي', datafield: 'amtRemainder', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: '', datafield: 'Edit', width: 50, columntype: 'button',
      cellsrenderer: (): string => {
        return 'التفاصيل';
      },
      buttonclick: (row: number) => {
        this.jqxButtonClick(row);
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    { // jqxButtonClickPrintPayment
      text: ' ', datafield: 'Edit2', width: 70, columntype: 'button',
      cellsrenderer: (): string => {
        return 'بطاقة الطالب';
      },
      buttonclick: (row: number) => {
        this.jqxButtonClickPrintPayment(row);
      }
      , rendered: (header) => { this.cssHeader(header); }
    }
  ];

  public PaymentListFields = [
    { name: 'finItemVoucherSequence', type: 'number' },
    { name: 'voucherDate', type: 'date' },
    { name: 'credit', type: 'number' }, // , map: '1'
    { name: 'finItemName', type: 'string' },
    { name: 'note', type: 'string' }
  ];

  public PaymentListColumns: any[] = [
    {
      text: 'رقم السند ', datafield: 'finItemVoucherSequence', align: this.dir,
      cellsalign: this.dir, rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'تاريخ الفاتورة', datafield: 'voucherDate', align: this.dir, cellsalign: this.dir,
      cellsformat: 'dd/MM/yyyy', rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'المبلغ', datafield: 'credit', align: this.dir,
      cellsalign: this.dir, aggregates: ['sum'], aggregatesrenderer: (aggregates: string) => {
        const name = aggregates['sum'];
        return name;
      }
      , rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'نوع الرسم', datafield: 'finItemName', align: this.dir, cellsalign: this.dir,
      rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: 'البيان', datafield: 'note', width: '40%', align: this.dir, cellsalign: this.dir,
      rendered: (header) => { this.cssHeader(header); }
    },
    {
      text: '', datafield: 'Edit3', width: 50, columntype: 'button',
      cellsrenderer: (): string => {
        return 'طباعة';
      },
      buttonclick: (row: number) => {
        this.getPaymentInfo(row);
      }
      , rendered: (header) => { this.cssHeader(header); }
    }
    
  ];


  public paymentListCols = ['finItemVoucherSequence', 'voucherDate', 'credit', 'finItemName', 'note']
    .concat('actions');


  studentFeesCols = [
    { field: 'studentId', header: '#' },
    { field: 'studentName', header: 'Student' },
    { field: 'debit', header: 'debt' },
    { field: 'credit', header: 'Creditor' },
    { field: 'total', header: 'Total' }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public studentFeesDisplayedColumns: string[] = this.studentFeesCols.map(col => col.field).concat('actions');


  studentFeesDtlCols = [
    { field: 'finItemName', header: 'Financial item' },
    { field: 'debit', header: 'debt' },
    { field: 'credit', header: 'Creditor' },
    { field: 'paymentId', header: 'payment number' }
  ];
  @ViewChild(MatPaginator) paginatorDtl: MatPaginator;
  public studentFeesDtlDisplayedColumns: string[] = this.studentFeesDtlCols.map(col => col.field);

  colsCard = [
    { field: 'firstName', header: 'Student name' },
    { field: 's9', header: 'Discounts information if found' },
    { field: 's10', header: 'previous balance' },

    { field: 's6', header: 'Register fees' },
    { field: 's7', header: 'Study fees' },
    { field: 's8', header: 'Bus fees' },

    { field: 'sumDepit', header: 'Total fees' },
    { field: 'sumCredit', header: 'Total payments' },
    { field: 'amtRemainder', header: 'Remaining amount' },

  ];
  @ViewChild(MatPaginator) paginatorCard: MatPaginator;
  public displayedColumnsCard: string[] = this.colsCard.map(col => col.field);



  public displayedColumns = ['firstName', 'brotherDescountName', 'brotherDescountRate',
    's10', 's6', 's7', 's8', 'sumDepit', 'sumCredit', 'amtRemainder']
    .concat('actions');

  public settings: Settings;


  yearName = '2019 - 2020';


  comboBoxSource: any;
  parentIndex: any;



  public vouchReport: any = StudentFee;

  // ====================================================================================================


  reportId = 1;
  title: any = 'سند تسديد الاقساط الدراسية';


  public PaymentformGroup: FormGroup;



  bankList: any[] = [];


  PaymentMethodList: any;


  finItemList: any[] = [];


  public summedChequesValues = 0;
  childrenList: any;

  ngOnInit() {
    // this.getPaymentList();
    this.getParentList(1);
    this.getYearsList();
    this.parentFilterValue = null;
    this.getPaymentMethodList();
    this.getBankList();
    //  this.getParentsList();
    this.getFinItemList();
    this.initForm();
    //  this.data("x");

  }
  refresh() {
      this.changeDetectorRefs.detectChanges();
  }

  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }

  getParentList(parentName) {
    return this.parentService.GetParentByCommitStudentList().subscribe(res => {
      this.parentList = res;
      this.filterParents = this.parentList;
      const index = this.parentList.findIndex(i => i.fatherName === parentName);
      if (index != -1) {
        this.selected = this.parentList[index].id;
        this.onParentChanged(this.selected);
      }

      this.comboBoxSource = res.map(m => ({ id: m.id, fatherName: m.fatherName + ' | ' + m.id }));
      this.dropDownValus();
    });
  }

  GetPaymentList(studId) {
    this.studId = studId;
    return this.studentFeeService
      .GetPaymentList(this.currentYearId, studId)
      .subscribe(res => {
        this.PaymentList = res;
        console.log(this.PaymentList);
        this.fxMyPaymentList(res);
      });
  }

  onParentChanged(filterValue: any) {
this.valid=null;
    console.log('***filterValue=' + filterValue);


    const index = this.jqxComboBoxParent.getSelectedIndex();
    const value = this.jqxComboBoxParent.getSelectedItem().value;
    filterValue = value;
    console.log('index=' + index + '    value=' + value);
    this.getErrforFinDept(value);
    //  this.studentFeeService.selectedParentId = filterValue;
    this.studentFeeService.sParentId = filterValue;
    // this.parentId = this.service.sParentName;

    const Index = this.parentList.findIndex(i => i.id === filterValue);
    if (Index != -1) { this.studentFeeService.sParentName = this.parentList[Index].fatherName; }

    this.parentId = filterValue;
    this.jqxGetFinStudCard();
    this.getFinStudCard();
    console.log('filterValue=' + filterValue);
    this.studentFeeService.GetStudFeesListByParent(this.currentYearId, filterValue).subscribe(res => {
      this.studentFeesDataSource.data = res;
      console.log(res);

    });

    this.dropDownValus();
  }

  GetStudFeesDtl(studId, studName) {
    return this.studentFeeService
      .GetStudFeesDtl(this.currentYearId, studId)
      .subscribe(res => {
        this.studentFeesDtlDataSource.data = res;
      });
  }

  addNewPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.data = { id: 0, reportId: 1 };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      console.log(this.studentFeeService.sParentId);
      console.log('res.studentId=' + res.studentId);
      this.onParentChanged(this.studentFeeService.sParentId);
      this.GetPaymentList(res.studentId);
    }
    );
  }


  payCheck() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.data = { id: 0, reportId: 1 };
    const dialogRef = this.dialog.open(PaymentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      console.log(this.studentFeeService.sParentId);

    }
    );
  }

  updatePayment(studentFeeId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.data = { id: studentFeeId };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
  }

  openDeleteDialog(model: StudentFee) {
    const dialogoRef = this.dialog.open(DeleteDialogComponent, {
      data:
      {
        name: `${model.finItemDesc}`
      }
    });
    dialogoRef.afterClosed().subscribe(
      result => {
        (result === true);
        this.deletePayment(model);
      }
    );
  }

  deletePayment(model: StudentFee) {
    this.loading = true;
    this.studentFeeService.deleteStudentFee(model.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors();
        this.loading = false;
      },

      () => this.loading = false
    );
    err => { };
  }

  getErrforFinDept(parentId) {


    return this.studentFeeService.getErrforFinDept(parentId).subscribe(res => {
      if (res != null) {
        this.valid= res;
      } else {
        this.valid= null;
      }
    }, err => console.log(err)
    )
  }
  private handleSuccess() {
    // this.getPaymentList();
  }

  private handleErrors() {

  }


  getFinStudCard() {
    console.log('this.currentYearId'+this.currentYearId+'----------------');
    return this.studentFeeService.FinStdCard(this.currentYearId, this.parentId).subscribe(res => this.dataSourceFinstudCard = res);

    
  }

  getamtRemainder() {
    return this.dataSourceFinstudCard.map(t => t.amtRemainder).reduce((acc, value) => acc + value, 0);
  }

  getsumDepit() {
    return this.dataSourceFinstudCard.map(t => t.sumDepit).reduce((acc, value) => acc + value, 0);
  }

  getsumCredit() {
    return this.dataSourceFinstudCard.map(t => t.sumCredit).reduce((acc, value) => acc + value, 0);
  }
  getS9() {
    return this.dataSourceFinstudCard.map(t => t.s9).reduce((acc, value) => acc + value, 0);
  }
  getS10() {
    return this.dataSourceFinstudCard.map(t => t.s10).reduce((acc, value) => acc + value, 0);
  }
  getS6() {
    return this.dataSourceFinstudCard.map(t => t.s6).reduce((acc, value) => acc + value, 0);
  }
  getS7() {
    return this.dataSourceFinstudCard.map(t => t.s7).reduce((acc, value) => acc + value, 0);
  }
  getS8() {
    return this.dataSourceFinstudCard.map(t => t.s8).reduce((acc, value) => acc + value, 0);
  }

  getStudPaymentTotal() {
    return this.PaymentList != null ?
      this.PaymentList.map(t => t.credit).reduce((acc, value) => acc + value, 0) : null;
  }

  getPaymentInfo(id: any) {
    //console.log('getPaymentInfo id=' + id);
    const paymentId = this.PaymentList[id].paymentId;
    //const paymentIdx = this.jqxgridPaymentList.getrowdata(id).paymentId;
   // console.log('paymentId=' + paymentId + '    paymentIdx=' + paymentIdx);
    return this.studentFeeService.getStudentFeeById(paymentId).subscribe(res => {
      this.vouchReport = res;
      this.studentFeeService.orignalCopy = '/ نسخة';
      // this.vouchReport = [res,  {orignalCopy:"1"}]
      this.printPayment();
    });
  }



  printPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.data = this.vouchReport;
    const dialogRef = this.dialog.open(PrintPaymentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.vouchReport = [];
    }
    );
  }

  // أنشطة لا منهجية

  addNewPaymentForActivity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    dialogConfig.data = { id: 0, reportId: 2 };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      console.log(this.studentFeeService.sParentId);
      console.log('res.studentId=' + res.studentId);
      this.onParentChanged(this.studentFeeService.sParentId);
      this.GetPaymentList(res.studentId);
    }
    );
  }


  jqxButtonClick(row) {
    console.log('row=' + row);
    // let studId = row.args.row.studentId;
    // console.log('studId'+studId)
    // let dataRecord = this.jqxgridFinStudCard.getrowdata(row);
    // let studid = this.dataSourceFinstudCard[row].studentId;
    const studId = this.jqxgridFinStudCard.getrowdata(row).studentId;
    this.GetPaymentList(studId);
    // console.log("row=" + row+"   studId="+studId+"   S7="+dataRecord.s7);
  }

  // ---/reports/cardRep/

  jqxButtonClickPrintPayment(row) {
    const studId = this.jqxgridFinStudCard.getrowdata(row).studentId;
    const rep1Url = '/reports/cardRep/' + studId;
    this.router.navigateByUrl(rep1Url);

  }

  jqxGetFinStudCard() {
    console.log('*ParentId=' + this.parentId);
    return this.studentFeeService.FinStdCard(this.currentYearId, this.parentId).subscribe(res => {
      this.dataSourceFinstudCard = res;
      this.fxMyFinStudCard(res);
    });
  }
  fxMyFinStudCard(res) {
    const source: jqwidgets.GridSource = {
      localdata: res,
      datafields: this.FinStudCardFields,
      datatype: 'json'
    };
    this.FinStudCardDataAdapter = new jqx.dataAdapter(source);
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 1000;
  }

  // ############################################################################################
  fxMyPaymentList(res) {
    const source: jqwidgets.GridSource = {
      localdata: res,
      datafields: this.PaymentListFields,
      datatype: 'json'
    };
    this.PaymentListAdapter = new jqx.dataAdapter(source);
  }

  cssHeader(header) {
    header.css('font-weight', 'bold');
    header.css('font-size', '14px');
    // header.css('color','black');
  }

  showWindowButtonClick(RepId): void {

    this.getChequeDetails.controls = [];
    this.getChequeDetails.reset();
    this.addCheque();
    this.reportId = RepId;

    if (RepId === 1) {
      this.title = 'سند تسديد الرسوم الدراسية';
    }
    if (RepId === 2) {
      this.title = 'سند قبض أنشطة لا منهجية';
    }
    this.getFinItemList();
    this.myWindow.open();
    this.studentDropDownList.selectIndex(0);
    console.log('--');
    console.log(this.childrenList);
    console.log(this.studentDropDownList.selectIndex(0));
    console.log('---');
    this.jqxFinItemList.selectIndex(0);
    const res = [1];
  }

  addNewCheque: any;
  addCheque() {
    this.addNewCheque = this.getChequeDetails.valid;
    const dtl = this.fb.group({
      id: [0],
      chequeNo: [null],
      chequeDate: [null],
      credit: [0],
      debit: [0],
      bankId: [this.bankList[0].id],
      chequeWoner: [this.jqxComboBoxParent.getSelectedItem().label],
      paymentMethodId: [this.PaymentMethodList[0].id],
      transferNo: [null]
    });

    if (this.getChequeDetails.length > 0 && this.addNewCheque === true) {
      this.getChequeDetails.push(dtl);
    }

    if (this.getChequeDetails.length === 0) {
      this.getChequeDetails.push(dtl);
    }


    this.sumvalue();
  }

  deleteCheque(i) {
    this.getChequeDetails.removeAt(i);
  }
  getBankList() {
    return this.lookupService.getLookupsByType(46).subscribe(res => {
      this.bankList = res.map(m => ({ id: m.id, name: m.name }));
    });
  }
  getPaymentMethodList() {
    return this.lookupService.getLookupsByType(45).subscribe(res => {
      this.PaymentMethodList = res.map(m => ({ id: m.id, name: m.name }));
    });
  }
  getFinItemList() {
    return this.finItemService.getFinItemList().subscribe(res => {
      const result = res.filter(f => f.showItemInMenu === 1 && f.basicOrExtraFees === this.reportId)
        .map(m => ({ id: m.id, desc: m.desc, note: this.yearName + ' / ' + m.desc }))
        .sort(s => s.id);
      this.finItemList = result;
      // this.setNote();
    });
  }
  sumvalue() {

    // console.log('@#*********************');
    //  console.log(this.PaymentformGroup.get('credit').value + '*********************');

    this.PaymentformGroup.get('PaymentDetail').valueChanges.subscribe(values => {
      // reset the total amount
      this.summedChequesValues = 0;
      const ctrl = <FormArray>this.PaymentformGroup.controls['PaymentDetail'];
      // iterate each object in the form array
      ctrl.controls.forEach(x => {
        // get the itemmt value and need to parse the input to number
        const parsed = parseInt(x.get('credit').value);
        // add to total
        this.summedChequesValues += parsed;
        this.jqxSumCredit.val(this.summedChequesValues);
        // this.PaymentformGroup.get("credit").setValue(this.summedChequesValues);
        //  console.log('this.summedChequesValues' + this.summedChequesValues);


      });
    });
  }

  submit() {
    //  console.log("this.jqxNote.value.name="+this.jqxNote.value());
    this.PaymentformGroup.get('parentId').setValue(this.parentId);
    this.PaymentformGroup.get('note').setValue(this.jqxNote.value());
    this.PaymentformGroup.get('credit').setValue(this.jqxSumCredit.value());
    let vaild = this.PaymentformGroup.valid;
    //  console.log(this.PaymentformGroup.value);

    const sumCredit = this.jqxSumCredit.value();
    if (sumCredit <= 0) {
      alert('قيمة المقبوض يجب أن تكون أكبر من صفر');

    } else {
      if (this.addNewCheque == true && vaild == true)
        this.studentFeeService.addStudentFee(this.PaymentformGroup.value).subscribe(
          res => {

            return this.studentFeeService.getStudentFeeById(res.id).subscribe(res => {
              this.vouchReport = res;
              this.printPayment();
              this.myWindow.close();
              this.PaymentList.push(this.vouchReport);
              this.fxMyPaymentList(this.PaymentList);
              this.refresh();
            });

          });
    }

    // this.addPaymentAndPrint();
  }
  getChildrenList(parentId) {
    console.log('getChildrenList');
    return this.admService.GetCommitedStudents(parentId)
      .subscribe(res => {
        this.childrenList = res.map(m => ({ id: m.id, studName: m.id + ' | ' + m.studName }));
        console.log('**');
        console.log(this.childrenList);
        console.log('***');
        this.studentDropDownList.selectIndex(0);
          console.log('selected indeddddd'+ this.studentDropDownList.selectIndex(0))
      });
  }

  onStudChange() {
    this.deleteAllCheques();
    const index = this.studentDropDownList.getSelectedIndex();
    const studId = this.studentDropDownList.getSelectedItem().value;
    this.jqxFinItemList.selectIndex(0);
    return this.repService.getStudCardDataVw(this.currentYearId, studId)
      .subscribe(res => {
        this.sectionName.val(res.sectionName);
        this.className.val(res.className);
        this.classSeqName.val(res.classSeqName);
      });
  } 

  deleteAllCheques() { 
    this.getChequeDetails.controls = [];
    this.getChequeDetails.reset();
    this.addCheque();
  }


  setNote() {
    this.jqxNote.val(this.yearName + ' / ' + this.jqxFinItemList.getSelectedItem().label);
  }

  initForm() {

    const myDate = new Date();

    this.PaymentformGroup = this.fb.group(
      {
        id: [0],
        parentId: [this.parentId],
        studentId: [null],
        yearId: [ this.currentYearId],
        finItemId: [null],
        debit: [0],
        credit: [0],
        note: [null],
        voucherDate: [myDate],
        voucherStatusId: [1], // 1=Not Deleted,   0=Deleted
        voucherTypeId: [2], // [this.voucherTypeId], // 2=سند قبض و 4=سند قبض أنشطة لامنهجية
        PaymentDetail: this.fb.array([]),
      }
    );
  }



  getParentsList() {
    this.parentService.getParentsList().subscribe(res => {
      this.comboBoxSource = res.map(m => ({ id: m.id, fatherName: m.fatherName + ' | ' + m.id, parentName: m.fatherName }));
      this.dropDownValus();
    });
  }


  dropDownValus() {
    const index = this.jqxComboBoxParent.getSelectedIndex();
    const parentId = this.jqxComboBoxParent.getSelectedItem().value;
    this.parentId = parentId;
    this.getChildrenList(parentId);
    console.log('index=' + index + '    parentId=' + parentId);
  }
  
  addPaymentAndPrint() {


    // if (this.PaymentformGroup.get('credit').value !== this.summedChequesValues ) {
    //   this.credit.setErrors({ total: false });
    // } else {
    //   this.credit.setErrors(null);
    // }

    // if (!this.PaymentformGroup.valid) {
    //   this.validator.markFormTouched(this.PaymentformGroup);
    //   return;
    // }

    console.log(this.PaymentformGroup.value);

    this.studentFeeService.addStudentFee(this.PaymentformGroup.value).subscribe(
      res => {
        // this.event.emit(this.PaymentformGroup.value);
        // this.dialogRef.close(this.PaymentformGroup.value);
        this.vouchReport = res;
        // console.log(res);
        // this.printPayment(res.id);
        this.getPaymentInfo(res.id);
      },
      err => {
        console.log('addPaymentAndPrint: ' + err);
      }
    );
  }

}
