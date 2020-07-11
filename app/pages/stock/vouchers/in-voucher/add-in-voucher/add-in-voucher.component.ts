import { Component, OnInit, Inject, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { StockService } from '../../../stock.service';
import { Items } from 'src/app/Models/Stock/Items';
import { VoucherService } from '../../voucher.service';
import { ValidationBase } from 'src/app/validationBase';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { jqxDropDownButtonComponent } from 'jqwidgets-ng/jqxdropdownbutton';
import { Router } from '@angular/router';
import { empty } from 'rxjs';


@Component({
  selector: 'app-add-in-voucher',
  templateUrl: './add-in-voucher.component.html',
  styleUrls: ['./add-in-voucher.component.scss']
})
export class AddInVoucherComponent implements AfterViewInit {
  @Output() event = new EventEmitter<any>(true);
  @ViewChild('jqxSourceId') jqxSourceId: jqxInputComponent;
  @ViewChild('jqxSupplierName') jqxSupplierName: jqxInputComponent;
  @ViewChild('jqxPaymentMethodId') jqxPaymentMethodId: jqxDropDownListComponent;
  @ViewChild('jqxItemId') jqxItemId: jqxDropDownListComponent;
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('myDropDownButton') myDropDownButton: jqxDropDownButtonComponent;
  public formGroup: FormGroup;
  schoolId: any;
  yearId: any;
  testi:any;
  sourceName: any;
  totalP:number;
  sourceId: number;
  totalPrice:number;
  accept=true;
  manualVoucherAmt:number;
  constructor(private currentUserService: CurrentUserService,
    private fb: FormBuilder,
    private lookupService: LookupsApiService,
    private stockService: StockService,
    private service: VoucherService,
    private router: Router,
    public dialogRef: MatDialogRef<AddInVoucherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.yearId = currentUser.yearId;
    this.sourceName = this.data.SourceName;


    this.getPaymentMethodList();
    this.getAllItemsList();

  }

  ngOnInit() {
    this.initForm();
    this.addItem();

  }
  ngAfterViewInit() {
    this.jqxPaymentMethodId.selectIndex(0);

  }
  ngAfterViewChecked() {
    this.jqxSupplierName.val(this.sourceName);
  }

  test() {
    console.log("supplierName=" + this.sourceName)
    this.jqxSupplierName.val(this.sourceName);
    let xxx = this.jqxSourceId.value();
    console.log("jqxSourceId=" + xxx);
    console.log("this.data.sourceId=" + this.data.sourceId);
  }

  initForm() {
    let myDate = new Date();
    this.formGroup = this.fb.group(
      {
        id: [0],
        ManualVoucherId:[null],
        ManualVoucherAmt:['',Validators.required],
        voucherTypeId: [1335],
        voucherDate: [myDate],
        sourceTypeId: [1332],
        sourceId: [this.data.sourceId],
        yearId: [this.yearId],
        schoolId: [this.schoolId],
        voucherStatusId: [null],
        paymentMethodId: [null],
        note: ["سند إدخال من مورد"],
        StrVoucherDtl: this.fb.array([]),

      }
    );
  }


  PaymentMethodList: any;
  getPaymentMethodList() {
   
    return this.lookupService.getLookupsByType(45).subscribe(res => {
      this.PaymentMethodList = res.map(m => ({ id: m.id, name: m.name }))
    });
  }
  ItemList: any;

  getAllItemsList() {
    return this.stockService.getAllItemsList(0).subscribe(res => {
      this.ItemList = res.map(m => ({ id: m.id, itemName: m.itemName, className: m.className, grpName: m.grpName, type: m.type, itemNames: m.id + ' | ' + m.grpName + ' | ' + m.itemName + ' | ' + m.className }));
      console.log(res);
    });
  }

  onItemChange(event: any) {

    let item = event.args.item;

    console.log("item=" + item.value);
    console.log("2val=" + item);

    console.log("4val=" + item.label);
    console.log("5val=" + event.args.value);
  }

  addNewItem: boolean = false;
  addItem() {
 
    // console.log('event',event);
    this.addNewItem = this.getItemDetails.valid;
    let xitemId = this.ItemList != null ? this.ItemList[0].id : 1;
    const dtl = this.fb.group({
    
      id: [0],
      itemId: [xitemId],
      qty: [1, [Validators.required]],
      costPrice: [null, [Validators.required]],
      payPrice: [null, [Validators.required]],
     
    });

    if (this.getItemDetails.length > 0 && this.addNewItem == true)
      this.getItemDetails.push(dtl);
    if (this.getItemDetails.length == 0)
      this.getItemDetails.push(dtl);
      this.sumValues();
  }

  deleteItem(i) {
     if (this.getItemDetails.length >1)
        this.getItemDetails.removeAt(i);  
  }
  // aa(){
  //   console.log("eeeeeee");
    
  // }

  get getItemDetails() {
    return this.formGroup.get('StrVoucherDtl') as FormArray;
  }
 
  saveVoucher() { 


    this.addNewItem = this.getItemDetails.valid;
    if (this.addNewItem == true)
      this.service.AddItems(this.formGroup.value).subscribe(res => {
        //  this.event.emit(this.formGroup.value);
        this.dialogRef.close(this.formGroup.value);
        this.sourceId = this.formGroup.value.sourceId;
        console.log('source id',this.sourceId);



        let sourceTypeId = 1332;
    return this.service.getInVouchersList(this.schoolId, this.yearId, sourceTypeId, this.sourceId)
      .subscribe(res => {
        let i;
        let x;
        for(i=0;i<res.length;i++){
            x=i;
        }
        console.log('res.masterid =', res[x].masterId);
      let  masterId=res[x].masterId;
        let rep1Url = '/reports/stock/' + masterId;
        this.router.navigateByUrl(rep1Url);
      });
      });
    
  }
  submit() {

  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  //
  renderer = (index: number, label: string, value: any): string => {
    let grpName;
    let className;
    let typeName;
    let itemName;
    try {
      grpName = this.ItemList[index].grpName;
      className = this.ItemList[index].className;
      typeName = this.ItemList[index].type;
      itemName = this.ItemList[index].itemName;
    }
    catch (exception) { }
    let table = '<table align="right" dir="rtl" width="100%"><tr>' +
      '<td align="right" style="width: 20px;">' + value + '</td>' +
      '<th align="right" style="width: 100px;">' + grpName + ' | ' + itemName + '</th>' +
      '<td align="right" style="width: 80px;">' + className + '</td>' +
      '</tr></table>';
    return table;
  };

    get StrVoucherDtl(){
     return this.formGroup.get('StrVoucherDtl') as FormArray;
   }

   calc(event,index){
    let qty = this.StrVoucherDtl.controls[index].get('qty').value;
    let costPrice = this.StrVoucherDtl.controls[index].get('costPrice').value;

    this.totalPrice=qty*costPrice;
   
    console.log('totalPrice='+this.totalPrice);
    this.StrVoucherDtl.controls[index].get('payPrice').setValue(this.totalPrice);
    // control.get.//get('payPrice');
 this.sumValues
   }
   sumValues() {
    
     this.accept=true;
     if( this.totalP == this.formGroup.value.ManualVoucherAmt){
      this.accept=false;
       
     }
    this.formGroup.get('StrVoucherDtl').valueChanges.subscribe(values => {


    
      this.totalP = 0;

      const ctrl = <FormArray>this.formGroup.controls['StrVoucherDtl'];
      ctrl.controls.forEach(x => {
        
        const xtotalP = x.get('payPrice').value;

       
        this.totalP += xtotalP;
        this.accept=true;
        if( this.totalP == this.formGroup.value.ManualVoucherAmt){
          this.accept=false;
           
         }
      
      
      });
    });

  }
}
