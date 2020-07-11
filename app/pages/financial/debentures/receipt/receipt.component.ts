import { Component, OnInit } from '@angular/core';
import { StudentFee } from '../../../../Models/financial/student-fee';
import { StudentFeeService } from '../../student-fee/student-fee.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  voucherList:StudentFee;
  voucherNo:number;
  studName:string;
  sectionName:string;
  className:string;
  division:string;
  amt:number;
  vouchertype:any;
  date:Date;
  parentName:string;
  first:any=[];
  Bankname:any=[];
  ChequeNo:any=[];

paymentsMethod:string;
chequNo:number;
bankName:string;
chequeDate:Date;
PaymentMethodC:string;
constructor(
  private service: StudentFeeService,
  public snackBar: MatSnackBar,
  public dialog: MatDialog,
  ) { }

  ngOnInit() {
    // this.viewData(7335);
  // this.voucherNo=0;
  }
  viewData(id,message: string, action: string,className: string) {
    this.reset();
       return  this.service.GetVoucher(id).subscribe(res => {
      if(res != null){
      this.voucherList=res;
      this.voucherNo=this.voucherList.voucherId;
      this.studName=this.voucherList.studName;
      this.sectionName=this.voucherList.sectionName;
      this.className=this.voucherList.className;
      this.division=this.voucherList.division;
      this.amt=this.voucherList.amt;
      this.vouchertype=this.voucherList.vouchertype;
      this.date=this.voucherList.date;
      console.log('dd',this.voucherList.paymentMethod);
      
       if(this.voucherList.paymentMethod.length>0 ){
        for(let i=0; i <this.voucherList.paymentMethod.length;i++){  
          this.first.push(this.voucherList.paymentMethod[i].name);
          this.Bankname.push(this.voucherList.paymentMethod[i].bankName);
          this.ChequeNo.push(this.voucherList.paymentMethod[i].chequeNo);
          this.chequeDate=this.voucherList.paymentMethod[i].chequeDate;
        }
        this.paymentsMethod=this.first.join('/');
        this.bankName=this.Bankname.join('/');
        this.chequNo=this.ChequeNo.join('/');
        this.parentName=this.voucherList.parentName;
        console.log('this for :' ,this.paymentsMethod);
      }
    } 
    else{
      this.snackBar.open(message, action, {
        duration: 2000,
        panelClass: [className]
      });
      console.log("test is not found");
    }
  },err => {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  });
    
    }

    
    openCancelDialog(voucherNo: StudentFee,message: string, action: string,className: string) {
      
      if(this.voucherList != null){
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {
          name: this.voucherNo
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.cancel();
          this.reset();
        }
       });
      }
      else{
         this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: [className]
        });
      }
      }
       
    
cancel(){
    return  this.service.CanselVoucherById(this.voucherNo).subscribe(res => {
      this.reset();
     });  
}
reset(){
  this.voucherList=null;
  this.voucherNo=null;
      this.studName='';
      this.sectionName='';
      this.className='';
      this.division='';
      this.amt=0;
      this.vouchertype='';
      this.date=null;
      this.parentName='';
      this.chequNo=0;
      this.bankName='';
      this.chequeDate=null;
      this.first=[];
      this.Bankname=[];
      this.ChequeNo=[];
      this.paymentsMethod=null;
}
}

