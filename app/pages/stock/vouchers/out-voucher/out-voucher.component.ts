import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { users } from 'src/app/Models/Users/users';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { StockService } from '../../stock.service';
import { VoucherService } from '../voucher.service';
import { jqxComboBoxComponent } from 'jqwidgets-ng/jqxcombobox';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { SelectComponent } from 'src/app/pages/form-controls/select/select.component';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { Router } from '@angular/router';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { max } from 'rxjs/operators';
import { Items } from 'src/app/Models/Stock/Items';



@Component({
  selector: 'app-out-voucher',
  templateUrl: './out-voucher.component.html',
  styleUrls: ['./out-voucher.component.scss']
})
export class OutVoucherComponent implements OnInit {
  itemList: Items;
  x: any;
  constructor(private currentUserService: CurrentUserService,
    private studentService: StudentService,
    private classService: ClassService,
    private parentService: RegParentService,
    private fb: FormBuilder,
    private stockService: StockService,
    private service: VoucherService,
    private lookupService: LookupsApiService,
    private router: Router) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.schoolId = currentUser.schoolId;
    this.yearId = currentUser.yearId;
  }


  @ViewChild('jqxClassList') jqxClassList: jqxDropDownListComponent;
  @ViewChild('jqxStudList') jqxStudList: jqxDropDownListComponent;
  @ViewChild('jqxItemList') jqxItemList: jqxDropDownListComponent;  // jqxCostPrice
  @ViewChild('jqxtotalPrice') jqxtotalPrice: jqxInputComponent;
  @ViewChild('jqxParentList') jqxParentList: jqxComboBoxComponent;
  @ViewChild('jqxItemTypeList') jqxItemTypeList: jqxDropDownListComponent;
  @ViewChild('jqxTermsList') jqxTermsList: jqxDropDownListComponent;

  public formGroup: FormGroup;
  schoolId: any;
  yearId: any;
  // sourceId: any;
  classId: any = 0;
  regStudentList: any;
  classList: any;
  parentList: any;
  ItemList: any;
  ItemsListByFilter: any;
  grpList: any;
  termsList: any;
  itemId: any;
  n = -1;
  bookList: any;
  xBookList: any[] = [];
  studBookList: any;
  addNewItem = false;
  Qty: any;
  payPrice: any;
  books = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  submitted = false;
  PaymentMethodList: any;
  parentId: any;
  parentErr = false;
  priceErr = true;
  ngOnInit() {
    this.getGrpList();
    this.getPaymentMethodList();
    this.getTermsList();
    this.getParentList();
    // this.getClassList();
    this.getAllItemsList();
    this.initForm();
    this.getBookList(0);
    // this.addItem(0, 0, 0, 0, 0, 0, 0);
  }
  get getItemDetails() {
    return this.formGroup.get('StrVoucherDtl') as FormArray;
  }



  // Get From Services
  // getClassList() {
  //   return this.classService.GetClassBySchool(this.schoolId).subscribe(res => {
  //     this.classList = res.map(m => ({ id: m.id, name: m.name }));
  //     this.getRegStudentList(res[0].id);
  //   });
  // }


  // getParentList() {
  //   this.parentService.GetParentByNoDebt().subscribe(res => {
  //     console.log('res', res);

  //     this.parentList = res;

  //     this.parentId = null;

  //     this.submitted = false;


  //   });
  // }

getParentList(){
  return this.parentService.GetParentByCommitStudentList().subscribe(res=>{
    this.parentList = res;
    this.parentId = null;
    this.submitted = false;
  })
}
  getRegStudentList(event) {
    this.submitted = false;

    this.getItemDetails.controls = [];
    this.parentId;
    try {
      this.parentId = event.args.item.value;
    } catch (exception) { }
    if (this.parentId != null) {
      this.addItem(null, null, null, null, null, null, null);
      this.studentService.GetRegStudentList(this.schoolId, this.yearId, this.parentId).subscribe(res => {
        this.regStudentList = res.map(m => ({
          firstName: m.firstName + ' | ' + m.className, studName: m.studName, classId: m.classId,
          className: m.className
        }));
        this.jqxStudList.selectIndex(0);
      });
    }

  }

  getAllItemsList() {
    return this.stockService.getAllItemsList(0).subscribe(res => {
      this.ItemList = res.map(m => ({
        id: m.id, itemName: m.itemName, className: m.className,
        grpName: m.grpName, type: m.type, itemNames: m.id + ' | ' + m.grpName + ' | ' + m.itemName + ' | ' + m.className
      }));
    });
  }


  getItemListByFilter() {
    return this.stockService.getItemListByFilter(this.formGroup.value).subscribe(res => {
      this.ItemsListByFilter = res;
      this.n = -1;
      this.ItemsListByFilter.forEach(p => {
        let price = p.payPrice * 1;
        this.addItem(p.itemId, p.itemName, p.className, p.itemTypeName, p.remQty, p.payPrice, price);
        this.n = this.n + 1;
        // try {
        //   this.getItemDetails.at(this.n).get('itemId').patchValue(p.itemId);
        //   this.getItemDetails.at(this.n).get('itemName').patchValue(p.itemName);
        //   this.getItemDetails.at(this.n).get('className').patchValue(p.className);
        //   this.getItemDetails.at(this.n).get('itemTypeName').patchValue(p.itemTypeName);
        //   this.getItemDetails.at(this.n).get('remQty').patchValue(p.remQty);
        //   this.getItemDetails.at(this.n).get('costPrice').patchValue(p.costPrice);
        //   this.getItemDetails.at(this.n).get('payPrice').patchValue(p.payPrice);
        // } catch (exception) { }
      });
    });
  }
  getPaymentMethodList() {
    return this.lookupService.getLookupsByType(45).subscribe(res => {
      this.PaymentMethodList = res.map(m => ({ id: m.id, name: m.name }));
    });
  }
  getGrpList() {
    return this.lookupService.getLookupsByType(50).subscribe(res => {
      this.grpList = res.map(m => ({ id: m.id, name: m.name }))
      this.grpList[this.grpList.length] = { id: 6, name: "select All" };

      console.log(this.grpList.id);
    }
    );
  }
  getTermsList() {
    return this.lookupService.getLookupsByType(34).subscribe(res =>
      this.termsList = res.map(m => ({ id: m.id, name: m.name }))
    );
  }

  showBooksList() {
    const xItemTypeList = this.jqxItemTypeList.getCheckedItems();
    const xClassList = this.jqxStudList.getCheckedItems();
    const xTermsList = this.jqxTermsList.getCheckedItems();
    const arItemTypeList = [];
    const arClassList = [];
    const arTermsList = [];
    xItemTypeList.map(m => arItemTypeList.push(m.value));
    xClassList.forEach(m => {
      arClassList.push(m.value);
      // For Boys and Girls Classes, must be change to become more dynamic
      if (m.value >= 12 && m.value <= 21) { arClassList.push(m.value + 10); }
      if (m.value >= 22 && m.value <= 31) { arClassList.push(m.value - 10); }

    });
    xTermsList.map(m => arTermsList.push(m.value));
    this.formGroup.setControl('itemTypeId', this.fb.array(arItemTypeList));
    this.formGroup.setControl('classId', this.fb.array(arClassList));
    this.formGroup.setControl('termId', this.fb.array(arTermsList));

    this.getItemDetails.controls = [];
    this.getItemListByFilter();
  }

  getBookList(classId) {
    const model = { termId: null, grpId: null, ItemTypeId: null, classId: null, schoolId: this.schoolId, yearId: this.yearId };
    this.service.getBooksList(model, classId).subscribe(res => {
      this.bookList = res;
      this.xBookList = res.map(m => ({
        itemId: m.itemId, itemName: m.itemName, xName:
          m.className + ' [ ' + m.itemId + ' ] ' + m.itemName
      }));
    });
  }

  // getStudBooksList() {
  //   this.service.getBooksList(this.formGroup.value).subscribe(res => {
  //     this.studBookList = res;

  //     res.forEach(p => {
  //       this.addItem(p.itemId);
  //       this.n = this.n + 1;
  //       try {
  //         this.getItemDetails.at(this.n).get('itemName').patchValue(p.itemName);
  //         this.getItemDetails.at(this.n).get('className').patchValue(p.className);
  //         this.getItemDetails.at(this.n).get('itemTypeName').patchValue(p.itemTypeName);
  //         this.getItemDetails.at(this.n).get('remQty').patchValue(p.remQty);
  //         this.getItemDetails.at(this.n).get('costPrice').patchValue(p.costPrice);
  //         this.getItemDetails.at(this.n).get('payPrice').patchValue(p.payPrice);
  //       } catch (exception) { }
  //     });

  //   });
  // }

  // Ini Forms
  initForm() {
    // let parentId;
    // try {
    //   parentId = this.jqxParentList.getSelectedItem().value;
    // } catch (exception) { }

    const myDate = new Date();
    this.formGroup = this.fb.group(
      {
        id: [0],
        voucherTypeId: [1336], // سند بيع كتب وملابس
        voucherDate: [myDate],
        sourceTypeId: [1333], // طالب
        sourceId: [this.parentId, [Validators.required]],
        classId: this.fb.array([]),
        yearId: [this.yearId],
        schoolId: [this.schoolId],
        voucherStatusId: [null],
        paymentMethodId: [null],
        note: ['سند  بيع كتب '],
        termId: this.fb.array([]),
        grpId: [0],
        itemTypeId: this.fb.array([]),
        StrVoucherDtl: this.fb.array([]),
        // costPrice: [0],
        totalQty: [0],
        totalRemQty: [0],
        totalPrice: [0],
        totalPay: [0],
        PayedAmt: [null, [Validators.required]],
        RemainingAmt: [0]
      }
    )
  };
  get PayedAmt() { return this.formGroup.get('PayedAmt'); }
  get sourceId() { return this.formGroup.get('sourceId'); }
  submit() {
    this.submitted = true;
    console.log(this.formGroup);
  }

  saveVoucher() {

    // this.formGroup.get('RemainingAmt').setValue(0);
    // this.formGroup.value.PayedAmt = 0;

    this.addNewItem = this.getItemDetails.valid;
    const valid = this.formGroup.valid;
    this.formGroup.removeControl('classId');
    if (this.addNewItem === true && valid === true && this.formGroup.get('RemainingAmt').value==0) {
      this.service.AddItems(this.formGroup.value).subscribe(res => {
      });


    
    }
    this.ref();
  }

ref(){
  const sourceTypeId = 1333;
  return this.service.getInVouchersList(this.schoolId, this.yearId, sourceTypeId, this.formGroup.value.sourceId).subscribe(res => {
   
    
    let i;
    let x;
    for (i = 0; i < res.length ; i++) {
      x = i;
    }

    const masterId = res[x].masterId;

    const rep1Url = 'reports/outvoucher/' + masterId;
    this.router.navigateByUrl(rep1Url);


  });
}
  addItem(_itemId, _itemName, _className, _itemTypeName, _remQty, _payPrice, _price) {
    this.submitted = true;

    this.formGroup.value.sourceId = this.parentId;
    console.log('form111', this.formGroup.value.sourceId);

    if (this.formGroup.value.sourceId != null) {
      this.sumValues();
      this.addNewItem = this.getItemDetails.valid;
      const dtl = this.fb.group({
        id: [0],
        itemId: [_itemId, [Validators.required]],
        itemName: [_itemName],
        className: [_className],
        itemTypeName: [_itemTypeName],
        remQty: [_remQty],
        qty: [1],
        payPrice: [_payPrice],
        // costPrice: [''],
        price: [_price]
      });


      if (this.getItemDetails.length > 0 && this.addNewItem === true) {
        this.getItemDetails.push(dtl);
      }
      if (this.getItemDetails.length === 0) {
        this.getItemDetails.push(dtl);
      }
      this.parentErr = false;
    }
    else {
      this.parentErr = true;
      this.submitted = false;
    }

    // this.sumValues();
  }

  deleteItem(i) {
    this.getItemDetails.removeAt(i);
    this.reset();
  }
  addStudBooks() {

    this.getItemDetails.controls = [];
    this.studBookList.forEach(p => {
      this.addItem(null, null, null, null, null, null, null);
    });
  }

  cancelVaoucher() {
    console.log('ww');
    // this.sumValues();
    this.submitted = false;

    this.getItemDetails.reset();
    this.getItemDetails.controls = [];
    this.reset();
  }

  getItembyItemId($event, _index) {
    this.submitted = false;
    return this.stockService.GetItembyItemId($event.itemId).subscribe(res => {
      if (res != null) {
        this.itemList = res;
        this.onItemChange($event, _index);
        this.onQtyhange(_index);
        console.log(this.itemList.payPrice, 'dddsas');
      }
    })

  }
  onItemChange($event, _index) {
    this.sumValues();
    const itemId = $event.itemId;

    console.log('ddddttttt', this.itemList.itemName);

    const itemIdIndex = this.bookList.findIndex(i => i.itemId === itemId);
    console.log('dddddd', itemId);
    console.log(this.itemList);
    // this.bookList[itemId]
    this.getItemDetails.at(_index).get('itemName').setValue(this.itemList.itemName);
    this.getItemDetails.at(_index).get('itemTypeName').setValue(this.itemList.typeName);
    this.getItemDetails.at(_index).get('className').setValue(this.itemList.className);
    try {
      this.getItemDetails.at(_index).get('remQty').setValue(this.itemList.qty);
      // this.getItemDetails.at(_index).get('costPrice').setValue(this.itemList.costPrice);
      this.getItemDetails.at(_index).get('payPrice').setValue(this.itemList.payPrice);
    } catch (exception) {
      this.getItemDetails.at(_index).get('remQty').setValue(0);
      // this.getItemDetails.at(_index).get('costPrice').setValue(0);
      this.getItemDetails.at(_index).get('payPrice').setValue(0);
    }
  }


  onQtyhange(_index) {
    console.log('index', _index);
    console.log('value price', this.getItemDetails.at(_index).get('price').value);
    console.log('value payPrice', this.getItemDetails.at(_index).get('payPrice').value);
    console.log('value payPrice', this.getItemDetails.at(_index).get('qty').value);
    this.payPrice = this.getItemDetails.at(_index).get('payPrice').value;
    this.Qty = this.getItemDetails.at(_index).get('qty').value;
    console.log("qqq", this.Qty
    );
    let price: number = this.payPrice * this.Qty
      ;
    console.log("payPrice=" + this.payPrice + "     qty=" + this.Qty
      + "   price=" + price);
    try {
      this.getItemDetails.at(_index).get('price').setValue(price);
    } catch (exception) {
      this.getItemDetails.at(_index).get('price').setValue(0);
    }
    this.sumValues();
  }


  totalRemQty = 0;
  totalQty = 0;
  totalPrice = 0;
  totalPay = 0;





  sumValues() {


    this.formGroup.get('StrVoucherDtl').valueChanges.subscribe(values => {

      this.priceErr = true;
      this.totalRemQty = 0;
      this.totalQty = 0;
      this.totalPrice = 0;
      this.totalPay = 0;

      const ctrl = <FormArray>this.formGroup.controls['StrVoucherDtl'];
      console.log('formarray ', ctrl);

      ctrl.controls.forEach(x => {


        if (x.get('price').value == 0 || x.get('price').value == null ) {
          this.priceErr = false;
        }
        //this.priceErr =true;
        const xRemQty = parseInt(x.get('remQty').value);
        const xQty = parseInt(x.get('qty').value);
        const xTotalPrice = x.get('price').value;
        console.log('xTotalPrice', xTotalPrice);
        const xPayPrice = parseFloat(x.get('payPrice').value);
        this.totalRemQty += xRemQty;
        this.totalQty += xQty;
        this.totalPrice += xTotalPrice;
        this.totalPay += xPayPrice;
        this.formGroup.get("totalRemQty").setValue(this.totalRemQty);
        this.formGroup.get("totalQty").setValue(this.totalQty);
        if (xTotalPrice != null) {
          this.formGroup.get("totalPrice").setValue(this.totalPrice);
        }
        if (xPayPrice != null) {
          this.formGroup.get("totalPay").setValue(this.totalPay);
        }
      });
    });
    this.onAmtChange();
  }
  onAmtChange() {
   
    if (this.formGroup.value.PayedAmt != null) {
      let y = 0;
      y = this.formGroup.get("totalPrice").value - this.formGroup.value.PayedAmt;
      console.log('yyyy', y);
    
        this.formGroup.get('RemainingAmt').setValue(y);
     
        if(this.formGroup.get('RemainingAmt').value!=0){
          this.priceErr=false;
        }else{
          this.priceErr=true;
        }
    }
  }
  reset() {
    this.parentId = '';

    console.log('form2222', this.formGroup.value.sourceId, 'end form');
    this.formGroup.get("PayedAmt").setValue(0);
    this.formGroup.get("RemainingAmt").setValue(null);
    this.formGroup.get("totalPrice").setValue(0);
    this.parentList = '';

    this.getParentList();
    this.regStudentList = '';
    // this.PaymentMethodList='';
    // this.getPaymentMethodList();
    // this.termsList='';
    this.getTermsList();
    this.getGrpList();

  }
}