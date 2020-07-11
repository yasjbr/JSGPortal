import { Component, OnInit } from '@angular/core';
import { RepClassIndexComponent } from '../classes/rep-class-index/rep-class-index.component';
import { RepService } from '../rep.service';
import { PayPrice } from 'src/app/Models/PayPrice/PayPrice';
import { users } from 'src/app/Models/Users/users';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ReportsService } from '../reports.service';
import { SchoolService } from '../../addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payprice-reports',
  templateUrl: './payprice-reports.component.html',
  styleUrls: ['./payprice-reports.component.scss']
})
export class PaypriceReportsComponent implements OnInit {
  priceList:PayPrice[];
  public DateAndTime = new Date();
  schoolId:any;
  name: string;
  image: any;
  constructor(
    private reportsService: ReportsService,
    private service:RepService,
    private currentUserService: CurrentUserService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer,
  ) {

    let currentUser: users;
    this.currentUserService.user.subscribe(user => (currentUser = user));
    this.name = currentUser.username;
    this.schoolId = currentUser.schoolId;
   }

  ngOnInit() {
    this.getPayPrice();
    this.getImage();
  }
  print(div) {
    this.reportsService.print(div);
  }
  getPayPrice(){
    return this.service.getPayPrice().subscribe(res=>{
      this.priceList=res;
      
      
    })
  }
  getImage() {
    this.schoolService.getSchool(this.schoolId).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
