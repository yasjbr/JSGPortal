import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { StockService } from '../stock.service';
import { Items } from 'src/app/Models/Stock/Items';
import { DecimalPipe } from '@angular/common';
import { ValidationBase } from 'src/app/validationBase';
import { MatDialogRef } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-item-pay-price',
  templateUrl: './item-pay-price.component.html',
  styleUrls: ['./item-pay-price.component.scss']
})
export class ItemPayPriceComponent implements OnInit {
  public form: FormGroup;
  StrVoucherDtl: FormArray;
  loading = false;
  totalPrice: any;

  schoolId: any;
  yearId: any;
  schoolName: any;

  err = true;
  Price: any;
  @Output() event = new EventEmitter<Items>(true);
  itemList: Items[];
  constructor(
    private currentUserService: CurrentUserService,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private service: StockService,
  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.schoolId = currentUser.schoolId;
    this.schoolName = currentUser.arSchoolName;
    this.yearId = currentUser.yearId;
    this.getItem();
  }

  ngOnInit() {
    this.iniForm();
    this.addForm();
    // this.createItem();
  }
  iniForm() {
    this.form = this.formbuilder.group({

      // id: [0],
      // ItemName: [null, [Validators.required]],
      // CostPrice: [null, [Validators.required]],
      // ProfitPercent: [null, [Validators.required]],
      // PayPrice: [null, [Validators.required]],
      itemPayPricesVw: this.formbuilder.array([])
    });
  }
  // FormArr(): FormArray {
  //   return this.form.get("itemPayPricesVw") as FormArray
  // }

  newForm(): FormGroup {
    return this.formbuilder.group({
      itemPayPricesVw: this.formbuilder.array([]).push(this.formbuilder.group({
        itemId: [null, [Validators.required]],
        costPrice: [null],
        profitPercent: [null, [Validators.required]],
        payPrice: [''],
        schoolId:this.schoolId,
        yearId:this.yearId,
        transDate:new Date()

      })
      )
    })
  }

  addForm() {
    if (this.form.valid) {
      this.err = true;
      this.Price=0;
      this.FormArr.push(this.formbuilder.group({
        itemId: [null, [Validators.required]],
        costPrice: [null],
        profitPercent: [null, [Validators.required]],
        payPrice: [null, [Validators.required]],
        schoolId:this.schoolId,
        yearId:this.yearId,
        transDate:new Date()
      }));
     
    }
    else {
      this.err = false;
    }
  }
  removeForm(empIndex: number) {
    this.FormArr.removeAt(empIndex);
  }




  onSubmit() {
    console.log(this.form.value);
  }

  getItem() {
    return this.service.GetItemListForPrice().subscribe(res => {
      this.itemList = res;
      console.log('items', this.itemList);
    })
  }
  getItemPayPrice(itemId, index) {
 
    return this.service.GetItemPayPrice(itemId).subscribe(res => {
      if (res != null) {
        this.FormArr.controls[index].get('costPrice').setValue(res);

        this.Price = res;
        console.log('price', this.Price);
      }
      else{
        this.Price=0;
        this.FormArr.controls[index].get('costPrice').setValue(0);
      }
    }, err => {
      this.Price=0;
      this.FormArr.controls[index].get('costPrice').setValue(0);
      console.log('err');

    })
  }

  get FormArr(): FormArray {
    return this.form.get('itemPayPricesVw') as FormArray
  }

  getTotalPrice(ProfitPercent, index) {
    console.log('profit', ProfitPercent);
    this.totalPrice = this.Price + ((ProfitPercent * this.Price) / 100);
    this.FormArr.controls[index].get('payPrice').setValue(this.totalPrice);

  }

  submit2() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
    this.addItem();
    this.iniForm();

  }
  addItem() {
    this.service.AddItemPayPrice(this.form.value).subscribe(
      res => {
        this.event.emit(this.form.value);
      },
      err => console.log(err)
    );
  }

}
