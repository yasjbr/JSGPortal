import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/pages/stock/vouchers/voucher.service';
import { InVoucherDtl } from 'src/app/Models/Stock/inVoucherDtl';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../../reports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-outvoucherreport',
  templateUrl: './outvoucherreport.component.html',
  styleUrls: ['./outvoucherreport.component.scss']
})
export class OutvoucherreportComponent implements OnInit {
  DataString:String;
  duplication: any[];
  masterId: number;
  dataListT: InVoucherDtl[];
  paymentMethodN: string;
  voucherDate: Date;
  parentName: string;
  datanumber: number;
  elemnt: any;
  Qty: any;
  schoolId: any;
  image: any;
  Total: number;
  name: string;
  public form: FormGroup;
  TotalPrice: InVoucherDtl;
  // StringTotal: any;
  DateAndTime = new Date();
  constructor(
    private reportsService: ReportsService,
    private service: VoucherService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private currentUserService: CurrentUserService,
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
      // console.log('!paramsID = ', params.id);

      if (!params.id) {
        return;
      }
      this.getOutVoucherBookList();
    });
    this.duplication = ['ولي الأمر', 'أمين المستودع'];
  }
  iniForm() {
    this.form = new FormGroup({
      voucherid: new FormControl('', Validators.required),
    });
  }
  print(div) {
    this.reportsService.print(div);
  }
  public get errName(): AbstractControl {
    return this.form.get("voucherid");
  }

  test: any[] = [];
  test2: any[] = [];
  test3: any[] = [];
  data: any[] = [];
  classes: any;


  changeUrl() {
    let rep1Url = '/reports/outvoucher';
    this.router.navigateByUrl(rep1Url);
  }
  getOutVoucherBookList() {
    // this.masterId = this.form.value.voucherid;
    let data = this.form.value.voucherid;
    console.log('voucher id', data);
    let masterId;
    this.route.params.subscribe(params => {
      if (data) {
        masterId = data;
        return masterId;
      }
      masterId = params.id ;
    });

    console.log("masterId=" + masterId)

    return this.service.GetSeelingVoucherById2(masterId).subscribe(res => {
      this.dataListT = res;
      console.log(this.dataListT);
      this.masterId = this.dataListT[0].dataList[0].masterId;
      this.paymentMethodN = this.dataListT[0].dataList[0].paymentMethod;
      this.parentName = this.dataListT[0].dataList[0].parentName;
      this.voucherDate = this.dataListT[0].dataList[0].voucherDate;

      this.Qty = this.getQty();
      this.Total = this.getTotal();
      this.TotalAsString();
      // this.StringTotal = this.getTotalString();
    })
  }


  getQty() {
    let Qty = 0;


    let x = this.dataListT.map(m => m.dataList);
    console.log('sss', x);

    for (let i = 0; i < this.dataListT.length; i++) {
      for (let j = 0; j < this.dataListT[i].dataList.length; j++) {
        Qty += this.dataListT[i].dataList[j].qty;
        console.log('quantity', Qty);

      }

    }
    return Qty;

  }
 TotalAsString() {
    return this.service.getTotalString(this.Total).subscribe(res => {
      
this.DataString=res;
      console.log(this.DataString);
    }), error => {console.log(error);
    };

  }
  getTotal() {

    let amount = 0;


    for (let i = 0; i < this.dataListT.length; i++) {
      for (let j = 0; j < this.dataListT[i].dataList.length; j++) {
        amount += this.dataListT[i].dataList[j].price;
        console.log('quantity', amount);

      }

    }
    return amount;

  }

  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  /*
    getsellingVoucherbyid() {
      this.masterId = this.form.value.voucherid;
      return this.service.GetSeelingVoucherById(this.masterId).subscribe(res => {
        this.dataList = res;
        
        
        this.test=res.map(m=> ({classId:m.classId, className:m.className}));
       
       
  
        // this.test.forEach(f=>{
        //   // console.log("--"+f.classId)
        //   // console.log(this.test);
        //   // console.log("---")
  
        //   this.test2=res.filter(x=>x.classId===f.classId && x.classId===2)
        //   .map(m=>({classId:m.classId, className:m.className, itemName:m.itemName}))
         
        //   console.log(this.test2);
          
        // })
        
        
    //     this.test.map(item => item.classId)
    // .filter((value, index, self) => self.indexOf(value) === index)
    // console.log("--*")
    //     console.log(this.test)
        console.log("--*****")
  
  //       var ages = this.test.map(function(obj) { return obj.classId; });
  // ages = ages.filter(function(v,i) { return ages.indexOf(v) == i; });
  // console.log(ages);
  
       var classes  = this.test.map(obj=> {return obj.classId});
      //  console.log(classes);
      //  console.log("--=")
      this.test2=[];
       classes  = classes.filter(function(v,i) { return classes.indexOf(v) == i; })
       .map(obj=> ({ classId:obj, dataList:res}));
       this.classes=classes;
        // console.log(this.classes);
        
        
        // this.test.push(classes);
        
       this.classes.forEach(f=>{
        console.log("--"+f.classId+"   name="+f.className)
        // this.test2.push({classId:f.classId})
  
         this.data=res.filter(x=>x.classId===f.classId)//.map(obj=>({dataList:obj.itemName}))
         this.test2.push({classId:f.classId,className:f.className,dataList:this.data});
        // console.log( this.dataList);
        
        })
        console.log(this.test2);
  
  
      
       
  
        // console.log('dataList =', res);
        this.voucherNumber = this.dataList[0].masterId;
        this.paymentMethodN = this.dataList[0].paymentMethodN;
        this.voucherDate = this.dataList[0].voucherDate;
        this.parentName = this.dataList[0].parentName;
        this.Qty = this.getQty();
  
        for (let i = 0; i < this.dataList.length; i++) {
          this.elemnt=this.dataList[i].classId;
          // console.log('classId for element',this.elemnt);
          
          
          // this.Table = new Set();
          
          if(this.Table.indexOf(this.elemnt) === -1){
            this.Table.push(this.elemnt); 
            // console.log('array  table after push ', this.Table);
            // console.log('data of array length', this.Table.length);
          }
         
          
  
          this.datanumber=this.Table.indexOf(this.elemnt);
          // console.log('datanumber',this.datanumber);
          // console.log('dataasid', this.dataList[this.datanumber]);
  
          // getAllIndexes(this.dataList, this.elemnt) {
          //   var indexes = [], j = -1;
          //   while ((j = this.dataList.indexOf(this.elemnt, j+1)) != -1){
          //       indexes.push(j);
          //   }
        //     return indexes;
        // }
        
        // var indexes = getAllIndexes(Cars, "Nano");
  
  
  
        //   //  let aId=this.dataList[i].classId;
        //   //  this.elemnt={'aId':this.dataList[i].className} ;
        //   //  console.log('element',this.elemnt);
        //   //  console.log('Table',this.Table.length);
        //   //  if(this.Table.indexOf(aId) === -1) {
        //   //    var length= this.Table.push(this.elemnt);
        //   //    console.log('Table',this.Table.length);
        //   //    // console.log('items',this.Table);
        //   //  }
        }
       
      }, err => {
        this.iniForm();
        // console.log(err);
      })
    }
  */

}
