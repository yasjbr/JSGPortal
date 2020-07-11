import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../reports.service';
import { SchoolService } from '../../addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VoucherService } from '../../stock/vouchers/voucher.service';
import { PayWithoutReceiving } from './PayWithoutReceiving';

@Component({
  selector: 'app-pay-with-out-receiving-books',
  templateUrl: './pay-with-out-receiving-books.component.html',
  styleUrls: ['./pay-with-out-receiving-books.component.scss']
})
export class PayWithOutReceivingBooksComponent implements OnInit {
  PayWithoutReceiving: PayWithoutReceiving[];
  name:string;
  schoolId:number;
  image:any;
  public DateAndTime = new Date();

  constructor(
    private currentUserService: CurrentUserService,
    private reportsService: ReportsService,
    private schoolService: SchoolService,
    private service: VoucherService,
    private sanitizer: DomSanitizer
  ) { 

    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
  }

  ngOnInit() {

   this.GetPayWithOutReceivingBooks()

  }
  GetPayWithOutReceivingBooks() {
    //console.log("gg",PayWithoutReceiving);
    
    return this.service.GetPayWithOutReceivingBooks().subscribe(res => {
        this.PayWithoutReceiving = res;
        console.log(res);
    
      });
  }
  print(div) {
    this.reportsService.print(div);
  }
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
