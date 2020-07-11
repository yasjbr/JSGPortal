import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { RegParentService } from '../../Reg/parents/reg-parent.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'app-previousdebts',
  templateUrl: './previousdebts.component.html',
  styleUrls: ['./previousdebts.component.scss']
})
export class PreviousdebtsComponent implements OnInit {
  parentList:any;
  debtsList:any;

  name:string;
  schoolId:any;
  schoolName:any;
  yearId: any;

  constructor(
    private service:PaymentService,
    private currentUserService: CurrentUserService,
  ) { 
    let currentUser: users;
      this.currentUserService.user.subscribe(user => (currentUser = user));
      this.name = currentUser.username;
      this.schoolId = currentUser.schoolId;
      this.schoolName = currentUser.arSchoolName;
      this.yearId = currentUser.yearId;
  }

  ngOnInit() {
    this.getParentDebt();
    this.getDebts(0);
  }


  getParentDebt(){
    console.log('parentId',0 ,'yearId',this.yearId);
   return this.service.getPreviousDebts(0,this.yearId).subscribe(res=>{
     this.parentList=res;
     
   })
  }


getDebts(parentId){
  console.log('parentId',parentId ,'yearId',this.yearId);
 return this.service.getPreviousDebts(parentId,this.yearId).subscribe(res=>{
   this.debtsList=res;
 })
}

}
