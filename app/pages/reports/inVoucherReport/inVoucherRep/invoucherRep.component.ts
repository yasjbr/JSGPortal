import { Component, OnInit, ViewChild } from '@angular/core';
import { VoucherService } from 'src/app/pages/stock/vouchers/voucher.service';
import { InVoucherDtl } from 'src/app/Models/Stock/inVoucherDtl';
import { ReportsService } from '../../reports.service';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DateFormat } from 'src/app/pages/financial/payment/date-format';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { Router, ActivatedRoute } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-invoucherRep',
  templateUrl: './invoucherRep.component.html',
  styleUrls: ['./invoucherRep.component.scss']
})
export class invoucherRepComponent implements OnInit {
  @ViewChild('jqxSupplierName') jqxSupplierName: jqxInputComponent;
  dataList: InVoucherDtl[];
  paymentMethodN: string;
  voucherNumber: number ;
  supplier: string ;
  name: string;
  schoolId: any;
  image: any;
  Total: number;
  public form: FormGroup;
  public DateAndTime = new Date();
  voucherDate: Date = null;



  constructor(
    private service: VoucherService,
    private reportsService: ReportsService,
    private currentUserService: CurrentUserService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router

  ) {
    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
  }

  ngOnInit() {
    this.iniForm();
    this.getImage();

    this.route.params.subscribe(params => {
      // console.log('!paramsID = ',!params.id);
      
      if (!params.id) {
        return;
      }
      this.getvoucherbyid();
    });
  }
  print(div) {
    this.reportsService.print(div);
  }

  iniForm() {
    this.form = new FormGroup({
      voucherid: new FormControl('', Validators.required),
      // voucherNumber: new FormControl(null),
      // voucherDate: new FormControl(null),
      // supplier: new FormControl(null),
      // paymentMethodN: new FormControl(null),

    });

  }
  public get errName(): AbstractControl {
    return this.form.get("voucherid");
  }



  changeUrl() {
    let rep1Url = '/reports/stock';
    this.router.navigateByUrl(rep1Url);
  }
  supplierName: any;
  getvoucherbyid() {
   let data=this.form.value.voucherid;
    console.log('voucher id',data);
    let masterId;
    this.route.params.subscribe(params => {
      if (data) {
        masterId = data;
         return masterId;
      }
      masterId = params.id;
    });

    console.log("masterId=" + masterId)
    //let 
    // masterId=this.form.value.voucherid;

    return this.service.GetVoucherById(masterId).subscribe(res => {
      this.dataList = res;
      console.log(res);
      this.voucherNumber = this.dataList[0].masterId;
      this.paymentMethodN = this.dataList[0].paymentMethodN;
      this.voucherDate = this.dataList[0].voucherDate;
      this.supplierName = this.dataList[0].supplier;
      console.log("supplierName=" + this.supplierName);

      this.Total = this.getTotal();
    }, err => {
      this.iniForm();
      console.log(err);
    })

  }

  getTotal() {
    let total = 0;
    let amount = 1;
    for (let i = 0; i < this.dataList.length; i++) {
      // console.log("res = ", this.StudentCountList[i].studCount);
      amount = this.dataList[i].costPrice * this.dataList[i].qty;
      // console.log('amount', amount);
      total += amount;
    }
    return total;
  }



  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
