import { filter } from 'rxjs/operators';
import { AppSettings } from './../../../../app.settings';
import { id } from '@swimlane/ngx-charts/release/utils';
import { PaymentFormComponent } from './../payment-form/payment-form.component';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';
import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, Renderer2, Renderer, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ValidationBase } from 'src/app/validationBase';
import { PaymentService } from '../payment.service';
import { Payment } from 'src/app/Models/financial/payment';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { PaymentChequeService } from '../payment-cheque.service';
import { PaymentCheque } from 'src/app/Models/financial/payment-cheque';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { StudentFeeService } from '../../student-fee/student-fee.service';
import { FinItemService } from '../../fin-item/fin-item.service';
import { RepService } from 'src/app/pages/reports/rep.service';
import { RepModule } from 'src/app/pages/reports/rep.module';
import { users } from 'src/app/Models/Users/users';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { StudentFee } from 'src/app/Models/financial/student-fee';
// import { PrintPaymentComponent } from '../print-payment/print-payment.component';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { PrintPaymentComponent } from '../print-payment/print-payment.component';
import { min } from 'moment';

// import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
// const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
//   const creditValue = fg.get('credit').value;
//   // const end = fg.get('rangeEnd').value;
//   //  return start !== null && end !== null && start < end
//   console.log(this.summedChequesValues + 'this.summedChequesValues');

//   return creditValue == this.summedChequesValues
//     ? null
//     : { range: true };
// };


const hasClass = (el, className) => new RegExp(className).test(el.className);

const isChildOf = (el, className) => {
  while (el && el.parentElement) {
    if (hasClass(el.parentElement, className)) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
};

const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);

const createFormGroup = dataItem => new FormGroup({
  'chequeNo': new FormControl(dataItem.chequeNo),
  'chequeDate': new FormControl(dataItem.chequeDate),
  'chequeValue': new FormControl(dataItem.chequeValue, Validators.required),
  'bankId': new FormControl(dataItem.bankId),
  'studentFeeId': new FormControl(dataItem.studentFeeId)
});

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],

})

export class PaymentDialogComponent implements OnInit {
  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }
  private firstTime = 0;
  constructor(
    public appSettings: AppSettings,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public validator: ValidationBase,
    private studentFeeService: StudentFeeService,
    private finItemService: FinItemService,
    private admService: AdmService,
    private lookupService: LookupsApiService,
    public service: PaymentService,
    private repService: RepService,
    private chequesService: PaymentChequeService,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2,
    private currentUserService: CurrentUserService
 
  ) {
   
    if (data.reportId === 1) {
      this.reportId = 1;
      this.title = 'سند تسديد الاقساط الدراسية';
    }
    if (data.reportId === 2) {
      this.reportId = 2;
      this.title = 'سند قبض أنشطة لا منهجية';
    }

    
    this.chequeValue = 0;
    this.getFinItemList();
    this.getBankList();


    // let tokenData = JSON.parse(localStorage.getItem("token")) as users;
    // this.yearId = tokenData.yearId;
    // this.yearName = tokenData.yearName;

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.yearId = currentUser.yearId;
    this.yearName = currentUser.yearName;
    console.log(" this.yearId= "+ this.yearId );
    


    // this.chequeDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.initForm();
    this.getVoucherType(); //this.initForm(); We but iniForm inside getVoucherType
    this.paymentChequesDataSource = new MatTableDataSource<PaymentCheque>();
  }

  get getChequeDetails() {
    return this.PaymentformGroup.get('PaymentDetail') as FormArray;
  }

  get cheques() {
    return this.PaymentformGroup.get('cheques') as FormArray;
  }

  get credit() {
    return this.PaymentformGroup.get('credit') as FormControl;
  }


  ////// test inline

  title = 'سند تسديد الاقساط';
  view: PaymentCheque[];
  viewList: PaymentCheque;
  reportId: any;

  private editedRowIndex: number;
  private isNew = false;
  private docClickSubscription: any;


  public PaymentformGroup: FormGroup;
  public chequeFormGroup: FormGroup;
  public summedChequesValues = 0;
  paymentChequesDataSource: MatTableDataSource<PaymentCheque>;
  error: any;
  public myDate = new Date();
  public dateFormatted: string;
  VoucherTypeList: Lkplookup[];
  VoucherStatusList: Lkplookup[];
  PaymentMethodList: Lkplookup[];
  childrenList: any;
  chiledSelected: any;
  finItemList: any[] = []; // FinItem[];
  loading = false;
  edit = false;
  id: number;
  id7 = 7;
  selected: any;
  optionValue: any;
  optionValue1: Lkplookup;
  chequesArray: FormArray;


  public chequeDate=new Date();




  newCheque: any = false;

  @Output() event = new EventEmitter<Payment>(true);


  parentId: any;
  parentName: any;
  studId: any;
  studInfo: StudCardData;
  yearId: any;
  sectionName: any;
  className: any;
  classSeqName: any;
  bankList: Lkplookup;
  chequeValue: number;
  paymentValue: number;
  yearName: any;
  // PrimNG
  cities: any[];

  // After 30/10/2019 Abuhassan
  finItemDefault: number=7;

  public vouchReport: any = StudentFee;



  addNewCheque: any;


  initForm() {
   
    console.log("this.voucherTypeId =" + this.voucherTypeId);
    this.PaymentformGroup = this.fb.group(
      {
        id: [0],
        parentId: [this.service.sParentId],
        studentId: [null],
        yearId: [this.service.sYearId],
        finItemId: [null],
        debit: [0],
        // credit: [0],
        credit: [0, Validators.required],
        sectionId: [null],
        sectionId2: [null],
        sectionId3: [null],
        finItemVoucherSequence: [1], // to be generated
        voucherDate: [this.dateFormatted],
        paymentMethodId: [null],
        paymentMethodDesc: [null],
        transferNo: [null],
        transferDate: [null],
        visaCardNo: [null],
        note: [null],
        voucherTypeId:[this.voucherTypeId ],// [this.voucherTypeId], // 2=سند قبض و 4=سند قبض أنشطة لامنهجية
        voucherStatusId: [1], // 1=Not Deleted,   0=Deleted
        finSubItemId:[null],

        PaymentDetail: this.fb.array([]),
        //  paymentcheques: this.fb.array([])
        // let finItemNameText = finItemId.source.selected._element.nativeElement.innerText.trim();
      }
      // ,      { validator: MyAwesomeRangeValidator }
    );
  }




  getBankList() {
    return this.lookupService.getLookupsByType(46).subscribe(res => {
      this.bankList = res;
     // console.log(res);
    });
  }
  getChildrenList() {
    return this.admService.GetCommitedStudents(this.service.sParentId)
      .subscribe(res => {
        this.studId = res[0].id;
        this.PaymentformGroup.get('studentId').setValue(this.studId);
        this.childrenList = res;
        this.onStudChange();
         console.log("this.studId=" + this.studId);
      });
  }


  finItemSubList: any;
  finSubItemDefault: any;
  getFinItemList() {
    return this.finItemService.getFinItemList().subscribe(res => {
      //this.finItemList = res;
      console.log("ReportId=" + this.reportId);
      try {
        let result = res.filter(f => f.showItemInMenu === 1 && f.basicOrExtraFees === this.reportId).sort(s => s.id);
        this.finItemList = result;
        this.finItemDefault = result[0].id;
        this.setNote(this.finItemDefault);
      }
      catch(exception){}
      
      //finItemSubList
      try{
        let subList = res.filter(f => f.showItemInMenu === 0 &&
          f.basicOrExtraFees === this.reportId &&
          f.basicOrExtraFees === 2)
          .sort(s => s.id);
        this.finSubItemDefault = subList[0].id;
        this.finItemSubList = subList;
      }
      catch(exception){}
      
     
    });
  }
  setupUpdate() {
   // console.log(this.data);
    if (!this.data.id) { return; }
    this.id = this.data.id;
    this.edit = true;
    this.loading = true;
    this.studentFeeService.getStudentFeeById(this.id).subscribe(res => {
      this.PaymentformGroup = this.validator.patchForm(this.PaymentformGroup, res);
    }, err => console.log(err),
      () => this.loading = false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  submit() {
  }

  private getLookups() {
    this.lookupService.getLookupsByType2([
      LookupTypes.PaymentMethod
    ])
      .subscribe(
        res => { this.fillLookups(res); },
        _err => { console.log('Error'); },
        () => {
          console.log('complete');
        });
  }


  paymentMethodId: any;
  private fillLookups(data: any) {
    data.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        case LookupTypes.PaymentMethod: this.PaymentMethodList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try { value = element[defVal].id; } catch (error) { }
        //  console.log("Value=" + value);
          this.paymentMethodId = value;

         // this.PaymentformGroup.get("dtlForm").get('paymentMethodId').setValue(1201);
         // this.getChequeDetails.get('paymentMethodId').setValue(value);
          break;
      }
      // this.PaymentMethodList.push({label:element})
    });
  }

  submitPayment() {

    // this.sumvalue();
    // if (this.PaymentformGroup.get('paymentMethodId').value == '1201' && this.PaymentformGroup.get('credit').value != this.summedChequesValues) {
    //   this.credit.setErrors({ total: false });
    // } else {
    //   this.credit.setErrors(null);
    // }

    // if (!this.PaymentformGroup.valid) {
    //   this.validator.markFormTouched(this.PaymentformGroup);
    //   return;
    // }



    this.loading = true;
    this.edit ? this.updatePayment() : this.addPayment();
  }





  addPayment() {

    //console.log('optionValue=' + this.optionValue);
    const id = this.optionValue != null ? this.optionValue.id : '';
   // console.log('optionValue.id=' + id);
    // paymentMethodId: new FormControl(this.optionValue1);
   // console.log(this.PaymentformGroup.value);
   // console.log('222');
    this.studentFeeService.addStudentFee(this.PaymentformGroup.value).subscribe(
      res => {
        this.event.emit(this.PaymentformGroup.value);
        this.dialogRef.close(this.PaymentformGroup.value);
       // console.log(res);

      },
      err => {
        console.log('errrrrrr...' + err);
      }
    );
  }


  addPaymentAndPrint() {


    // this.sumvalue();
    // tslint:disable-next-line:max-line-length
    // if (this.PaymentformGroup.get('paymentMethodId').value == "1201" && this.PaymentformGroup.get('credit').value != this.summedChequesValues) {
    //   this.credit.setErrors({ total: false });
    // } else {
    //   this.credit.setErrors(null);
    // }

    if (this.PaymentformGroup.get('credit').value !== this.summedChequesValues ) {
      this.credit.setErrors({ total: false });
    } else {
      this.credit.setErrors(null);
    }

    if (!this.PaymentformGroup.valid) {
      this.validator.markFormTouched(this.PaymentformGroup);
      return;
    }

    console.log(this.PaymentformGroup.value);
    
    this.studentFeeService.addStudentFee(this.PaymentformGroup.value).subscribe(
      res => {
        this.event.emit(this.PaymentformGroup.value);
        this.dialogRef.close(this.PaymentformGroup.value);
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


  getPaymentInfo(id: number) {
    //console.log('getPaymentInfo id=' + id);
    return this.studentFeeService.getStudentFeeById(id).subscribe(res => {
      this.vouchReport = res;
      this.service.orignalCopy = '';
      this.printPayment(id);

    },
      err => {
      console.log('getPaymentInfo: ' + err);
    });
  }

  printPayment(id) {
    // this.getPaymentInfo(id);
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
  updatePayment() {
   
    this.studentFeeService.updateStudentFee(this.id, this.PaymentformGroup.value).subscribe(
      res => {
        this.dialogRef.close(this.PaymentformGroup.value);
      },

      err => {
        console.log(err)
        //  console.log('------------------------------dd---------'),
       //   console.log(this.PaymentformGroup.value);
      }
    );
  }

  ngOnInit() {
    this.summedChequesValues = 0;
    this.setupUpdate();
    this.getChildrenList();
    this.getLookups();
    // if (!this.id == null) {
    //   this.getPaymentChequeList();
    // }


    this.addCheque();

  }





  sumvalue() {
   console.log(this.PaymentformGroup.get('credit').value + '*********************');

    this.PaymentformGroup.get('PaymentDetail').valueChanges.subscribe(values => {
      // reset the total amount
      this.summedChequesValues = 0;
      const ctrl = <FormArray>this.PaymentformGroup.controls['PaymentDetail'];
      // iterate each object in the form array
      ctrl.controls.forEach(x => {
        // get the itemmt value and need to parse the input to number
        let parsed = parseInt(x.get('credit2').value);
        // add to total
        this.summedChequesValues += parsed;
        this.PaymentformGroup.get("credit").setValue(this.summedChequesValues);
       // console.log('this.summedChequesValues' + this.summedChequesValues);


      });
    });

  }

  onStudChange() {
    const studId = this.PaymentformGroup.get('studentId').value;
    return this.repService.getStudCardDataVw(this.yearId, studId)
      .subscribe(res => {
        this.studInfo = res;
        this.PaymentformGroup.get('sectionId').setValue(res.sectionName);
        this.PaymentformGroup.get('sectionId2').setValue(res.className);
        this.PaymentformGroup.get('sectionId3').setValue(res.classSeqName);
        this.PaymentformGroup.get('finItemId').setValue(this.finItemDefault);
        this.PaymentformGroup.get('finSubItemId').setValue(this.finSubItemDefault);
        this.PaymentformGroup.get('credit').setValue(0);
        this.PaymentformGroup.get('note').setValue(null);
        this.setNote(this.finItemDefault);
        this.deleteAllCheques();
       
      });

  }


  payCheck() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = this.appSettings.settings.rtl ? 'rtl' : 'ltr';
    dialogConfig.data = { id: 0, };
    const dialogRef = this.dialog.open(PaymentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
     // console.log(this.service.sParentId);

    }
    );
  }


  addCheque() {
    this.addNewCheque = this.getChequeDetails.valid;

  
      // console.log(this.getChequeDetails.controls["chequeValue"].value)

      const dtl = this.fb.group({
        id: [0],
        chequeNo: [null],
        chequeDate: [null],
        credit2: [0,[Validators.required]],
        debit: [0],
        bankId: [null],
        chequeWoner: [this.service.sParentName],
        paymentMethodId: [[Validators.required]],
        transferNo: [null]
      });
    
    // if(this.summedChequesValues===0 && this.firstTime>0)
    // this.getChequeDetails.setErrors({ 'invalid': true });
    
      if (this.getChequeDetails.valid) {
      this.getChequeDetails.push(dtl);
        this.firstTime = 1;
  // console.log(this.finItemDefault);
    //  dtl.get('paymentMethodId').setValue(this.finItemDefault);

   
      //console.log(" valid");
    }
      else {  //console.log("not valid");
      }


    this.sumvalue();
  }

  deleteCheque(i) {
    this.getChequeDetails.removeAt(i);
  }

  deleteAllCheques() {
    this.chequeValue = 0;
    // this.paymentValue = 0;
    this.getChequeDetails.controls = [];
    this.getChequeDetails.reset();
    this.addCheque();
  }

  setNote(id: any) {

    let  item = this.PaymentformGroup.get('finItemId').value;
    let  subitem = this.PaymentformGroup.get('finSubItemId').value;
    let val: any;
    let val2: any;
    
    try {

      let i = this.finItemList.findIndex(p => p.id === item);
      val = this.finItemList[i].desc;
      val2 = i + ' / ' + this.yearName;
      this.PaymentformGroup.get('note').setValue(val2);

    } catch (error) { console.log("error1...") }
     
    try {
      if (this.reportId === 2) {
         let sub = this.finItemSubList.findIndex(p => p.id === subitem);
          sub = this.finItemSubList[sub].desc;
         val = val + " - " + sub;
      } 
      val = val + ' / ' + this.yearName;
      this.PaymentformGroup.get('note').setValue(val);
      
    } catch (error) { console.log("error2...") }

  }

  //-- Get Voucher Type

  voucherTypeId: any;
   private getVoucherType() {
    this.lookupService.getLookupsByType(40)
      .subscribe(res => {
        this.VoucherTypeList = res;
        this.voucherTypeId = this.VoucherTypeList
          .filter(f => this.reportId===1?f.value === '2': f.value === '4')
          .map(m => m.id).toString();
        console.log("+ voucherTypeId=" + this.voucherTypeId);
        this.initForm();
      });
  }

}
