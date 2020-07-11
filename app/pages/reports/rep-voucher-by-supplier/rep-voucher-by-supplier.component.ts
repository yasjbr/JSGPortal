import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../reports.service';
import { studentNationalData } from 'src/app/Models/Reg/Reports/studentNationalData';
import { NationalrepService } from '../by-nationality/nationalrep.service';
import { SchoolService } from '../../addLookups/schools/school.service';
import { Items } from 'src/app/Models/Stock/Items';
import { StockService } from '../../stock/stock.service';
import { coustmservice } from '../coustomer-voucher-Rep/coustomer-voucher-rep/coustmservice';
import { VoucherService } from '../../stock/vouchers/voucher.service';
import { SupplierService } from '../../supplier/supplier.service';
import { Suppliers } from 'src/app/Models/Stock/Suppliers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rep-voucher-by-supplier',
  templateUrl: './rep-voucher-by-supplier.component.html',
  styleUrls: ['./rep-voucher-by-supplier.component.scss']
})
export class RepVoucherBySupplierComponent implements OnInit {
  StudentList: studentNationalData[];
  public DateAndTime = new Date();
  name: string;
  form: FormGroup;
  image: any;
  dateFrom: Date;
  dateTo: Date;
  schoolId: any;
  ItemList: any;
  data: Items[];
  yearId: number = 0;
  Id: number;
  parentName: string;
  coustmservice: coustmservice[];
  parentId: any;
  Total: number;
  Suppliers: Suppliers[];
  _DateFrom: Date;
  _DateTo: Date;
  days: Date;
  dateT: any;
  dateF: any;


  constructor(
    private fb: FormBuilder,
    private nationalServ: NationalrepService,
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private stockService: StockService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private VoucherService: VoucherService,
    private route: ActivatedRoute,
    private service: SupplierService,

  ) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => currentUser = user);
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
    this.initForm();
  }

  ngOnInit() {

    this.GetSupplier();

    this.route.params.subscribe(params => {
      // console.log('!paramsID = ', params.id);

      if (!params.id) {
        return;
      }
      this.GetVoucherBySupplier();
    });


  }


  initForm() {
    this.form = this.fb.group({
      SupplierId: [''],
      DateFrom: [null],
      DateTo: [null],
    });
  }


  print(div) {
    this.reportsService.print(div);
  }

  GetSupplier() {
    return this.service.GetSupplier().subscribe(res => {
      this.Suppliers = res;
    }, err => {
      console.log("err");
    });
  }




  GetVoucherBySupplier() {

    let data = this.form.value.SupplierId;
    console.log('SupplierId', data);
    let masterId;
    this.route.params.subscribe(params => {
      if (data) {
        masterId = data;
        return masterId;
      }
      masterId = params.id;
    });



    let x = this.form.value;
    if (x.DateTo != null && x.DateFrom != null) {
      this.dateF = new Date(x.DateFrom).toISOString();
      this.dateT = new Date(x.DateTo).toISOString();
    } else {
      this.dateF = null;
      this.dateT = null
    }
    return this.VoucherService

      .GetVoucherBySupplier(masterId, this.dateF, this.dateT).subscribe(res => {
        this.coustmservice = res;
        this.Total = this.getTotal();

      }, err => {
        console.log("err");
      });



  }


  getTotal() {
    let total = 0;
    for (let i = 0; i < this.coustmservice.length; i++) {
      // console.log("res = ", this.StudentCountList[i].studCount);
      total += this.coustmservice[i].amount;
    }
    return total;
  }


  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = 'data:image/jpeg;base64,' + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}



